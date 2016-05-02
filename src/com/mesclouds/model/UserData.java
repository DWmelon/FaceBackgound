package com.mesclouds.model;

import java.util.List;

public class UserData {		//账号实体
	private String id;
	private String name;	//账号名
	private String UserType;	//账号类型（服务号，订阅号）

	private String istrue;		//是否认证
	private String icon_url;	//头像图片的url
	private List<String> function;	//账号所具备的功能
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUserType() {
		return UserType;
	}
	public void setUserType(String userType) {
		UserType = userType;
	}
	public String getIstrue() {
		return istrue;
	}
	public void setIstrue(String istrue) {
		this.istrue = istrue;
	}
	public String getIcon_url() {
		return icon_url;
	}
	public void setIcon_url(String icon_url) {
		this.icon_url = icon_url;
	}
	public List<String> getFunction() {
		return function;
	}
	public void setFunction(List<String> function) {
		this.function = function;
	}

	
}
