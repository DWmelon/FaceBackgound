package com.mesclouds.utils;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

public class AttachmentUtil {
	
	public static String upload(MultipartFile attachment,String uploadDir, HttpServletRequest request) {
		if(attachment.isEmpty())
			return null;
		
		String realPath = request.getSession().getServletContext().getRealPath(File.separator);
		realPath += File.separator;
		realPath += uploadDir;
		File realPathDir = new File(realPath); 
		if(!realPathDir.exists()){
			realPathDir.mkdirs();
		}
		
		String suffix = "";
		if(attachment.getOriginalFilename().indexOf(".")>=0){
			suffix = attachment.getOriginalFilename().substring(attachment.getOriginalFilename().lastIndexOf(".")+1);
		}
		String newName = UUID.randomUUID().toString()+"."+suffix;
		try {
			attachment.transferTo(new File(realPath, newName));
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return uploadDir+File.separator+newName;
	}
	public static String upload(MultipartFile attachment, HttpServletRequest request,long companyId) {
		String uploadDir = getUploadDir(request,companyId);
		String relativeUploadDir = uploadDir.substring(uploadDir.lastIndexOf(File.separator+"statics"));
		if(!attachment.isEmpty()){
			String suffix = "";
			if(attachment.getOriginalFilename().indexOf(".")>=0){
				suffix = attachment.getOriginalFilename().substring(attachment.getOriginalFilename().lastIndexOf(".")+1);
			}
			String newName = UUID.randomUUID().toString()+"."+suffix;
			try {
				attachment.transferTo(new File(uploadDir, newName));
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return relativeUploadDir+File.separator+newName;
		}
		return null;
	}
	
    public static void download(String oldFileName, String path, HttpServletResponse response, HttpServletRequest request) {
		OutputStream os = null;  
        response.reset();
        try {
			response.setHeader("Content-Disposition", "attachment; filename=" + new String(oldFileName.getBytes(),"ISO8859-1"));
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
        response.setContentType("application/octet-stream; charset=utf-8");  
        String filePath = request.getSession().getServletContext().getRealPath(File.separator)+path.substring(1);
        try {  
            os = response.getOutputStream();  
            os.write(FileUtils.readFileToByteArray(new File(filePath)));  
            os.flush();  
        } catch (IOException e) {  
            e.printStackTrace();
        } finally {  
            if (os != null) {  
                try {  
                    os.close();  
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
        }  
    }
	
	public static String getUploadDir(HttpServletRequest request,long companyId) {
		String realPath = request.getSession().getServletContext().getRealPath(File.separator);
		realPath += "statics"+File.separator+companyId+File.separator+"logo";
		File realPathDir = new File(realPath); 
		if(!realPathDir.exists()){
			realPathDir.mkdirs();
		}
		return realPath;
	}
	
}
