package com.mesclouds.utils;

import java.util.ArrayList;
import java.util.List;


public class ArrayUtils {
	
	public static boolean isNull(Object[] objs){
		if ( objs==null )
			return true;
		return false;
	}
	
	public static Object[] clearNull(Object[] objs) {
	    if (isNull(objs))
	        return null;
	    List<Object> rtns = new ArrayList<Object>();
	    for(Object obj:objs) {
	        if ( obj!=null )
	            rtns.add(obj);
	    }
	    return rtns.toArray();
	}
	
	public static String[] clearEmpty(String[] objs) {
        if (isNull(objs))
            return null;
        List<String> rtns = new ArrayList<String>();
        for(String obj:objs) {
            if ( !StringUtils.isEmpty(obj) )
                rtns.add(obj);
        }
        return rtns.toArray(new String[1]);
    }
	
}
