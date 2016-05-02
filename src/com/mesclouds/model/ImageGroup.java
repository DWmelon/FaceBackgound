package com.mesclouds.model;

public class ImageGroup {
	private int groupId;	 //分组ID
	private String groupName;//分组名字
	private int UserId;	//所属用户ID
	private int length;	//分组内容长度
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	private String groupType;//分组类型
	public int getUserId() {
		return UserId;
	}
	public void setUserId(int userId) {
		UserId = userId;
	}
	public int getGroupId() {
		return groupId;
	}
	public String getGroupType() {
		return groupType;
	}
	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
}
