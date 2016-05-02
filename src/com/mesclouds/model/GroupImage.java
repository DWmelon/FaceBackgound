package com.mesclouds.model;

import java.util.List;


public class GroupImage {
	private List<ImageGroup> imageGroup;
	private List<Image> image;
	public List<ImageGroup> getImageGroup() {
		return imageGroup;
	}
	public void setImageGroup(List<ImageGroup> imageGroup) {
		this.imageGroup = imageGroup;
	}
	public List<Image> getImage() {
		return image;
	}
	public void setImage(List<Image> image) {
		this.image = image;
	}
}
