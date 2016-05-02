package com.mesclouds.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.mesclouds.model.Material;
import com.mesclouds.model.OrderChild;
import com.mesclouds.model.ProductOrder;

@Repository
public class OrderDao {

	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	public long bookOrder(final ProductOrder order){
		//保存素材
			    final String INSERT_SQL = "insert into t_order(fMaterialID,fName,fQuantity,fBusiness,fOrderMan,fLimitTime,fBeginTime,fEndTime,fStatus,fRemark) values(?,?,?,?,?,?,?,?,?,?)";  
		        KeyHolder keyHolder = new GeneratedKeyHolder();  
		        jdbcTemplate.update(new PreparedStatementCreator() { 
					@Override
					public PreparedStatement createPreparedStatement(
							java.sql.Connection connection) throws SQLException {
		                PreparedStatement ps = connection.prepareStatement(INSERT_SQL,  
		                        new String[] { "fid" });  
		                 ps.setLong(1, order.getfMaterialID());            
		                 ps.setString(2, order.getfName());  
		                 ps.setInt(3, order.getfQuantity());  
		                 ps.setString(4,order.getfBusiness());
		                 ps.setString(5, order.getfOrderMan());  
		                 ps.setString(6, order.getfLimitTime()); 
		                 ps.setString(7, order.getfBeginTime());
		                 ps.setString(8, order.getfEndTime());
		                 ps.setString(9, order.getfStatus());
		                 ps.setString(10, order.getfRemark());
		                return ps; 
					}  
		        }, keyHolder);  
			Number current_key = keyHolder.getKey();
			System.out.println("当前主键："+current_key);
			
			return current_key.longValue();

	}
	
	public void updateOrder(ProductOrder order){
		String sql="update t_order set fMaterialID=?,fName=?," +
				"fQuantity=?,fBusiness=?," +
				"fOrderMan=?,fLimitTime=?," +
				"fBeginTime=?,fEndTime=?," +
				"fStatus=?,fRemark=? where fid = ?";
		jdbcTemplate.update(sql, new Object[]{order.getfMaterialID(),
				order.getfName(),order.getfQuantity(),
				order.getfBusiness(),order.getfOrderMan(),order.getfLimitTime(),
				order.getfBeginTime(),order.getfEndTime(),
				order.getfStatus(),order.getfRemark(),order.getFid()});
	}
	
	public void deleteOrder(long fid){	
		
		
		String sql="delete from t_order where fid=?";
		
		jdbcTemplate.update(sql, new Object[]{fid});
	}
	
	public ProductOrder returnOrderById(long fid){
		String sql="";
		Object[] obj ={};

			sql = "select * from t_order where fid = ? ";
//					 +"union " +
//					"select Material.id,summary,publishTime,isMulti,userId " +
//					"from Material,MaterialBody " +
//					"where userId=? and Material.id=MaterialBody.materialId and title like ?";
			obj = new Object[]{fid};
		
		List<ProductOrder> orders = new ArrayList<ProductOrder>();        
        List list = jdbcTemplate.queryForList(sql,obj); 
        Iterator iterator = list.iterator();
        ProductOrder order = null;
        
        while (iterator.hasNext()) {
            Map maporder =  (Map) iterator.next();
            order = new ProductOrder();
            order.setFid(Long.parseLong(maporder.get("fid").toString()));
            
            order.setfMaterialID(Long.parseLong(maporder.get("fMaterialID").toString()));
            order.setfName(maporder.get("fName").toString());
            order.setfQuantity(Integer.parseInt(maporder.get("fQuantity").toString()));
        	order.setfBusiness(maporder.get("fBusiness").toString());
        	order.setfOrderMan(maporder.get("fOrderMan").toString());
        	order.setfLimitTime(maporder.get("fLimitTime").toString());
        	order.setfBeginTime(maporder.get("fBeginTime").toString());
        	order.setfEndTime(maporder.get("fEndTime").toString());
            order.setfStatus(maporder.get("fStatus").toString());
            order.setfRemark(maporder.get("fRemark").toString());
            orders.add(order);
        }
        return order;
        
		
	}
	
	public void modifyOrderStatus(long fid ,String fStatus,String fTime){	
		
		String sql = null;
		Object[] obj =null;
		if(fStatus.equals("未确认")){
			sql ="update t_order set fStatus=? where fid=?";
			obj = new Object[]{fStatus,fid};
		}else if(fStatus.equals("执行中")){
			sql ="update t_order set fStatus=? ,fBeginTime=? where fid=?";
			obj = new Object[]{fStatus,fTime,fid};
		}else if(fStatus.equals("已删除")){
			sql ="update t_order set fStatus=?  where fid=?";
			obj = new Object[]{fStatus,fid};
		}else if(fStatus.equals("已完成")){
			sql ="update t_order set fStatus=? ,fEndTime=? where fid=?";
			obj = new Object[]{fStatus,fTime,fid};
		}
			
		jdbcTemplate.update(sql, obj);
	}
	
	
	public List<ProductOrder> returnAllOrder(String fCang,String fStatus){
		String sql="";
		Object[] obj ={};
		System.out.println(fCang+"  "+fStatus);
		if(fCang.equals("BOSS")){
			sql = "select * from t_order  where fStatus = ? limit 20";

			obj = new Object[]{fStatus};
		}else{
			sql = "select * from t_order  where fBusiness =? and fStatus = ? limit 20";

			obj = new Object[]{fCang,fStatus};
		}
			
		List<ProductOrder> orders = new ArrayList<ProductOrder>();        
        List list = jdbcTemplate.queryForList(sql,obj); 
        System.out.println("wwawawa");
        Iterator iterator = list.iterator();
        while (iterator.hasNext()) {
            Map maporder =  (Map) iterator.next();
            ProductOrder order = new ProductOrder();
            order.setFid(Long.parseLong(maporder.get("fid").toString()));
            
            order.setfMaterialID(Long.parseLong(maporder.get("fMaterialID").toString()));
            order.setfName(maporder.get("fName").toString());
            order.setfQuantity(Integer.parseInt(maporder.get("fQuantity").toString()));
        	order.setfBusiness(maporder.get("fBusiness").toString());
        	order.setfOrderMan(maporder.get("fOrderMan").toString());
        	order.setfLimitTime(maporder.get("fLimitTime").toString());
        	order.setfBeginTime(maporder.get("fBeginTime").toString());
        	order.setfEndTime(maporder.get("fEndTime").toString());
            order.setfStatus(maporder.get("fStatus").toString());
            System.out.println("22");
            order.setfRemark(maporder.get("fRemark").toString());
            System.out.println("33");
            orders.add(order);
        }
        return orders;
        
		
	}
	
///////////////////////////////////////////////////////////////
	
