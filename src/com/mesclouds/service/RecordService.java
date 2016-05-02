package com.mesclouds.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.xml.crypto.Data;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mesclouds.dao.RecordDao;
import com.mesclouds.model.Material;
import com.mesclouds.model.RecordBean;
import com.mesclouds.utils.DateUtils;

@Service
public class RecordService {

	@Autowired
	RecordDao recordDao;
	@Autowired
	MaterialService materialService;
	
	public boolean addRecordByAdd(String fPerson,String fTitle,int fType,int fOperationType,long fTargetID ,String fAfter){
		JSONObject json = JSONObject.fromObject(JSONObject.fromObject(fAfter).getString("result"));
		Iterator iterator = json.keys();
		while(iterator.hasNext()){
			System.out.println("1");
			String map =   iterator.next().toString();
			System.out.println(map);
			if(!map.equals("fName")&&
					!map.equals("fSize")&&
					!map.equals("fKouShu")&&
					!map.equals("fCang")&&
					!map.equals("fLevel")&&
					!map.equals("fMaterialID")&&
					!map.equals("fQuantity")&&
					!map.equals("fBusiness")&&
					!map.equals("fOrderMan")){
				iterator.remove();
			}

		}
		Date date = new Date();
		String fTime = DateUtils.getDate(date, "yyyy-MM-dd HH:mm:ss");
		return recordDao.addRecordByAdd(fPerson,fTitle, fType, fOperationType, fTime, fTargetID,json.toString());
		
	}
	
	public boolean addRecordByModify(String fPerson,String fTitle,int fType,int fOperationType,String fBeforeJson,String fAfterJson){
		JSONObject jsonBefore = JSONObject.fromObject(JSONObject.fromObject(fBeforeJson).getString("result"));
		JSONObject jsonAfter = JSONObject.fromObject(JSONObject.fromObject(fAfterJson).getString("result"));
		
		long fid = Long.parseLong(jsonBefore.getString("fid"));
		
		Iterator iter1 = jsonBefore.keys();
		Iterator iter2 = jsonAfter.keys();
		while(iter1.hasNext()){
			String key = iter1.next().toString();
			iter2.next();
			if(key.equals("fid")){
				iter1.remove();
				iter2.remove();
			}else if(!key.equals("fName")&&
					!key.equals("fSize")&&
					!key.equals("fKouShu")&&
					!key.equals("fCang")&&
					!key.equals("fLevel")&&
					!key.equals("fMaterialID")&&
					!key.equals("fQuantity")&&
					!key.equals("fBusiness")&&
					!key.equals("fOrderMan")){
				if(jsonBefore.getString(key).equals(jsonAfter.getString(key))){
					iter1.remove();
					iter2.remove();
				}
			}
		}
		Date date = new Date();
		String fTime = DateUtils.getDate(date, "yyyy-MM-dd HH:mm:ss");
		return recordDao.addRecordByMotify(fPerson,fTitle, fType, fOperationType, fTime,fid, jsonBefore.toString(), jsonAfter.toString());
		
	}
	
	public boolean addRecordByDelete(String fPerson,String fTitle,int fType,int fOperationType,String fDeleteJSON){
		
		JSONObject json = JSONObject.fromObject(fDeleteJSON);
		Iterator iterator = json.keys();
		while(iterator.hasNext()){
			System.out.println("1");
			String map =   iterator.next().toString();
			System.out.println(map);
			if(!map.equals("fName")&&
					!map.equals("fSize")&&
					!map.equals("fKouShu")&&
					!map.equals("fCang")&&
					!map.equals("fLevel")&&
					!map.equals("fMaterialID")&&
					!map.equals("fQuantity")&&
					!map.equals("fBusiness")&&
					!map.equals("fOrderMan")&&
					!map.equals("fStatus")){
				iterator.remove();
			}

		}
		Date date = new Date();
		String fTime = DateUtils.getDate(date, "yyyy-MM-dd HH:mm:ss");
		return recordDao.addRecordByDelete(fPerson,fTitle, fType, fOperationType, fTime,json.toString());
		
	}
	
	public JSONObject getRecordByTime(String fTime){
		
		JSONObject js = new JSONObject();
		JSONArray jsonarr;
		List<RecordBean> records = new ArrayList<RecordBean>();
		try {
			// 得到指定UserId的所有Material
			records = recordDao.getRecordByTime(fTime);
			System.out.println("3333");
			// 如果该用户没有素材，则返回一个空List
			if (records.size() != 0) {
				jsonarr = JSONArray.fromObject(records);
				js.put("result", jsonarr);

			} else {
				js.put("result", "无");
			}
			System.out.println("5555");
			return js; // 返回完整的Materials

		} catch (Exception e) {
			js.put("result", "false");
			return js;
		}
		
	}
}
