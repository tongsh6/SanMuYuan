create database sanmuyuan;

use sanmuyuan;
-- ----------------------------
-- Table structure for SYS_USER
-- ----------------------------
DROP TABLE IF EXISTS `SYS_USER`;
CREATE TABLE `SYS_USER` (
  `userid` bigint(20) NOT NULL AUTO_INCREMENT,
  `uno` varchar(50) NOT NULL,
  `uname` varchar(50) NOT NULL,
  `utype` int DEFAULT '2',
  `pwd` varchar(100) DEFAULT '123456',
  `createdate` DATETIME DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of SYS_USER
-- ----------------------------
INSERT INTO `SYS_USER` VALUES ('1', 'admin','系统管理员',1,'123456',CURRENT_TIMESTAMP());
INSERT INTO `SYS_USER` VALUES ('2', '0001','管理员',2,'123456',CURRENT_TIMESTAMP());

-- ----------------------------
-- Table structure for MENU_TREE
-- ----------------------------
DROP TABLE IF EXISTS `MENU_TREE`;
CREATE TABLE `MENU_TREE` (
  `menuid` bigint(10) NOT NULL AUTO_INCREMENT,
  `menuname` varchar(20) NOT NULL,
  `menucode` char(5) NOT NULL,
  `treeno` char(9) NOT NULL,
  `pmid` int(10) default NULL,
  `ishidden` CHAR(1) default 'S',
  `isleaf` CHAR(1) default '0',
  `sortno` int ,
  PRIMARY KEY (`menuid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of MENU_TREE
-- ----------------------------
INSERT INTO `MENU_TREE` VALUES ('1', '系统用户', '101', '001', NULL, 'S', '0',1);
INSERT INTO `MENU_TREE` VALUES ('2', '微信用户', '102', '001', NULL, 'S', '0',2);
INSERT INTO `MENU_TREE` VALUES ('3', '产品管理', '103', '001', NULL, 'S', '0',3);
INSERT INTO `MENU_TREE` VALUES ('4', '订单管理', '104', '001', NULL, 'S', '0',4);
INSERT INTO `MENU_TREE` VALUES ('5', '库存管理', '105', '001', NULL, 'S', '0',5);
INSERT INTO `MENU_TREE` VALUES ('6', '综合查询', '106', '001', NULL, 'S', '0',6);

-- ----------------------------
-- Table structure for WEIXIN_USER
-- ----------------------------
DROP TABLE IF EXISTS `WEIXIN_USER`;
CREATE TABLE `WEIXIN_USER` (
  `openid` varchar(200) NOT NULL,
  `nickname` varchar(200) default NULL,
  `username` varchar(100) default NULL,
  `phoneno` varchar(20) default NULL,
  `addressed` varchar(100) default NULL,
  `linkname` varchar(100) default NULL,
  `linktelno` varchar(100) default NULL,
  `remark` varchar(100) default NULL,
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



-- ----------------------------
-- Table structure for COMMODITIES
-- ----------------------------
DROP TABLE IF EXISTS `COMMODITIES`;
CREATE TABLE `COMMODITIES` (
  `cid` bigint(20) NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of COMMODITIES
-- ----------------------------
INSERT INTO `COMMODITIES` VALUES ('1', '鸡');
INSERT INTO `COMMODITIES` VALUES ('2', '鸡蛋');

-- ----------------------------
-- Table structure for PRODUCT
-- ----------------------------
DROP TABLE IF EXISTS `PRODUCT`;
CREATE TABLE `PRODUCT` (
  `productid` bigint(20) NOT NULL AUTO_INCREMENT,
  `productname` varchar(50) NOT NULL,
  `cycle` varchar(50) NOT NULL,
  `price` double(14,2) NOT NULL default 0,
  `remark` varchar(150) default null,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `PRODUCT_ITEM`;
CREATE TABLE `PRODUCT_ITEM` (
  `itemid` bigint(20) NOT NULL AUTO_INCREMENT,
  `productid` bigint(20) NOT NULL,
  `cid` bigint(20) NOT NULL,
  `itemnumber` bigint(20) NOT NULL default 1,
  PRIMARY KEY (`itemid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ORDERS
-- ----------------------------
DROP TABLE IF EXISTS `ORDERS`;
CREATE TABLE `ORDERS` (
  `orderid` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `productid` bigint(20) NOT NULL,
  `price` double(14,2) NOT NULL default 0,
  `remark` varchar(255) default NULL,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for DISTRIBUTION_PLAN
-- ----------------------------
DROP TABLE IF EXISTS `DISTRIBUTION_PLAN`;
CREATE TABLE `DISTRIBUTION_PLAN` (
  `planid` bigint(20) NOT NULL AUTO_INCREMENT,
  `orderid` bigint(20) NOT NULL,
  `productid` bigint(20) NOT NULL,
  `plandate` varchar(10) NOT NULL,
  `planstate` char(1) default '2',
  `remark` varchar(255) default NULL,
  PRIMARY KEY (`planid`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for PLAN_ITEM
-- ----------------------------
DROP TABLE IF EXISTS `PLAN_ITEM`;
CREATE TABLE `PLAN_ITEM` (
  `itemid` bigint(20) NOT NULL AUTO_INCREMENT,
  `planid` bigint(20) NOT NULL,
  `cid` bigint(20) NOT NULL,
  `itemnumber` bigint(20) NOT NULL default 1,
  PRIMARY KEY (`itemid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TMESSAGE
-- ----------------------------
DROP TABLE IF EXISTS `TMESSAGE`;
CREATE TABLE `TMESSAGE` (
  `msgid` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` bigint(200) DEFAULT NULL,
  `msgtitle` varchar(200) DEFAULT NULL,
  `msg` text DEFAULT NULL,
  `createdate` DATETIME DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`msgid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;




