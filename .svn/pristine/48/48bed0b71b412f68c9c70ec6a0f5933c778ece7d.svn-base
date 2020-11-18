package com.annotation.action.File;

import java.io.File;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;


public class DownAction extends ActionSupport{


    private static final long serialVersionUID = 1L;
    
    //第一步：显示所有要下载的文件的列表
    public String list() throws Exception {
        //1:得到upload目录路径
        String path=ServletActionContext.getServletContext().getRealPath("/upload");
        System.out.println("path");
        //2:目录对象
        File file=new File(path);
        //3:得到所有要下载的文件的文件名
        String[] fileNames=file.list();
        //4:保存
        ActionContext ac=ActionContext.getContext();
        //5:得到代表request的Map(第二种方式)
        Map<String,Object> request=(Map<String,Object>)ac.get("request");
        
        System.out.println("下载列表完毕");
        request.put("fileNames", fileNames);
        return "list";
    }
    
    //*************2：文件下载************************/
    //2.1：获取要下载的文件的文件名,设置字符集，前台页面提交的是以get方式提交的
    private String fileName;
    public void setFileName(String fileName) {
        //处理传入的参数种问题（get提交）
        try {
            fileName=new String(fileName.getBytes("ISO8859-1"),"UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException();
        }
        //把处理好的文件名，赋值
        this.fileName = fileName;
    }
    
    //2.2：下载提交的业务方法（在struts.xml中配置返回stream）
    public String down() throws Exception {
        return "download";
    }
    
    //2.3：返回流的方法
    public InputStream getAttrInputStream(){
        return ServletActionContext.getServletContext().getResourceAsStream("/upload/"+fileName);
    }
    
    //2.4:下载显示的中文名，（浏览器显示的文件名）
    public String getDownFileName(){
        try{
            //import java.net.URLEncoder;
            fileName = URLEncoder.encode(fileName,"UTF-8");
        }catch(Exception e){
            throw new RuntimeException();
        }
        
        return fileName;
    }
}