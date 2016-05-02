package com.mesclouds.model;

import java.io.Serializable;

public class RecordBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long fid;
	private String fPerson;
	private String fTitle;
	private int fType;
	private int fOperationType;
	private String fTime;
	private long fTargetID;
	private String fBefore;
	private String fAfter;
	public long getFid() {
		return fid;
	}
	public void setFid(long fid) {
		this.fid = fid;
	}
	public String getfPerson() {
		return fPerson;
	}
	public void setfPerson(String fPerson) {
		this.fPerson = fPerson;
	}
	public String getfTitle() {
		return fTitle;
	}
	public void setfTitle(String fTitle) {
		this.fTitle = fTitle;
	}
	public int getfType() {
		return fType;
	}
	public void setfType(int fType) {
		this.fType = fType;
	}
	public int getfOperationType() {
		return fOperationType;
	}
	public void setfOperationType(int fOperationType) {
		this.fOperationType = fOperationType;
	}
	public String getfTime() {
		return fTime;
	}
	public void setfTime(String fTime) {
		this.fTime = fTime;
	}
	public long getfTargetID() {
		return fTargetID;
	}
	public void setfTargetID(long fTargetID) {
		this.fTargetID = fTargetID;
	}
	public String getfBefore() {
		return fBefore;
	}
	public void setfBefore(String fBefore) {
		this.fBefore = fBefore;
	}
	public String getfAfter() {
		return fAfter;
	}
	public void setfAfter(String fAfter) {
		this.fAfter = fAfter;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

}
