package com.mesclouds.dao;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.mesclouds.model.Material;
import com.mesclouds.model.RecordBean;

@Repository
public class RecordDao {

	@Autowired
	JdbcTemplate jdbcTemplate;

	public boolean addRecordByAdd(String fPerson, String fTitle, int fType,
			int fOperationType, String fTime, long fTargetID, String fAfter) {
		String sql = "insert into t_record(fPerson,fTitle,fType,fOperationType,fTime,fTargetID,fAfter)values(?,?,?,?,?,?,?);";
		Object[] obj = new Object[] { fPerson,fTitle, fType, fOperationType, fTime,
				fTargetID, fAfter};

		int count = jdbcTemplate.update(sql, obj);
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}

	public boolean addRecordByMotify(String fPerson, String fTitle, int fType,
			int fOperationType, String fTime,long fTargetID,
			String fBefore,String fAfter) {
		String sql = "insert into t_record(fPerson,fTitle,fType,fOperationType,fTime,fTargetID,fBefore,fAfter)values(?,?,?,?,?,?,?,?);";
		Object[] obj = new Object[] {fPerson, fTitle, fType, fOperationType, fTime,fTargetID,fBefore,fAfter};
		System.out.println(fBefore);
		int count = jdbcTemplate.update(sql, obj);
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}

	public boolean addRecordByDelete(String fPerson, String fTitle, int fType,
			int fOperationType, String fTime, String fAfter) {
		String sql = "insert into t_record(fPerson,fTitle,fType,fOperationType,fTime,fAfter)values(?,?,?,?,?,?);";
		Object[] obj = new Object[] {fPerson, fTitle, fType, fOperationType, fTime,fAfter};

		int count = jdbcTemplate.update(sql, obj);
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	//返回模糊搜索后的素材
	public List<RecordBean> getRecordByTime(String fTime){
			
		String sql = "select * from t_record where fTime like ?";
		Object[] obj = new Object[]{"%"+fTime+"%"};
		
		List<RecordBean> records = new ArrayList<RecordBean>();        
        List list = jdbcTemplate.queryForList(sql,obj); 
        for(int i = 0 ;i<list.size();i++){
        	System.out.println(list.get(i).toString());
        }
        Iterator iterator = list.iterator();
        RecordBean record = null;
        
        while (iterator.hasNext()) {
            Map maprecord =  (Map) iterator.next();
        	System.out.println("1111");
            record = new RecordBean();
            record.setFid(Long.parseLong(maprecord.get("fid").toString()));
            record.setfPerson(maprecord.get("fPerson").toString());
            record.setfTitle(maprecord.get("fTitle").toString());
        	record.setfType(Integer.parseInt(maprecord.get("fType").toString()));
        	record.setfOperationType(Integer.parseInt(maprecord.get("fOperationType").toString()));
        	record.setfTime(maprecord.get("fTime").toString());
        	record.setfTargetID(Long.parseLong(maprecord.get("fTargetID").toString()));
        	record.setfBefore(maprecord.get("fBefore").toString());
        	record.setfAfter(maprecord.get("fAfter").toString());
        	System.out.println("2222");
        	records.add(record);
        }
        return records;
        
		
	}
	
}
