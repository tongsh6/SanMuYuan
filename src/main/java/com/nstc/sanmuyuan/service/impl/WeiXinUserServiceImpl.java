package com.nstc.sanmuyuan.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.PropKit;
import com.jfinal.log.Log;
import com.jfinal.weixin.sdk.api.AccessTokenApi;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.SnsAccessToken;
import com.jfinal.weixin.sdk.api.SnsAccessTokenApi;
import com.jfinal.weixin.sdk.api.UserApi;
import com.nstc.sanmuyuan.model.Orders;
import com.nstc.sanmuyuan.model.WeixinUser;
import com.nstc.sanmuyuan.service.WeiXinUserService;
import com.nstc.sanmuyuan.weixinhelpe.GetUserInfo;
import com.nstc.sanmuyuan.weixinhelpe.UserConfig;
import com.nstc.sanmuyuan.weixinhelpe.UserConfig.LangType;

public class WeiXinUserServiceImpl implements WeiXinUserService {
	private static final Log log = Log.getLog(WeiXinUserServiceImpl.class);

	@Override
	public List<WeixinUser> list() {
		return WeixinUser.dao.list();
	}

	@Override
	public WeixinUser info(String strOpenid) {
		return WeixinUser.dao.findById(strOpenid);
	}

	@Override
	public boolean update(WeixinUser weixinuser) {
		return weixinuser.update();
	}

	@Override
	public void sync() throws Exception {
		getApiConfig();

		List<WeixinUser> userInfos = new ArrayList<WeixinUser>();
		List<String> allOpenId = getAllOpenId();
		int total = allOpenId.size();
		UserConfig[] user_list = null;
		// 开发者可通过该接口来批量获取用户基本信息。最多支持一次拉取100条。
		int temp = 100;// 一次获取100
		if (total > temp) {
			int page = 0;// 当前页面
			int count = total / 100 + (total % 100 > 0 ? 1 : 0);// 总共获取多少次
			int index = 0;
			while (page < count) {
				index = (temp * (page + 1)) > total ? total : (temp * (page + 1));
				user_list = new UserConfig[index - (page * temp)];
				for (int i = page * temp; i < index; i++) {
					UserConfig config = new UserConfig();
					config.setLang(LangType.zh_CN);
					config.setOpenid(allOpenId.get(i));
					user_list[i - (page * temp)] = config;
				}
				GetUserInfo getUserInfo = new GetUserInfo();
				getUserInfo.setUser_list(user_list);
				String jsonGetUserInfo = JsonKit.toJson(getUserInfo);

				String jsonResult = HttpKit.post(PropKit.get("weixinURL") + AccessTokenApi.getAccessTokenStr(), jsonGetUserInfo);
				// 将json转化为对象
				List<WeixinUser> userInfo = parseJsonToUserInfo(jsonResult);
				userInfos.addAll(userInfo);
				page++;
				try {
					Thread.sleep(1000 * 2);
				} catch (InterruptedException e) {
					log.error(e.getMessage());
				}
			}

		} else {
			user_list = new UserConfig[total];
			for (int i = 0; i < user_list.length; i++) {
				UserConfig config = new UserConfig();
				config.setLang(LangType.zh_CN);
				config.setOpenid(allOpenId.get(i));
				user_list[i] = config;
			}
			GetUserInfo getUserInfo = new GetUserInfo();
			getUserInfo.setUser_list(user_list);
			String jsonGetUserInfo = JsonKit.toJson(getUserInfo);

			ApiResult batchGetUserInfo = UserApi.batchGetUserInfo(jsonGetUserInfo);
			List<WeixinUser> userInfo = parseJsonToUserInfo(batchGetUserInfo.getJson());
			userInfos.addAll(userInfo);

		}
		try {
			WeixinUser.dao.batchSave(userInfos);
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			ApiConfigKit.removeThreadLocalApiConfig();
		}
	}

