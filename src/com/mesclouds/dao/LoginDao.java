package com.mesclouds.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LoginDao {

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	//登陆APP
	public String loginApp(String fName,String fCang){
		String sql = "select fPassWord from t_users where fName = ? and fCang = ?";
		String password = (String) jdbcTemplate.queryForObject( sql, new Object[] {fName,fCang}, java.lang.String.class);
		return password;
	}
	
	
	
}
