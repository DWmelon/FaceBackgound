package com.mesclouds.model;

import java.io.Serializable;

public class OrderChild implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long fid;
	private long fMaterialID;
	private long fSuperOrderID;
	private String fName;
	private String fBeginTime;
	private String fEndTime;
	private String fLimitTime;
	private String fCang;
	private int fQuantity;
	private int fAlreadyQuantity;
	private String fStatus;
	private String fRemark;
	
	
	public String getfLimitTime() {
		return fLimitTime;
	}
	public void setfLimitTime(String fLimitTime) {
		this.fLimitTime = fLimitTime;
	}
	public int getfAlreadyQuantity() {
		return fAlreadyQuantity;
	}
	public void setfAlreadyQuantity(int fAlreadyQuantity) {
		this.fAlreadyQuantity = fAlreadyQuantity;
	}
	public String getfStatus() {
		return fStatus;
	}
	public void setfStatus(String fStatus) {
		this.fStatus = fStatus;
	}
	public String getfCang() {
		return fCang;
	}
	public void setfCang(String fCang) {
		this.fCang = fCang;
	}
	public int getfQuantity() {
		return fQuantity;
	}
	public void setfQuantity(int fQuantity) {
		this.fQuantity = fQuantity;
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
	public long getfSuperOrderID() {
		return fSuperOrderID;
	}
	public void setfSuperOrderID(long fSuperOrderID) {
		this.fSuperOrderID = fSuperOrderID;
	}
	public String getfName() {
		return fName;
	}
	public void setfName(String fName) {
		this.fName = fName;
	}
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
	public String getfRemark() {
		return fRemark;
	}
	public void setfRemark(String fRemark) {
		this.fRemark = fRemark;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

}
