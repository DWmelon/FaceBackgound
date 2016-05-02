package com.mesclouds.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.ParameterizedBeanPropertyRowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.google.gson.JsonObject;
import com.mesclouds.model.Material;
import com.mesclouds.model.MaterialBody;
import com.mysql.jdbc.Connection;

@Repository
public class MaterialDao {
	@Autowired
	JdbcTemplate jdbcTemplate;
	
//	
//	//修改素材体
//	public void updateMaterial(Material material){			
//		
//		String sql="update Material set summary=?,publishTime=?,isMulti=? where id=?";  
//        Object obj[]={
//        		material.getSummary(),
//        		material.getPublishTime(),
//        		material.getIsMulti(),
//        		material.getId()
//        		};
//        jdbcTemplate.update(sql,obj);  
//	}

	

	
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
	
	//判断是否存在
	public boolean isExist(Material material){
		
		String sql =  "select count(*) from t_material where " +
				"fName = ? and fSize = ? and fLevel = ? " +
				"and fInclude = ? and fXianWen = ? and fAutoOrElec = ? " +
				"and fProcess = ? and fRemark = ? and fKouShu = ? " +
				"and fQueKou = ? and fJiao = ? and fDetail = ? " +
				"and fCang = ?";
		
		Object[] obj = new Object[]{material.getfName(),material.getfSize(),
									material.getfLevel(),material.getfInclude(),
									material.getfXianWen(),material.getfAutoOrElec(),
									material.getfProcess(),material.getfRemark(),
									material.getfKouShu(),material.getfQueKou(),
									material.getfJiao(),material.getfDetail(),
									material.getfCang()};
		int count = 0; 
		count = (int)jdbcTemplate.queryForObject(sql, obj, java.lang.Integer.class);
		if(count > 0)
			return true;
		else 
			return false;
	}
	

	
	//保存素材
	public long saveMaterial(final Material material){
			System.out.println(material.getfName());
		    final String INSERT_SQL = "insert into t_material(fName,fPlace,fQuantity,fFlowQuantity,fSize,fLevel,fInclude,fXianWen,fAutoOrElec,fProcess,fRemark,fKouShu,fQueKou,fJiao,fDetail,fCang) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";  
	        KeyHolder keyHolder = new GeneratedKeyHolder();  
	        jdbcTemplate.update(new PreparedStatementCreator() { 
				@Override
				public PreparedStatement createPreparedStatement(
						java.sql.Connection connection) throws SQLException {
	                PreparedStatement ps = connection.prepareStatement(INSERT_SQL,  
	                        new String[] { "fid" });  
	                 ps.setString(1, material.getfName());            
	                 ps.setString(2, material.getfPlace());  
	                 ps.setInt(3, material.getfQuantity());
	                 ps.setInt(4, material.getfFlowQuantity());
	                 ps.setString(5,material.getfSize());
	                 ps.setString(6, material.getfLevel());  
	                 ps.setString(7, material.getfInclude());  
	                 ps.setString(8, material.getfXianWen());  
	                 ps.setString(9, material.getfAutoOrElec());  
	                 ps.setString(10, material.getfProcess());  
	                 ps.setString(11, material.getfRemark()); 
	                 
	                 ps.setString(12, material.getfKouShu());
	                 ps.setString(13, material.getfQueKou());
	                 ps.setString(14, material.getfJiao());
	                 ps.setString(15, material.getfDetail());
	                 ps.setString(16, material.getfCang());
	                return ps; 
				}  
	        }, keyHolder);  
		Number current_key = keyHolder.getKey();
		System.out.println("当前主键："+current_key);
		
		return current_key.longValue();

	}
	
