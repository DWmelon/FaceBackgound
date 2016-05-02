package com.mesclouds.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class MathUtils {
	public static Double m21(Double d) {
		return m2(d,1);
    }
	public static Double m2(Double d,int len) {
		if(d==null)
			return null;
		BigDecimal bg = new BigDecimal(d);
        return bg.setScale(len, BigDecimal.ROUND_HALF_UP).doubleValue();
    }
	
	/**
	 * 加法
	 * @param a
	 * @param b
	 * @return
	 */
	public static Double add(Double a,Double b){
		
		BigDecimal aa = new BigDecimal(Double.toString(a));
		
		BigDecimal bb = new BigDecimal(Double.toString(b));
		
		BigDecimal cc = aa.add(bb);
		
		return cc.doubleValue();
		
	}
	
	/**
	 * 减法
	 * @param a
	 * @param b
	 * @return
	 */
	public static Double sub(Double a,Double b){
		
		BigDecimal aa = new BigDecimal(Double.toString(a));
		
		BigDecimal bb = new BigDecimal(Double.toString(b));
		
		BigDecimal cc = aa.subtract(bb);
		
		return cc.doubleValue();
		
	}
	
	/**
	 * 乘法
	 * @param a
	 * @param b
	 * @return
	 */
	public static Double mul(Double a,Double b){
		
		BigDecimal aa = new BigDecimal(Double.toString(a));
		
		BigDecimal bb = new BigDecimal(Double.toString(b));
		
		BigDecimal cc = aa.multiply(bb);
		
		return cc.doubleValue();
		
	}
	
	/**
	 * 除法
	 * @param a
	 * @param b
	 * @return
	 */
	public static Double div(Double a,Double b){
		
		BigDecimal aa = new BigDecimal(Double.toString(a));
		
		BigDecimal bb = new BigDecimal(Double.toString(b));
		
		BigDecimal cc = aa.divide(bb);
		
		return cc.doubleValue();
		
	}
	
	public static Double format(Double d){
		
		DecimalFormat df=new DecimalFormat("#.00");
		
		String r = df.format(d);
		
		return Double.valueOf(r);
		
	}
	
	/**
	 * 
	 * @return 获取整数部分，只舍不�?
	 */
	public static Double getInt(Double d){
		
		String r = Double.toString(d);
		
		if(r.indexOf(".") > -1){
			
			return Double.parseDouble(r.substring(0, r.indexOf(".")));
		}
		
		return d;
	}
	
	/**
	 * 获取小数点后1位，只舍不入
	 * @param d
	 * @return
	 */
	public static Double getPrecision1(Double d){
		
		String r = Double.toString(d);
		
		if(r.indexOf(".") > -1){
			
			r = r+"00";
			
			return Double.parseDouble(r.substring(0, (r.indexOf(".")+2) ));
		}
		
		return d;
	}
	
	/**
	 * 获取小数点后2位，只舍不入
	 * @param d
	 * @return
	 */
	public static Double getPrecision2(Double d){
		
		String r = Double.toString(d);
		
		if(r.indexOf(".") > -1){
			
			r = r+"00";
			
			return Double.parseDouble(r.substring(0, (r.indexOf(".")+3) ));
		}
		
		return d;
	}
	
	public static void main(String[] args) {
		System.out.println(getPrecision1(1235654.19343));
	}

}
