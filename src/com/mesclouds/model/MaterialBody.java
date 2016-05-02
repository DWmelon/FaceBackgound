package com.mesclouds.model;

import java.io.Serializable;

public class MaterialBody implements Serializable{	//素材体

	private static final long serialVersionUID = -1644669303659106606L;
	private int id;
	private String title;	//素材体的标题
	private String author;  //作者
	private String url;		//连接外文的Url
	private String imgUrl;	//图片的服务器URL
	private int isShow;		//是否显示
	private String mainContent;//素材的正文内容
	private int materialId;//外键到素材的外键
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public int getIsShow() {
		return isShow;
	}
	public void setIsShow(int isShow) {
		this.isShow = isShow;
	}
	public int getMaterialId() {
		return materialId;
	}
	public void setMaterialId(int materialId) {
		this.materialId = materialId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getMainContent() {
		return mainContent;
	}
	public void setMainContent(String mainContent) {
		this.mainContent = mainContent;
	}

}