	//返回模糊搜索后的素材
	public List<Material> returnMaterialByName(String fName ,String fSize,
			String fKouShu,String fLevel,String fCang){
		System.out.println(fName+"?"+fSize+"?"+fKouShu+"?"+fLevel+"?"+fCang);
		String sql="";
		Object[] obj ={};
		StringBuilder strBu = new StringBuilder();
		String[] index = {"0","0","0","0"};
		
			strBu.append("select * from t_material where ");
			strBu.append("fName like ? ");
			if(!fSize.equals("")){
				strBu.append("and fSize = ?");
				index[0]="1";
			}
			if(!fKouShu.equals("")){
				strBu.append("and fKouShu = ?");
				index[1]="1";
			}
			if(!fLevel.equals("不限")){
				strBu.append("and fLevel = ?");
				index[2]="1";
			}
			if(!fCang.equals("不限")){
				strBu.append("and fCang = ?");
				index[3]="1";
			}
			sql = strBu.toString();
			
			int count=0;
			for(int i=0;i<index.length;i++){
				if(index[i].equals("1")){
					count+=1;
				}
			}
			obj = new Object[count+1];
			obj[0]="%"+fName+"%";
			int num=1;
			for(int i=0;i<index.length;i++){
				if(i==0){
					if(index[i].equals("1")){
						obj[num]=fSize;
						num+=1;
					}
					
				}
				if(i==1){
					if(index[i].equals("1")){
						obj[num]=fKouShu;
						num+=1;
					}
					
				}
				if(i==2){
					if(index[i].equals("1")){
						obj[num]=fLevel;
						num+=1;
					}
					
				}
				if(i==3){
					if(index[i].equals("1")){
						obj[num]=fCang;
						num+=1;
					}
					
				}
			}
		System.out.println(sql);
		System.out.println(obj.length);
		
		List<Material> materials = new ArrayList<Material>();        
        List list = jdbcTemplate.queryForList(sql,obj); 
        Iterator iterator = list.iterator();
        Material material = null;
        
        while (iterator.hasNext()) {
            Map mapmaterial =  (Map) iterator.next();
            material = new Material();
            material.setFid(Long.parseLong(mapmaterial.get("fid").toString()));
            material.setfName(mapmaterial.get("fName").toString());
            material.setfPlace(mapmaterial.get("fPlace").toString());
        	material.setfQuantity(Integer.parseInt(mapmaterial.get("fQuantity").toString()));
        	material.setfFlowQuantity(Integer.parseInt(mapmaterial.get("fFlowQuantity").toString()));
        	material.setfSize(mapmaterial.get("fSize").toString());
        	material.setfLevel(mapmaterial.get("fLevel").toString());
        	material.setfInclude(mapmaterial.get("fInclude").toString());
        	material.setfXianWen(mapmaterial.get("fXianWen").toString());
        	material.setfAutoOrElec(mapmaterial.get("fAutoOrElec").toString());
        	material.setfProcess(mapmaterial.get("fProcess").toString());
        	material.setfRemark(mapmaterial.get("fRemark").toString());
            material.setfKouShu(mapmaterial.get("fKouShu").toString());
            material.setfQueKou(mapmaterial.get("fQueKou").toString());
            material.setfJiao(mapmaterial.get("fJiao").toString());
            material.setfDetail(mapmaterial.get("fDetail").toString());
            material.setfCang(mapmaterial.get("fCang").toString());
            materials.add(material);
        }
        return materials;
        
		
	}
	
	//返回素材(ID)
	public Material returnMaterialById(long fid){
		System.out.println("哎呦3");
		String sql= null;
		Object[] obj = null;
		System.out.println(fid+"");
			sql = "select * from t_material where fid = ? ";
//					 +"union " +
//					"select Material.id,summary,publishTime,isMulti,userId " +
//					"from Material,MaterialBody " +
//					"where userId=? and Material.id=MaterialBody.materialId and title like ?";
			obj = new Object[]{fid};
		
		List<Material> materials = new ArrayList<Material>();        
        List list = jdbcTemplate.queryForList(sql,obj); 
        Iterator iterator = list.iterator();
        Material material = null;
        
        while (iterator.hasNext()) {
            Map mapmaterial =  (Map) iterator.next();
            material = new Material();
            material.setFid(Long.parseLong(mapmaterial.get("fid").toString()));
            material.setfName(mapmaterial.get("fName").toString());
            material.setfPlace(mapmaterial.get("fPlace").toString());
        	material.setfQuantity(Integer.parseInt(mapmaterial.get("fQuantity").toString()));
        	material.setfFlowQuantity(Integer.parseInt(mapmaterial.get("fFlowQuantity").toString()));
        	material.setfSize(mapmaterial.get("fSize").toString());
        	material.setfLevel(mapmaterial.get("fLevel").toString());
        	material.setfInclude(mapmaterial.get("fInclude").toString());
        	material.setfXianWen(mapmaterial.get("fXianWen").toString());
        	material.setfAutoOrElec(mapmaterial.get("fAutoOrElec").toString());
        	material.setfProcess(mapmaterial.get("fProcess").toString());
        	material.setfRemark(mapmaterial.get("fRemark").toString());
            material.setfKouShu(mapmaterial.get("fKouShu").toString());
            material.setfQueKou(mapmaterial.get("fQueKou").toString());
            material.setfJiao(mapmaterial.get("fJiao").toString());
            material.setfDetail(mapmaterial.get("fDetail").toString());
            material.setfCang(mapmaterial.get("fCang").toString());
            materials.add(material);
        }
        return material;
        
		
	}
	
	//删除素材
	public void deleteMaterial(long fid){	
		
		
		String sql="delete from t_material where fid=?";
		
		jdbcTemplate.update(sql, new Object[]{fid});
	}
	
	public void motifyMaterialQuantity(long fid , int quantity){
		int count = 0;
		String sql;
		System.out.println();
		if(quantity >= 0 ){
			count = quantity;
			sql = "update t_material set fQuantity = fQuantity + ? where fid = ?";
		}else{
			count = -quantity;
			sql = "update t_material set fQuantity = fQuantity - ? where fid = ?";
		}
		
		jdbcTemplate.update(sql, new Object[]{count,fid});
		
	}
	
	public void motifyMaterialPlace(long fid ,String place){
		String sql = "update t_material set fPlace = ? where fid = ?";
		
		jdbcTemplate.update(sql,new Object[]{place , fid});
	}
	
	//修改可分配库存
	public boolean setProductQuantity(long fid,int fFlowQuantity){
		String sql="update t_material set fFlowQuantity=? where fid=?";
		
		int row = jdbcTemplate.update(sql, new Object[]{fFlowQuantity,fid});
		if(row>0){
			return true;
		}else{
			return false;
		}
		
	}
	
}
