package com.mesclouds.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mesclouds.dao.MaterialDao;
import com.mesclouds.dao.OrderDao;
import com.mesclouds.model.Material;
import com.mesclouds.model.OrderChild;
import com.mesclouds.model.ProductOrder;
import com.mesclouds.utils.DateUtils;
import com.sun.org.apache.bcel.internal.generic.NEW;

@Service
public class OrderService {

	@Autowired
	OrderDao orderDao;
	@Autowired
	MaterialDao materialDao;
	
	public long bookOrder(long fMaterialID,String fName,int fQuantity,
			String fBusiness,String fOrderMan,String fLimitTime,
			String fStatus,String fRemark){
		
		ProductOrder order = new ProductOrder();
		order.setfMaterialID(fMaterialID);
		order.setfName(fName);
		order.setfQuantity(fQuantity);
		order.setfBusiness(fBusiness);
		order.setfOrderMan(fOrderMan);
		order.setfLimitTime(fLimitTime);
		order.setfBeginTime("");
		order.setfEndTime("");
		order.setfStatus(fStatus);
		order.setfRemark(fRemark);
		JSONObject obj = JSONObject.fromObject(order);
		System.out.println(obj.toString());
		try {
			return orderDao.bookOrder(order);
		} catch (Exception e) {
			return -1;
		}
		
		
		
	}
	
	public boolean updateOrder(long fid,long fMaterialID,String fName,int fQuantity,
			String fBusiness,String fOrderMan,String fLimitTime,
			String fStatus,String fRemark){
		
		ProductOrder order = new ProductOrder();
		order.setFid(fid);
		order.setfMaterialID(fMaterialID);
		order.setfName(fName);
		order.setfQuantity(fQuantity);
		order.setfBusiness(fBusiness);
		order.setfOrderMan(fOrderMan);
		order.setfLimitTime(fLimitTime);
		order.setfBeginTime("");
		order.setfEndTime("");
		order.setfStatus(fStatus);
		order.setfRemark(fRemark);
		JSONObject obj = JSONObject.fromObject(order);
		System.out.println(obj);
		try {
			orderDao.updateOrder(order);
			return true;
		} catch (Exception e) {
			return false;
		}
		
		
		
	}
	
	public JSONObject returnOrderById(long fid){
		JSONObject obj = new JSONObject();
		try {
			ProductOrder order = orderDao.returnOrderById(fid);
			JSONObject json = JSONObject.fromObject(order);
			obj.put("result", json.toString());
		} catch (Exception e) {
			obj.put("result", "false");
		}
		return obj;
	}
	
	public boolean deleteOrder(long fid){
		
		try {
			
			modifyOrderStatus(fid, "已删除");
			return true;
		} catch (Exception e) {	
			return false;
		}
		
	}
	
