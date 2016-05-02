package com.mesclouds.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mesclouds.service.RecordService;

@Controller
public class RecordController {

	@Autowired
	RecordService recordService;
	
	
	//fType
	//1 - 产品
	//2 - 订单
	
	//fOperationType
	//1 - 增
	//2 - 改
	//3 - 删
	@RequestMapping(value="/AddRecordByAdd")
	public void AddRecordByAdd(HttpServletRequest request,HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");
		
		String fTitle = request.getParameter("fTitle");
		int fType = Integer.parseInt(request.getParameter("fType"));
		int fOperationType = Integer.parseInt(request.getParameter("fOperationType"));
		long fAddID = Long.parseLong(request.getParameter("fAddID").toString()); 
		String fAfter = request.getParameter("fAfter");
		recordService.addRecordByAdd(fPerson,fTitle,fType,fOperationType,fAddID,fAfter);
	
	}
	
	@RequestMapping(value="/AddRecordByModify")
	public void AddRecordByModify(HttpServletRequest request,HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");
		
		String fTitle = request.getParameter("fTitle");
		int fType = Integer.parseInt(request.getParameter("fType"));
		int fOperationType = Integer.parseInt(request.getParameter("fOperationType"));
		String fTime = request.getParameter("fTime");
		String fBeforeJson = request.getParameter("fBeforeJson");
		String fAfterJson = request.getParameter("fAfterJson");
	
		recordService.addRecordByModify(fPerson,fTitle,fType,fOperationType,fBeforeJson,fAfterJson);
	
	}
	
	@RequestMapping(value="/AddRecordByDelete")
	public void AddRecordByDelete(HttpServletRequest request,HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");
		
		String fTitle = request.getParameter("fTitle");
		int fType = Integer.parseInt(request.getParameter("fType"));
		int fOperationType = Integer.parseInt(request.getParameter("fOperationType"));
		String fTime = request.getParameter("fTime");
		String fDeleteJson = request.getParameter("fDeleteJson");

		recordService.addRecordByDelete(fPerson,fTitle,fType,fOperationType,fDeleteJson);
	}
	
	@RequestMapping(value="/GetRecordByTime")
	public void GetRecordByTime(HttpServletRequest request,HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");
		
		String fTime = request.getParameter("fTime");
		
		JSONObject obj = recordService.getRecordByTime(fTime);
		
		try {
			PrintWriter writer = response.getWriter();
			writer.write(obj.toString());
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}
