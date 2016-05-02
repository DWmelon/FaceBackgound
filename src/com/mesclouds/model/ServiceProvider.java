package com.mesclouds.model;

import java.io.Serializable;

public class ServiceProvider implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9027215809122846371L;
	
	
	private int id;
	
	private String serviceName;
	
	//mongoDBId
	private String mongoId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getMongoId() {
		return mongoId;
	}

	public void setMongoId(String mongoId) {
		this.mongoId = mongoId;
	}	

}
