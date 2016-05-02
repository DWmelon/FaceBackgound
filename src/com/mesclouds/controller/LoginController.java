package com.mesclouds.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mesclouds.service.LoginService;

@Controller
public class LoginController {

	@Autowired
	LoginService loginService;
	
	//登陆接口
	@RequestMapping(value = "/LoginApp") 
	public void loginApp(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		String fName = request.getParameter("fName");
		String fPassWord = request.getParameter("fPassWord");
		String fCang = request.getParameter("fCang");
		
		boolean flag = loginService.loginApp(fName, fPassWord,fCang);
		
		JSONObject obj = new JSONObject();
		if(flag){
			obj.put("result", "true");	
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
	
	
}
