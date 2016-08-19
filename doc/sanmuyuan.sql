create database sanmuyuan;

use sanmuyuan;
-- ----------------------------
-- Table structure for SYS_USER
-- ----------------------------
DROP TABLE IF EXISTS `SYS_USER`;
CREATE TABLE `SYS_USER` (
  `USERID` bigint(20) NOT NULL AUTO_INCREMENT,
  `UNO` varchar(50) NOT NULL,
  `UNAME` varchar(50) NOT NULL,
  `UTYPE` int DEFAULT '2',
  `PWD` varchar(100) DEFAULT '123456',
  `CREATEDATE` DATETIME DEFAULT CURRENT_TIMESTAMP(),
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
  `MENUID` bigint(10) NOT NULL AUTO_INCREMENT,
  `MENUNAME` varchar(20) NOT NULL,
  `MENUCODE` char(5) NOT NULL,
  `TREENO` char(9) NOT NULL,
  `PMID` int(10) default NULL,
  `ISHIDDEN` CHAR(1) default 'S',
  `ISLEAF` CHAR(1) default '0',
  `SORTNO` int ,
  PRIMARY KEY (`MENUID`)
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
  `OPENID` varchar(200) NOT NULL,
  `NICKNAME` varchar(200) default NULL,
  `USERNAME` varchar(100) default NULL,
  `PHONENO` varchar(20) default NULL,
  `ADDRESSED` varchar(100) default NULL,
  `LINKNAME` varchar(100) default NULL,
  `lINKTELNO` varchar(100) default NULL,
  `REMARK` varchar(100) default NULL,
  PRIMARY KEY (`OPENID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



-- ----------------------------
-- Table structure for COMMODITIES
-- ----------------------------
DROP TABLE IF EXISTS `COMMODITIES`;
CREATE TABLE `COMMODITIES` (
  `CID` bigint(20) NOT NULL AUTO_INCREMENT,
  `CNAME` varchar(50) NOT NULL,
  PRIMARY KEY (`CID`)
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
  `PRODUCTID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PRODUCTNAME` varchar(50) NOT NULL,
  `CYCLE` varchar(50) NOT NULL,
  `PRICE` double(14,2) NOT NULL default 0,
  `REMARK` varchar(150) default null,
  PRIMARY KEY (`PRODUCTID`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `PRODUCT_ITEM`;
CREATE TABLE `PRODUCT_ITEM` (
  `ITEMID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PRODUCTID` bigint(20) NOT NULL,
  `CID` bigint(20) NOT NULL,
  `ITEMNUMBER` bigint(20) NOT NULL default 1,
  PRIMARY KEY (`ITEMID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ORDERS
-- ----------------------------
DROP TABLE IF EXISTS `ORDERS`;
CREATE TABLE `ORDERS` (
  `ORDERID` bigint(20) NOT NULL AUTO_INCREMENT,
  `OPENID` varchar(255) NOT NULL,
  `PRODUCTID` bigint(20) NOT NULL,
  `PRICE` double(14,2) NOT NULL default 0,
  `REMARK` varchar(255) default NULL,
  PRIMARY KEY (`ORDERID`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for DISTRIBUTION_PLAN
-- ----------------------------
DROP TABLE IF EXISTS `DISTRIBUTION_PLAN`;
CREATE TABLE `DISTRIBUTION_PLAN` (
  `PLANID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ORDERID` bigint(20) NOT NULL,
  `PRODUCTID` bigint(20) NOT NULL,
  `PLANDATE` varchar(10) NOT NULL,
  `PLANSTATE` char(1) default '2',
  `REMARK` varchar(255) default NULL,
  PRIMARY KEY (`PLANID`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for PLAN_ITEM
-- ----------------------------
DROP TABLE IF EXISTS `PLAN_ITEM`;
CREATE TABLE `PLAN_ITEM` (
  `ITEMID` bigint(20) NOT NULL AUTO_INCREMENT,
  `PLANID` bigint(20) NOT NULL,
  `CID` bigint(20) NOT NULL,
  `ITEMNUMBER` bigint(20) NOT NULL default 1,
  PRIMARY KEY (`ITEMID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for TMESSAGE
-- ----------------------------
DROP TABLE IF EXISTS `TMESSAGE`;
CREATE TABLE `TMESSAGE` (
  `MSGID` bigint(20) NOT NULL AUTO_INCREMENT,
  `OPENID` bigint(200) DEFAULT NULL,
  `MSGTITLE` varchar(200) DEFAULT NULL,
  `MSG` text DEFAULT NULL,
  `CREATEDATE` DATETIME DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`MSGID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;




