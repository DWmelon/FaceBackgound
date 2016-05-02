package com.mesclouds.utils;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtils {
	
	public static boolean isNull(Object str){
		if ( str==null )
			return true;
		return false;
	}
	
	public static boolean isEmpty(String str){
		if ( str==null || str.trim().equals("") )
			return true;
		return false;
	}
	
	public static boolean isNotNull(Object str){
		return !isNull(str);
	}
	
	public static boolean isNotEmpty(String str){
		return !isEmpty(str);
	}
	
	public static String toUpperFirst(String src) {
		
		char l = Character.toUpperCase(src.charAt(0));
		return src.replaceFirst(String.valueOf(src.charAt(0)), String.valueOf(l));
	}
	
	public static String toLowerFirst(String src) {
		
		char l = Character.toLowerCase(src.charAt(0));
		return src.replaceFirst(String.valueOf(src.charAt(0)), String.valueOf(l));
	}
	
	public static String convertStackTrace(Exception e) {
		
		StringWriter stringWriter = new StringWriter();
		PrintWriter printWriter = new PrintWriter(stringWriter);
		e.printStackTrace(printWriter);
		
		return stringWriter.toString();
	}
	
	public static boolean isNumeric(String str){
	    Pattern pattern = Pattern.compile("[0-9]*");
	    return pattern.matcher(str).matches();
	}
	
	
	public static boolean match(String str) {
		Pattern p = Pattern.compile("^[0-9]+(.[0-9]*)?$");
		Matcher m = p.matcher(str.trim());
		return m.find();
	}
	
	public static String linkString(String s1,String s2,String s3){
		return s1+s2+s3;
	}
}
