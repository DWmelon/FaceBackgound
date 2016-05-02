package com.mesclouds.model;

import java.io.Serializable;
import java.util.Date;

public class ProductOrder implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private long fid;
	private long fMaterialID;
	private String fName;
	private int fQuantity;
	private String fBusiness;
	private String fOrderMan;
	private String fLimitTime;
	private String fBeginTime;
	private String fEndTime;
	private String fStatus;
	private String fRemark;
	
	
	public String getfBeginTime() {
		return fBeginTime;
	}
	public void setfBeginTime(String fBeginTime) {
		this.fBeginTime = fBeginTime;
	}
	public String getfEndTime() {
		return fEndTime;
	}
	public void setfEndTime(String fEndTime) {
		this.fEndTime = fEndTime;
	}
	public String getfStatus() {
		return fStatus;
	}
	public void setfStatus(String fStatus) {
		this.fStatus = fStatus;
	}
	public String getfRemark() {
		return fRemark;
	}
	public void setfRemark(String fRemark) {
		this.fRemark = fRemark;
	}
	public long getFid() {
		return fid;
	}
	public void setFid(long fid) {
		this.fid = fid;
	}
	public long getfMaterialID() {
		return fMaterialID;
	}
	public void setfMaterialID(long fMaterialID) {
		this.fMaterialID = fMaterialID;
	}
	public String getfName() {
		return fName;
	}
	public void setfName(String fName) {
		this.fName = fName;
	}
	public int getfQuantity() {
		return fQuantity;
	}
	public void setfQuantity(int fQuantity) {
		this.fQuantity = fQuantity;
	}
	public String getfBusiness() {
		return fBusiness;
	}
	public void setfBusiness(String fBusiness) {
		this.fBusiness = fBusiness;
	}
	public String getfOrderMan() {
		return fOrderMan;
	}
	public void setfOrderMan(String fOrderMan) {
		this.fOrderMan = fOrderMan;
	}
	public String getfLimitTime() {
		return fLimitTime;
	}
	public void setfLimitTime(String fLimitTime) {
		this.fLimitTime = fLimitTime;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
