package com.mesclouds.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class UUIDUtils {
	public static String getIdDate() {
		DateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		String str = df.format(new Date());

		return str;
	}
	public static String getIdRandom(){
	
	return UUID.randomUUID().toString().replace("-", "");
	
}
}
