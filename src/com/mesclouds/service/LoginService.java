package com.mesclouds.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mesclouds.dao.LoginDao;

@Service
public class LoginService {

	@Autowired
	LoginDao loginDao;
	
	
	// 登陆App
	public boolean loginApp(String fName, String fPassWord ,String fCang) {
System.out.println("1");
		String password =  loginDao.loginApp(fName,fCang);
		if(fPassWord.equals(password)){
			System.out.println("2");
			return true;
		}else{
			return false;
		}
	}
	
}
