package com.nstc.sanmuyuan.message;

public class ResultMessage {
	public int resultCode = 0;
	public String resultMsg = "";

	public int getResultCode() {
		return resultCode;
	}

	public void setResultCode(int resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultMsg() {
		return resultMsg;
	}

	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}

}