	public long bookChildOrder(final OrderChild order){
	    System.out.println("一");
		final String INSERT_SQL = "insert into t_childorder(fMaterialID,fSuperOrderID,fName,fBeginTime,fEndTime,fLimitTime,fCang,fQuantity,fAlreadyQuantity,fStatus,fRemark) values(?,?,?,?,?,?,?,?,?,?,?)";  
        KeyHolder keyHolder = new GeneratedKeyHolder();  
        jdbcTemplate.update(new PreparedStatementCreator() { 
			@Override
			public PreparedStatement createPreparedStatement(
					java.sql.Connection connection) throws SQLException {
                PreparedStatement ps = connection.prepareStatement(INSERT_SQL,  
                        new String[] { "fid" });  
                 ps.setLong(1, order.getfMaterialID());            
                 ps.setLong(2, order.getfSuperOrderID());  
                 ps.setString(3, order.getfName());  
                 ps.setString(4,order.getfBeginTime());
                 ps.setString(5, order.getfEndTime());
                 ps.setString(6, order.getfLimitTime());
                 ps.setString(7, order.getfCang());  
                 ps.setInt(8, order.getfQuantity()); 
                 ps.setInt(9, order.getfAlreadyQuantity()); 
                 ps.setString(10, order.getfStatus());
                 ps.setString(11, order.getfRemark());
                return ps; 
			}  
        }, keyHolder);  
	Number current_key = keyHolder.getKey();
	System.out.println("当前主键："+current_key);
	System.out.println("二");
	return current_key.longValue();
	}
	
//	public void comfirmBook(long fid ,String fBeginTime){
//		String sql="update t_order set fStatus=?,fBeginTime=? where fid = ?";
//		jdbcTemplate.update(sql, new Object[]{"执行中",fBeginTime,fid});
//	}
	
	

	
	public List<OrderChild> returnOrderByMainId(long fid){
		String sql="";
		Object[] obj ={};

			sql = "select * from t_childorder where fMaterialID = ? ";
//					 +"union " +
//					"select Material.id,summary,publishTime,isMulti,userId " +
//					"from Material,MaterialBody " +
//					"where userId=? and Material.id=MaterialBody.materialId and title like ?";
			obj = new Object[]{fid};
		
		List<OrderChild> orders = new ArrayList<OrderChild>();        
        List list = jdbcTemplate.queryForList(sql,obj); 
        Iterator iterator = list.iterator();
        OrderChild order = null;
        
        while (iterator.hasNext()) {
            Map maporder =  (Map) iterator.next();
            order = new OrderChild();
            order.setFid(Long.parseLong(maporder.get("fid").toString()));
            
            order.setfMaterialID(Long.parseLong(maporder.get("fMaterialID").toString()));
            order.setfSuperOrderID(Long.parseLong(maporder.get("fSuperOrderID").toString()));
            order.setfName(maporder.get("fName").toString());
        	order.setfBeginTime(maporder.get("fBeginTime").toString());
        	order.setfEndTime(maporder.get("fEndTime").toString());
        	order.setfLimitTime(maporder.get("fLimitTime").toString());
        	order.setfCang(maporder.get("fCang").toString());
            order.setfQuantity(Integer.parseInt(maporder.get("fQuantity").toString()));
            order.setfAlreadyQuantity(Integer.parseInt(maporder.get("fAlreadyQuantity").toString()));
            order.setfStatus(maporder.get("fStatus").toString());
            order.setfRemark(maporder.get("fRemark").toString());
            orders.add(order);
        }
        return orders;
        
		
	}
	

	
	public void modifyChildOrderStatus(long fid ,String fStatus,String fTime){	
		String sql = null;
		Object[] obj =null;
		if(fStatus.equals("执行中")){
			sql ="update t_childorder set fStatus=? ,fBeginTime=? where fid=?";
			obj = new Object[]{fStatus,fTime,fid};
		}else if(fStatus.equals("已删除")){
			sql ="update t_childorder set fStatus=?  where fid=?";
			obj = new Object[]{fStatus,fid};
		}else if(fStatus.equals("已完成")){
			sql ="update t_childorder set fStatus=? ,fEndTime=? where fid=?";
			obj = new Object[]{fStatus,fTime,fid};
		}
			
		jdbcTemplate.update(sql, obj);
	}
	
	
}
