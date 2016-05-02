package com.mesclouds.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Material implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long fid;
	private String fName;
	private String fPlace;
	private int fQuantity;
	private int fFlowQuantity;
	private String fSize;
	private String fLevel;
	private String fInclude;
	private String fXianWen;
	private String fAutoOrElec;
	private String fProcess;
	private String fRemark;
	
	private String fKouShu;
	private String fQueKou;
	private String fJiao;
	private String fDetail;
	
	private String fCang;
	
	
	
	public int getfFlowQuantity() {
		return fFlowQuantity;
	}
	public void setfFlowQuantity(int fFlowQuantity) {
		this.fFlowQuantity = fFlowQuantity;
	}
	public String getfCang() {
		return fCang;
	}
	public void setfCang(String fCang) {
		this.fCang = fCang;
	}
	public String getfKouShu() {
		return fKouShu;
	}
	public void setfKouShu(String fKouShu) {
		this.fKouShu = fKouShu;
	}
	public String getfQueKou() {
		return fQueKou;
	}
	public void setfQueKou(String fQueKou) {
		this.fQueKou = fQueKou;
	}
	public String getfJiao() {
		return fJiao;
	}
	public void setfJiao(String fJiao) {
		this.fJiao = fJiao;
	}
	public String getfDetail() {
		return fDetail;
	}
	public void setfDetail(String fDetail) {
		this.fDetail = fDetail;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public long getFid() {
		return fid;
	}
	public void setFid(long fid) {
		this.fid = fid;
	}
	public String getfName() {
		return fName;
	}
	public void setfName(String fName) {
		this.fName = fName;
	}
	public String getfPlace() {
		return fPlace;
	}
	public void setfPlace(String fPlace) {
		this.fPlace = fPlace;
	}
	public int getfQuantity() {
		return fQuantity;
	}
	public void setfQuantity(int fQuantity) {
		this.fQuantity = fQuantity;
	}
	
	public String getfSize() {
		return fSize;
	}
	public void setfSize(String fSize) {
		this.fSize = fSize;
	}
	public String getfLevel() {
		return fLevel;
	}
	public void setfLevel(String fLevel) {
		this.fLevel = fLevel;
	}
	public String getfInclude() {
		return fInclude;
	}
	public void setfInclude(String fInclude) {
		this.fInclude = fInclude;
	}
	
	
	public String getfXianWen() {
		return fXianWen;
	}
	public void setfXianWen(String fXianWen) {
		this.fXianWen = fXianWen;
	}
	public String getfAutoOrElec() {
		return fAutoOrElec;
	}
	public void setfAutoOrElec(String fAutoOrElec) {
		this.fAutoOrElec = fAutoOrElec;
	}

	public String getfProcess() {
		return fProcess;
	}
	public void setfProcess(String fProcess) {
		this.fProcess = fProcess;
	}
	public String getfRemark() {
		return fRemark;
	}
	public void setfRemark(String fRemark) {
		this.fRemark = fRemark;
	}
	
	
}
