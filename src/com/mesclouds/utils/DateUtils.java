package com.mesclouds.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.util.StringUtils;

public class DateUtils {

	public static Date now() {
		return new Date();
	}

	public static Date getDateBefore(Date date, int days) {
		if (date == null)
			date = now();
		Calendar now = Calendar.getInstance();
		now.setTime(date);
		now.set(Calendar.DATE, now.get(Calendar.DATE) - days);
		return now.getTime();
	}

	public static Date getDateAfter(Date date, int days) {
		if (date == null)
			date = now();
		Calendar now = Calendar.getInstance();
		now.setTime(date);
		now.set(Calendar.DATE, now.get(Calendar.DATE) + days);
		return now.getTime();
	}

	public static String getDate(Date date, String format) {
		if (date == null)
			date = now();
		return new SimpleDateFormat(format).format(date);
	}

	public static String getCurrentDate(String format) {
		return getDate(new Date(), format);
	}

	public static String getCurrentDate() {
		return getCurrentDate("yyyy-MM-dd");
	}

	/**
	 * 自定义格式化时间
	 * 
	 * @param date     时间
	 * @param formatStr 格式化字符串，默�?MM/dd/yyyy
	 * @return 格式化的时间字符�?
	 */
	public static String formartDate(Date date, String formatStr) {
		if (date == null)
			date = now();
		if (StringUtils.isEmpty(formatStr)) {
			formatStr = "MM/dd/yyyy";
		}
		SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
		return sdf.format(date);
	}

	/**
	 * 将带时间格式字符转换成时间类�?
	 * @param dateStr  带时间格式的字符�?
	 * @param pattern  格式化字符串
	 * @return 转换后时间类型数�?
	 */
	public static Date formDate(String dateStr,String pattern){
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		Date date = null ;
		try {
			date = sdf.parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	/**
	 * 获取当天�?��时间
	 * 
	 * @return
	 */
	public  static Date getStartTime() {
		Calendar todayStart = Calendar.getInstance();
		todayStart.set(Calendar.HOUR, 0);
		todayStart.set(Calendar.MINUTE, 0);
		todayStart.set(Calendar.SECOND, 0);
		todayStart.set(Calendar.MILLISECOND, 0);
//		return todayStart.getTime().getTime();
		return  todayStart.getTime();
	}

	/**
	 * 获取当天结束时间
	 * 
	 * @return
	 */
	public static Date getEndTime() {
		Calendar todayEnd = Calendar.getInstance();
		todayEnd.set(Calendar.YEAR, 4028);
		todayEnd.set(Calendar.HOUR_OF_DAY, 23);
		todayEnd.set(Calendar.MINUTE, 59);
		todayEnd.set(Calendar.SECOND, 59);
		todayEnd.set(Calendar.MILLISECOND, 999);
		return todayEnd.getTime();
	}
	/**
	 * 比较两个时间�?
	 * @param start �?��时间
	 * @param end   结束时间
	 * @return
	 * @throws ParseException
	 */
	
	
	public static long timeCompare(Date start,Date end) {
		Calendar aCalendar = Calendar.getInstance();
		
		aCalendar.setTime(start);
		
		int day1 = aCalendar.get(Calendar.DAY_OF_YEAR);
		
		aCalendar.setTime(end);
		
		int day2 = aCalendar.get(Calendar.DAY_OF_YEAR);
		
		return day2 - day1;
		
	}
	

	public static void main(String[] args) throws ParseException {
		System.out.println(formDate("2014-08-17", "yyyy-MM-dd"));
	}
	
}
