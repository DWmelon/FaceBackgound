package com.mesclouds.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mesclouds.dao.MaterialDao;
import com.mesclouds.model.Material;
import com.mesclouds.model.MaterialBody;
import com.mesclouds.utils.DateUtils;
import com.mesclouds.utils.UUIDUtils;

/**
 * 素材操作的各种方法（业务）
 * 
 * @author
 * 
 */

@Service
public class MaterialService {
	@Autowired
	MaterialDao materialDao;

//	// 修改素材管理数据（单个素材）
//	public JSONObject updateMaterial(JSONObject jsonstr) {
//
//		JSONObject js = new JSONObject();
//
//		Map<String, Class> classMap = new HashMap<String, Class>();
//		classMap.put("materialBody", MaterialBody.class); // 设置JSON的内部集合类型
//		Material material = (Material) JSONObject.toBean(jsonstr,
//				Material.class, classMap);// 转换成指定的类型
//
//		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		String time = formatter.format(new Date());
//		material.setPublishTime(time);
//		System.out.println();
//		try {
//			materialDao.updateMaterial(material);
//			materialDao.deleteMaterialBody(material.getId());
//			for (int i = 0; i < material.getMaterialBody().size(); i++) {
//				material.getMaterialBody().get(i)
//						.setMaterialId(material.getId());
//				JSONObject json = JSONObject.fromObject(material
//						.getMaterialBody().get(i));
//				System.out.println(json.toString());
//
//				materialDao.saveMaterialBody(material.getMaterialBody().get(i));
//			}
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			System.out.println("修改素材体失败！");
//			js.put("result", "false");
//			return js;
//		}
//
//		js.put("result", "true");
//		return js;
//
//	}


	///////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////
	
	
	// 判断是否已经存在该产品
	public boolean isExist(Material material){
		
		return materialDao.isExist(material);
		
		
	}


	// 返回素材管理数据
	public JSONObject queryMaterialByName(String fName,String fSize,
											String fKouShu,String fLevel,String fCang) {
		JSONObject js = new JSONObject();
		JSONArray jsonarr;
		List<Material> materials = new ArrayList<Material>();
		try {
			// 得到指定UserId的所有Material
			materials = materialDao.returnMaterialByName(fName,fSize,fKouShu,fLevel,fCang);
			// 如果该用户没有素材，则返回一个空List
			if (materials.size() != 0) {
				jsonarr = JSONArray.fromObject(materials);
				js.put("result", jsonarr);

			} else {
				js.put("result", "无");
			}
			return js; // 返回完整的Materials

		} catch (Exception e) {
			js.put("result", "false");
			return js;
		}

	}
	
	// 返回素材管理数据
	public JSONObject queryMaterialAndChild(long fid) {
		JSONObject js = new JSONObject();
		JSONArray materials = new JSONArray();
		try {
			Material material = new Material();
			// 得到指定UserId的所有Material
			material = materialDao.returnMaterialById(fid);
			JSONObject obj = JSONObject.fromObject(material);
			materials.add(obj);
			String[] str1 = material.getfInclude().split("-");
			String[] include = str1[0].split(",");
			for(int i=0; i<include.length;i++){
				if(!include[i].equals("")){
				long id = Long.parseLong(include[i]);
				Material child = materialDao.returnMaterialById(id);
				JSONObject chilidobj = JSONObject.fromObject(child);
				materials.add(chilidobj);
				}
			}
				js.put("result", materials);

			return js; // 返回完整的Materials

		} catch (Exception e) {
			js.put("result", "false");
			return js;
		}

	}
	

	
	// 返回素材管理数据
	public JSONObject queryMaterialById(long fid) {
		JSONObject js = new JSONObject();
		Material material = new Material();
		try {
			// 得到指定UserId的所有Material
			material = materialDao.returnMaterialById(fid);
			// 如果该用户没有素材，则返回一个空List
			
				JSONObject json = JSONObject.fromObject(material);
				js.put("result", json.toString());

			
			return js; // 返回完整的Materials

		} catch (Exception e) {
			js.put("result", "false");
			return js;
		}

	}
	
	// 录入素材管理数据
	public long saveMaterial(String fName, String fPlace, int fQuantity,
			String fSize, String fLevel, String fInclude, String fXianWen,
			String fAutoOrElec, String fProcess, String fRemark ,String fKouShu ,
			String fQueKou , String fJiao , String fDetail,String fCang)
			throws IOException {

		Material material = new Material();
		material.setfName(fName);
		material.setfPlace(fPlace);
		material.setfQuantity(fQuantity);
		material.setfFlowQuantity(fQuantity);
		material.setfSize(fSize);
		material.setfLevel(fLevel);
		material.setfInclude(fInclude);
		material.setfXianWen(fXianWen);
		material.setfAutoOrElec(fAutoOrElec);
		material.setfProcess(fProcess);
		material.setfRemark(fRemark);
		material.setfKouShu(fKouShu);
		material.setfQueKou(fQueKou);
		material.setfJiao(fJiao);
		material.setfDetail(fDetail);
		material.setfCang(fCang);
		
		if(isExist(material)){
			return -2;
		}
			
		System.out.println("wqwq");
		return materialDao.saveMaterial(material); // 录入传入的Material
		
	}
	
	// 删除素材管理数据（单个素材）
	public boolean deleteMaterial(long fid) {

		try {
			materialDao.deleteMaterial(fid);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return false;
		}
	}
	
	public boolean motifyMaterialQuantity(long fid , int quantity){
		try {
			materialDao.motifyMaterialQuantity(fid, quantity);
			return true;
		} catch (Exception e) {
			return false;
		}
		
		
	}
	
	public boolean motifyMaterialPlace(long fid,String place){
		
		try {
			materialDao.motifyMaterialPlace(fid, place);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public JSONObject getChildMaterial(String[] include){
		JSONObject result = new JSONObject();
		JSONArray materials = new JSONArray();
		try {
			for(int i=0; i<include.length;i++){
				if(!include[i].equals("")){
				long fid = Long.parseLong(include[i]);
				Material material = materialDao.returnMaterialById(fid);
				JSONObject obj = JSONObject.fromObject(material);
				materials.add(obj);
				}
			}
			
			result.put("result", materials);
		} catch (Exception e) {
			result.put("result", "false");
		}
		return result;
	}

}
