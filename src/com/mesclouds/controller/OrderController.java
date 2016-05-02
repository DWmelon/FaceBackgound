package com.mesclouds.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mesclouds.model.OrderChild;
import com.mesclouds.model.ProductOrder;
import com.mesclouds.service.OrderService;
import com.mesclouds.service.RecordService;

@Controller
public class OrderController {

	@Autowired
	OrderService orderService;
	@Autowired
	RecordService recordService;
	
	@RequestMapping(value="/BookOrder")
	public void bookOrder(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");
		
		long fMaterialID  = Long.parseLong(request.getParameter("fMaterialID"));
		String fName = request.getParameter("fName");
		int fQuantity = Integer.parseInt(request.getParameter("fQuantity"));
		String fBusiness = request.getParameter("fBusiness");
		String fOrderMan = request.getParameter("fOrderMan");
		String fLimitTime = request.getParameter("fLimitTime");
		String fStatus = request.getParameter("fStatus");
		String fRemark = request.getParameter("fRemark");
		
		long fid = orderService.bookOrder(fMaterialID,fName,fQuantity,fBusiness,fOrderMan,fLimitTime,fStatus,fRemark);
		
		JSONObject obj = new JSONObject();

		if(fid>0){
			obj.put("result", fid);	
			recordService.addRecordByAdd(fPerson,"新添订单", 2, 1, fid , orderService.returnOrderById(fid).toString());
		}else{
			obj.put("result", -1);	
		}
		
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(obj.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
	@RequestMapping(value="/UpdateOrder")
	public void UpdateOrder(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");
		
		long fid  = Long.parseLong(request.getParameter("fid"));
		long fMaterialID  = Long.parseLong(request.getParameter("fMaterialID"));
		String fName = request.getParameter("fName");
		int fQuantity = Integer.parseInt(request.getParameter("fQuantity"));
		String fBusiness = request.getParameter("fBusiness");
		String fOrderMan = request.getParameter("fOrderMan");
		String fLimitTime = request.getParameter("fLimitTime");
		String fStatus = request.getParameter("fStatus");
		String fRemark = request.getParameter("fRemark");
		
		JSONObject beforeOrder = orderService.returnOrderById(fid);
		boolean flag = orderService.updateOrder(fid,fMaterialID,fName,fQuantity,fBusiness,fOrderMan,fLimitTime,fStatus,fRemark);
		JSONObject afterOrder = orderService.returnOrderById(fid);
		
		JSONObject obj = new JSONObject();
		if(flag){
			obj.put("result","true");
			recordService.addRecordByModify(fPerson, "修改订单", 2, 2, beforeOrder.toString(), afterOrder.toString());
		}else{
			obj.put("result","false");	
		}
		

		
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(obj.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
	
	@RequestMapping(value="/DeleteOrder")
	public void deleteOrder(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");

		long fid = Long.parseLong(request.getParameter("fid"));
		
		JSONObject order = orderService.returnOrderById(fid);
		
		boolean flag = orderService.deleteOrder(fid);
		
		JSONObject obj = new JSONObject();

		if(flag){
			obj.put("result", "true");	
			recordService.addRecordByDelete(fPerson, "删除订单", 2, 3, order.toString());
		}else{
			obj.put("result", "false");	
		}
		

		
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(obj.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
	@RequestMapping(value="/GetOrderById")
	public void GetOrderById(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");
		
		Long fid = Long.parseLong(request.getParameter("fid"));
		
		JSONObject json = orderService.returnOrderById(fid);
				System.out.println(json);
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(json.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
	@RequestMapping(value="/GetAllOrder")
	public void GetAllOrder(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");
		
		String fCang = request.getParameter("fCang");
		String fStatus = request.getParameter("fStatus");
		JSONObject json = orderService.returnAllOrder(fCang,fStatus);
				
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(json.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
	@RequestMapping(value="/ModifyOrderStatus")
	public void ModifyOrderStatus(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
			
		String fPerson = request.getParameter("fPerson");
		
		long fid = Long.parseLong(request.getParameter("fid"));
		String fStatus = request.getParameter("fStatus");
		
		JSONObject beforeOrder = orderService.returnOrderById(fid);
		Boolean flag = orderService.modifyOrderStatus(fid,fStatus);
		JSONObject afterOrder = orderService.returnOrderById(fid);
		
		JSONObject json = new JSONObject();
		json.put("result", flag);
		
		if(flag){
			recordService.addRecordByModify(fPerson, "修改订单状态", 2, 2, beforeOrder.toString(), afterOrder.toString());
		}
		
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(json.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
///////////////////////////////////////////////////////////////	
	

	
//	@RequestMapping(value="/BookChildOrder")
//	public void BookChildOrder(HttpServletRequest request,HttpServletResponse response) throws IOException{
//		request.setCharacterEncoding("utf-8");
//		
//		String result = request.getParameter("beans");
//		JSONArray arr = JSONArray.fromObject(result);
//		
//		boolean flag = orderService.bookChildOrder(arr);
//			
//		JSONObject json = new JSONObject();
//		if(flag){
//			json.put("result", "true");
//		}else{
//			json.put("result", "false");
//		}
//		response.setContentType("text/html;charset=utf-8");
//		 try {
//		 PrintWriter writer = response.getWriter();
//		 writer.write(json.toString());
//		 } catch (IOException e) {
//		 // TODO Auto-generated catch block
//		 e.printStackTrace();
//		 }
//		 
//	}
	
	//////////////////////////////暂停用/////////////////////////////////////
	
	
	@RequestMapping(value="/returnChildOrderByMainId")
	public void returnChildOrderByMainId(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
			
		Long fid = Long.parseLong(request.getParameter("fid"));
		JSONObject json = orderService.returnChildOrderByMainId(fid);

		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(json.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
	@RequestMapping(value="/ComfirmBook")
	public void ComfirmBook(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
		
		Long fid = Long.parseLong(request.getParameter("fid"));
		Long fMaterialID = Long.parseLong(request.getParameter("fMaterialID"));
		int fRequestQuantity = Integer.parseInt(request.getParameter("fRequestQuantity"));
		int fFlowQuantity = Integer.parseInt(request.getParameter("fFlowQuantity"));
		String fLimitTime = request.getParameter("fLimitTime");
		//添加子订单
		boolean flag = orderService.comfirmBook(fid,fRequestQuantity,fFlowQuantity,fMaterialID,fLimitTime);
			
		JSONObject json = new JSONObject();
		if(flag){
			//确认总订单
			boolean flag2 = orderService.modifyOrderStatus(fid,"执行中");
			if(flag2){
				json.put("result", "true");
			}else{
				json.put("result", "false");
			}
		}else{
			json.put("result", "false");
		}
		
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(json.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
	@RequestMapping(value="/ModifyChildOrderStatus")
	public void ModifyChildOrderStatus(HttpServletRequest request,HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("utf-8");
			
		long fid = Long.parseLong(request.getParameter("fid"));
		String fStatus = request.getParameter("fStatus");
		Boolean flag = orderService.modifyChildOrderStatus(fid,fStatus);

		JSONObject json = new JSONObject();
		json.put("result", flag);
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(json.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
	
}