	/**
	 * 如果要支持多公众账号，只需要在此返回各个公众号对应的 ApiConfig 对象即可 可以通过在请求 url 中挂参数来动态从数据库中获取
	 * ApiConfig 属性值
	 */
	private ApiConfig getApiConfig() {
		ApiConfig ac = new ApiConfig();

		// 配置微信 API 相关常量
		ac.setToken(PropKit.get("Token"));
		ac.setAppId(PropKit.get("AppID"));
		ac.setAppSecret(PropKit.get("AppSecret"));

		/**
		 * 是否对消息进行加密，对应于微信平台的消息加解密方式： 1：true进行加密且必须配置 encodingAesKey
		 * 2：false采用明文模式，同时也支持混合模式
		 */
		ac.setEncryptMessage(PropKit.getBoolean("encryptMessage", false));
		ac.setEncodingAesKey(PropKit.get("EncodingAESKey", "setting it in config file"));

		ApiConfigKit.setThreadLocalApiConfig(ac);
		return ac;
	}

	/**
	 * 获取多有的openid
	 * 
	 * @return
	 */
	private List<String> getAllOpenId() {
		List<String> openIds = getOpenIds(null);
		return openIds;
	}

	private List<String> getOpenIds(String next_openid) {
		List<String> openIdList = new ArrayList<String>();
		ApiResult apiResult = UserApi.getFollowers(next_openid);
		String json = apiResult.getJson();
		if (apiResult.isSucceed()) {
			JSONObject result = JSON.parseObject(json);
			next_openid = apiResult.getStr("next_openid");
			int count = apiResult.getInt("count");
			JSONObject openIdObject = result.getJSONObject("data");
			if (count > 0) {
				JSONArray openids = openIdObject.getJSONArray("openid");
				for (int i = 0; i < openids.size(); i++) {
					openIdList.add(openids.getString(i));
				}
			}
			// 下一页
			if (next_openid != null && !next_openid.equals("")) {
				List<String> list = getOpenIds(next_openid);
				openIdList.addAll(list);
			}
		}
		return openIdList;
	}

	private List<WeixinUser> parseJsonToUserInfo(String jsonResult) {
		List<WeixinUser> list = new ArrayList<WeixinUser>();
		// SimpleDateFormat sfg = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
		JSONObject jo = JSONObject.parseObject(jsonResult);

		JSONArray user_list = jo.getJSONArray("user_info_list");

		for (int i = 0; i < user_list.size(); i++) {
			JSONObject userObject = user_list.getJSONObject(i);
			// String city = userObject.getString("city");
			// String country = userObject.getString("country");
			// String groupid = userObject.getString("groupid");
			// String headimgurl = userObject.getString("headimgurl");
			// String language = userObject.getString("language");
			String nickname = userObject.getString("nickname");
			String openid = userObject.getString("openid");
			// String province = userObject.getString("province");
			String remark = userObject.getString("remark");
			// String sex = userObject.getString("sex");
			// // 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
			//
			// if (sex != null && !sex.equals("")) {
			// int sexInt = Integer.parseInt(sex);
			// if (sexInt == 1) {
			// sex = "男";
			// } else if (sexInt == 2) {
			// sex = "女";
			// } else {
			// sex = "未知";
			// }
			// } else {
			// sex = "未知";
			// }
			// String subscribe = userObject.getString("subscribe");
			// String subscribe_time = userObject.getString("subscribe_time");
			//
			// if (subscribe_time != null && !subscribe_time.equals("")) {
			// subscribe_time = sfg.format(new
			// Date(Long.parseLong(subscribe_time) * 1000L));
			// }
			WeixinUser weixinUser = new WeixinUser();
			weixinUser.setOpenid(openid);
			weixinUser.setNickname(nickname);
			weixinUser.setRemark(remark);
			list.add(weixinUser);
		}
		return list;

	}

	public String getOpenId(String strcode) {
		String appId = PropKit.get("AppID");
		String secret = PropKit.get("AppSecret");
		// 通过code换取网页授权access_token
		SnsAccessToken snsAccessToken = SnsAccessTokenApi.getSnsAccessToken(appId, secret, strcode);

		return snsAccessToken.getOpenid();
	}

	@Override
	public List<Orders> orderlist(String strcode) {

		Map<String, String> params = new HashMap<String, String>();
		params.put("openid", getOpenId(strcode));
		return Orders.dao.query(params);
	}

	@Override
	public WeixinUser infoByCode(String strcode) {
		return WeixinUser.dao.findById(getOpenId(strcode));
	}
}
