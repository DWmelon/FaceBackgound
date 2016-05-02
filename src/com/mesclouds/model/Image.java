package com.mesclouds.model;

public class Image {	//一张图片

	private int imgId;			
	private String imgName;		//图片名称
	private String url;			//图片的服务器url地址
	private int groupId;		//所属分组ID

	public int getGroupId() {
		return groupId;

	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	
	public int getImgId() {
		return imgId;
	}
	public void setImgId(int imgId) {
		this.imgId = imgId;
	}

	public String getImgName() {
		return imgName;
	}
	public void setImgName(String imgName) {
		this.imgName = imgName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
}	
