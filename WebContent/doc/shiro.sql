/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : mesclouds

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-02-05 17:29:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `is_leaf` smallint(6) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_menu_parent_id` (`parent_id`),
  CONSTRAINT `FK_menu_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `menu_permission`
-- ----------------------------
DROP TABLE IF EXISTS `menu_permission`;
CREATE TABLE `menu_permission` (
  `menu_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`menu_id`,`permission_id`),
  KEY `FK_menu_permission` (`permission_id`),
  CONSTRAINT `FK_menu_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`),
  CONSTRAINT `FK_permission_menu` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `organization`
-- ----------------------------
DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_leaf` smallint(6) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `org_type` int(11) DEFAULT NULL,
  `valid` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_parent_id` (`parent_id`),
  CONSTRAINT `FK_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `organization` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of organization
-- ----------------------------
INSERT INTO `organization` VALUES ('1', '1', '华南农业大学', null, '0', '1', '1', '1');
INSERT INTO `organization` VALUES ('2', '2', '易拓工作室', '1', '1', '2', '2', '1');
INSERT INTO `organization` VALUES ('3', '3', '信息学院', '1', '1', '2', '2', '1');

-- ----------------------------
-- Table structure for `permission`
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `permission_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('1', '1', '增加', 'add');
INSERT INTO `permission` VALUES ('2', '2', '删除', 'del');
INSERT INTO `permission` VALUES ('3', '3', '查看', 'list');
INSERT INTO `permission` VALUES ('4', '4', '修改', 'edit');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '1', 'admin');
INSERT INTO `role` VALUES ('2', '2', 'user');
INSERT INTO `role` VALUES ('3', '3', 'guest');

-- ----------------------------
-- Table structure for `role_menu_permission`
-- ----------------------------
DROP TABLE IF EXISTS `role_menu_permission`;
CREATE TABLE `role_menu_permission` (
  `role_id` int(11) DEFAULT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  KEY `FK_Reference_10` (`role_id`),
  KEY `FK_Reference_11` (`menu_id`,`permission_id`),
  CONSTRAINT `FK_Reference_10` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FK_Reference_11` FOREIGN KEY (`menu_id`, `permission_id`) REFERENCES `menu_permission` (`menu_id`, `permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(50) DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  `effective_date` datetime DEFAULT NULL,
  `invalidation_date` datetime DEFAULT NULL,
  `err_count` int(11) DEFAULT NULL,
  `locked` smallint(6) DEFAULT NULL,
  `locked_time` datetime DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `ad_account` varchar(100) DEFAULT NULL,
  `account` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `valid` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_org_user` (`org_id`),
  CONSTRAINT `FK_org_user` FOREIGN KEY (`org_id`) REFERENCES `organization` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  KEY `FK_role_user` (`user_id`) USING BTREE,
  KEY `FK_user_role` (`role_id`) USING BTREE,
  CONSTRAINT `FK_role_user` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FK_user_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
