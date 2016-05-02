package com.mesclouds.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.JsonArray;
import com.google.gson.JsonStreamParser;
import com.mesclouds.model.Material;
import com.mesclouds.model.MaterialBody;
import com.mesclouds.service.MaterialService;
import com.mesclouds.service.RecordService;
import com.mesclouds.utils.RequestUtils;
/**
 * 素材处理的控制器
 * @author  
 *
 */
@Controller
public class MaterialController {
	
	 
	@Autowired
	MaterialService materialService;
	@Autowired
	RecordService recordService;
	

		
//	//修改素材管理数据
//		@RequestMapping(value="/UpdateMaterial")
//		public void UpdateMaterial(HttpServletRequest request,HttpServletResponse response){
//			JSONObject jsonobj = JSONObject.fromObject(request.getParameter("data"));
//			JSONObject material=jsonobj.getJSONObject("material");
//			System.out.println("1."+material.toString());
//			JSONObject js =  materialService.updateMaterial(material);
//			response.setContentType("text/html;charset=utf-8");
//			try {
//				PrintWriter writer = response.getWriter();
//				writer.write(js.toString());
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
		
	
	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////
		

		

		
	//返回指定素材管理数据（根据搜索）
	@RequestMapping(value="/ReadMaterialByName")		
	public void ReadMaterialByName(HttpServletRequest request,HttpServletResponse response){
		
		String fPerson = request.getParameter("fPerson");
		
		String fName = request.getParameter("fName");
		String fSize = request.getParameter("fSize");
		String fKouShu = request.getParameter("fKouShu");
		String fLevel = request.getParameter("fLevel");
		String fCang = request.getParameter("fCang");

		JSONObject json = materialService.queryMaterialByName(fName,fSize,fKouShu,fLevel,fCang);
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(json.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
	}
	
	//保存的素材管理数据（单个素材）
	@RequestMapping(value = "/InsertMaterial")
	public void updataMaterial(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		
		String fPerson = request.getParameter("fPerson");
		
		String jsonstr = request.getParameter("fName");
		System.out.println(jsonstr);
		//System.out.println(new String(jsonstr.getBytes("ISO-8859-1"), "UTF-8"));
		
		String fName = jsonstr;
		String fPlace = request.getParameter("fPlace");
		int fQuantity = Integer.parseInt(request.getParameter("fQuantity"));
		String fSize = request.getParameter("fSize");
		String fLevel = request.getParameter("fLevel");
		String fInclude = request.getParameter("fInclude");
		String fXianWen = request.getParameter("fXianWen");
		String fAutoOrElec = request.getParameter("fAutoOrElec");
		String fProcess = request.getParameter("fProcess");
		String fRemark = request.getParameter("fRemark");
		
		String fKouShu = request.getParameter("fKouShu");
		String fQueKou = request.getParameter("fQueKou");
		String fJiao = request.getParameter("fJiao");
		String fDetail = request.getParameter("fDetail");
		
		String fCang = request.getParameter("fCang");
		// String jsonstr = new String(value.getBytes("ISO-8859-1"),"UTF-8");

		long fid = materialService.saveMaterial(fName,fPlace,fQuantity,fSize,fLevel,fInclude,fXianWen,fAutoOrElec,fProcess,fRemark,fKouShu,fQueKou,fJiao,fDetail,fCang);
		response.setContentType("text/html;charset=utf-8");
		JSONObject obj = new JSONObject();
		
		if(fid>0){
			
			recordService.addRecordByAdd(fPerson,"新添产品", 1, 1, fid ,materialService.queryMaterialById(fid).toString());
		}
			obj.put("result", fid);
		try {
			
			PrintWriter writer = response.getWriter();
			writer.write(obj.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	

	
	
	//删除素材管理数据（根据ID）
	@RequestMapping(value="/DeleteMaterial")	
	public void DeleteMaterial(HttpServletRequest request,HttpServletResponse response){
		
		String fPerson = request.getParameter("fPerson");
		
		long fid=Long.parseLong(request.getParameter("fid"));
		
		JSONObject material = materialService.queryMaterialById(fid);
		
		boolean flag = materialService.deleteMaterial(fid);
		
		JSONObject obj = new JSONObject();
		if(flag){
			obj.put("result", "true");
			recordService.addRecordByDelete(fPerson,"删除产品", 1, 3, material.toString());
		}else{
			obj.put("result", "false");
		}
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(obj.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
		 
	}
	
	@RequestMapping(value="/ReadMaterialById")		//读取一个素材
	public void ReadMaterialById(HttpServletRequest request,HttpServletResponse response){
		
		String fPerson = request.getParameter("fPerson");
		
		long fid=Long.parseLong(request.getParameter("fid"));
		
		JSONObject obj = materialService.queryMaterialById(fid);
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(obj.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
	}
	
	@RequestMapping(value="/ReadMaterialAndChild")		//读取一个素材
	public void ReadMaterialAndChild(HttpServletRequest request,HttpServletResponse response){
		
		String fPerson = request.getParameter("fPerson");
		
		long fid=Long.parseLong(request.getParameter("fid"));
		
		JSONObject obj = materialService.queryMaterialAndChild(fid);
		response.setContentType("text/html;charset=utf-8");
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write(obj.toString());
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
	}
	
	@RequestMapping(value="/Test")		//读取一个素材
	public void Test(HttpServletRequest request,HttpServletResponse response){
		response.setContentType("text/html;charset=utf-8");
		
		 try {
		 PrintWriter writer = response.getWriter();
		 writer.write("测试");
		 } catch (IOException e) {
		 // TODO Auto-generated catch block
		 e.printStackTrace();
		 }
	}
	
	
	//修改库存
	@RequestMapping(value="/MotifyMaterialQuantity")
	public void MotifyMaterialQuantity(HttpServletRequest request,HttpServletResponse response){
		
		String fPerson = request.getParameter("fPerson");
		
		long fid =Long.parseLong(request.getParameter("fid"));
		int quantity =Integer.parseInt(request.getParameter("quantity"));
		
		JSONObject beforeMaterial = materialService.queryMaterialById(fid);
		boolean flag = materialService.motifyMaterialQuantity(fid, quantity);
		JSONObject afterMaterial = materialService.queryMaterialById(fid);
		
		JSONObject obj = new JSONObject();
		if(flag){
			obj.put("result", "true");
			recordService.addRecordByModify(fPerson,"修改产品", 1, 2, beforeMaterial.toString(), afterMaterial.toString());

		}else{
			obj.put("result", "false");
		}
		
		try {
			PrintWriter writer = response.getWriter();
			writer.write(obj.toString());
		} catch (Exception e) {
			 e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/MotifyMaterialPlace")
	public void MotifyMaterialPlace(HttpServletRequest request,HttpServletResponse response){
		
		String fPerson = request.getParameter("fPerson");
		
		long fid = Long.parseLong(request.getParameter("fid"));
		String place = request.getParameter("place");
		
		JSONObject beforeMaterial = materialService.queryMaterialById(fid);
		boolean flag = materialService.motifyMaterialPlace(fid, place);
		JSONObject afterMaterial = materialService.queryMaterialById(fid);
		
		JSONObject obj = new JSONObject();
		if(flag){
			obj.put("result", "true");
			recordService.addRecordByModify(fPerson,"修改产品", 1, 2, beforeMaterial.toString(), afterMaterial.toString());

		}else{
			obj.put("result", "false");
		}
		
		try {
			PrintWriter writer = response.getWriter();
			writer.write(obj.toString());
		} catch (Exception e) {
			 e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/GetChildMaterial")
	public void GetChildMaterial(HttpServletRequest request,HttpServletResponse response){
		
		String fPerson = request.getParameter("fPerson");
		
		String str = request.getParameter("include");
		String[] ids = str.split("-");
		String[] include = ids[0].split(",");
		
		JSONObject obj = materialService.getChildMaterial(include);
		
		try {
			PrintWriter writer = response.getWriter();
			writer.write(obj.toString());
		} catch (Exception e) {
			 e.printStackTrace();
		}
		
	}
	
}
