package com.mesclouds.utils;

public class LinkString {
	
	public static String LinkImgUrl(String path,String name,String type){
		StringBuffer strb=new StringBuffer(path);
		strb.append("/");
		strb.append(name);
		strb.append(type);
		String str = strb.toString();
		return str;
		
	}
	
	public static String[] LinkImgUrls(String path,String[] name,String type){
		int length = name.length;
		String[] str = new String[length];
		for(int i =0;i<length;i++){
			StringBuffer strb=new StringBuffer(path);
			strb.append("\\");
			strb.append(name[i]);
			strb.append(".");
			strb.append(type);
			str[i] = strb.toString();
		}
		return str;
	}
}