	public boolean modifyOrderStatus(long fid,String fStatus){
		try {
			Date date = new Date();
			String fTime = DateUtils.getDate(date, "yyyy-MM-dd hh:mm");
			orderDao.modifyOrderStatus(fid,fStatus,fTime);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	
////////////////////////////////////////////////////////
	
	public JSONObject returnChildOrderByMainId(long fid){
		JSONObject obj = new JSONObject();
		try {
			List<OrderChild> beans = orderDao.returnOrderByMainId(fid);
			JSONArray arr = JSONArray.fromObject(beans);
			obj.put("result", arr);

			return obj; // 返回完整的Orders

		} catch (Exception e) {
			obj.put("result", "false");
			return obj;
		}
	}
	

	
//	public boolean bookChildOrder(JSONArray arr){
//		try {
//			List<OrderChild> beans = new ArrayList<OrderChild>();
//			Date date = new Date();
//			String time = DateUtils.getDate(date, "yyyy-MM-dd hh:mm");
//			for(int i=0;i<arr.size();i++){
//				JSONObject js = arr.getJSONObject(i);
//				OrderChild bean = new OrderChild();
//				bean.setfMaterialID(Long.parseLong(js.getString("fMaterialID")));
//				bean.setfSuperOrderID(Long.parseLong(js.getString("fSuperOrderID")));
//				bean.setfName(js.getString("fName"));			
//				bean.setfBeginTime(time);
//				bean.setfQuantity(Integer.parseInt(js.getString("fQuantity")));
//				bean.setfCang(js.getString("fCang"));
//				bean.setfStatus("未确认");
//				beans.add(bean);
//			}
//			for(int i=0;i<beans.size();i++){
//				OrderChild order = beans.get(i);
//				orderDao.bookChildOrder(order);
//			}
//			return true;
//		} catch (Exception e) {
//			return false;
//		}
//		
//		
//	}
	
	
	/*
	 * 
	 */
	
	
	public boolean comfirmBook(long fid ,int fRequestQuantity, int fFlowQuantity , long fMaterialID ,String fLimitTime){
		try {
			//获取订单产品及其子产品的信息
			List<Material> materials = new ArrayList<Material>();
		
			Material material = new Material();
			
			// 得到指定UserId的所有Material
			material = materialDao.returnMaterialById(fMaterialID);
			materials.add(material);

			if(!material.getfInclude().equals("")){
			String[] str1 = material.getfInclude().split("-");
			String[] include = str1[0].split(",");
			for(int i=0; i<include.length;i++){
				if(!include[i].equals("")){
				long id = Long.parseLong(include[i]);
				Material child = materialDao.returnMaterialById(id);
				materials.add(child);
				}
			}
			}
			
			//给订单产品下订单
			OrderChild firstchild = new OrderChild();
			firstchild.setfMaterialID(materials.get(0).getFid());
			firstchild.setfSuperOrderID(fid);
			firstchild.setfName(materials.get(0).getfName());
			firstchild.setfBeginTime("");
			firstchild.setfEndTime("");
			firstchild.setfLimitTime(fLimitTime);
			firstchild.setfCang(materials.get(0).getfCang());
			firstchild.setfQuantity(fRequestQuantity);
			firstchild.setfStatus("未确认");
			firstchild.setfRemark("");

			
			//对产品的库存量进行相应的修改
			if(fRequestQuantity <= fFlowQuantity){
				materialDao.setProductQuantity(materials.get(0).getFid(),fFlowQuantity-fRequestQuantity);
				firstchild.setfAlreadyQuantity(fRequestQuantity);
				orderDao.bookChildOrder(firstchild);
			}else{
				materialDao.setProductQuantity(materials.get(0).getFid(),0);
				firstchild.setfAlreadyQuantity(fFlowQuantity);
				orderDao.bookChildOrder(firstchild);
				if(materials.size()>1){
					String[] ss = materials.get(0).getfInclude().split("-");
					String[] eachQuan = ss[1].split(",");
					for(int i=1;i<materials.size();i++){

						int needQuan = (fRequestQuantity-fFlowQuantity)*Integer.parseInt(eachQuan[i-1]);
						
						//如果子产品包含子产品 则再调用该函数
						if(!materials.get(i).getfInclude().equals("")){
							comfirmBook(fid ,needQuan, materials.get(i).getfFlowQuantity() ,materials.get(i).getFid(),fLimitTime);
						}else{
						//给没有子产品的子产品下订单	
							OrderChild ch = new OrderChild();
							ch.setfMaterialID(materials.get(i).getFid());
							ch.setfSuperOrderID(fid);
							ch.setfName(materials.get(0).getfName());
							ch.setfCang(materials.get(0).getfCang());
							ch.setfBeginTime("");
							ch.setfEndTime("");
							ch.setfLimitTime(fLimitTime);
							ch.setfQuantity(needQuan);
							ch.setfStatus("未确认");
							ch.setfRemark("");
							
							if(needQuan<=materials.get(i).getfFlowQuantity()){
								materialDao.setProductQuantity(materials.get(i).getFid(),materials.get(i).getfFlowQuantity()-needQuan);
								ch.setfAlreadyQuantity(needQuan);
								orderDao.bookChildOrder(ch);
							}else{
								materialDao.setProductQuantity(materials.get(i).getFid(),0);
								ch.setfAlreadyQuantity(materials.get(i).getfFlowQuantity());
								orderDao.bookChildOrder(ch);
							}
						}
						
						
						}
				}
			}
			
			
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	
	public JSONObject returnAllOrder(String fCang,String fStatus){
		JSONObject obj = new JSONObject();
		JSONArray arr = new JSONArray();
		try {
			List<ProductOrder> orders = new ArrayList<ProductOrder>();
			orders = orderDao.returnAllOrder(fCang,fStatus);
			System.out.println("get!!!!");
			for (int i = 0; i < orders.size(); i++) {
				JSONObject json = JSONObject.fromObject(orders.get(i));
				arr.add(json);
			}
				obj.put("result", arr);
				System.out.println(obj.toString());
		} catch (Exception e) {
			obj.put("result", "false");
		}
		return obj;
	}
	
	public boolean modifyChildOrderStatus(long fid,String fStatus){
		try {
			Date date = new Date();
			String fTime = DateUtils.getDate(date, "yyyy-MM-dd hh:mm");
			orderDao.modifyChildOrderStatus(fid,fStatus,fTime);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	

}
