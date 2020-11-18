package com.annotation.action.classmanagement;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.service.ClassTeacherService;
import com.annotation.service.ClassesService;
import com.framework.authority.entity.User;
import com.framework.common.SystemContext;
import com.framework.system.common.base.action.BaseGridAction;

public class ClassesInfoAction extends BaseGridAction {

	private static final long serialVersionUID = -5115239031440479110L;

	
	@Autowired
	ClassesService classesService;
	@Autowired
	ClassTeacherService classTeacherService;
	

	private String className;
	private String classIds;
	private String studentIds;
	private Integer classId;
	private Integer teacherId;
	private Integer studentId;
	private String studentName;
	private String teacherCode;
	private Integer studentNum;
	private Integer pageNo;
	private Integer pageSize;
	private Boolean search;

	// 添加班级(教师)
	public String addClass() throws Exception {
		User user = SystemContext.getCurrentUser();
		try {
			classTeacherService.addClass(className, user);
			ajaxResult.setSubOk(true);
		} catch (Exception e) {
			ajaxResult.setSubOk(false);
			e.printStackTrace();
		}
		return "result>json";
	}
	
	// 添加多学生到单个班级
	public String addStudentsToClass() throws Exception {

		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			classesService.addStudentsToClass(classId, studentIds.split(","));
			basicInfo.put("result", "插入成功");
		} catch (Exception e) { 
			basicInfo.put("result", "插入失败");
		}
		results.add(basicInfo);
		return "result>json";
	}
		
	// 根据班级名字查看班级（管理员）
	@SuppressWarnings("unchecked")
	public String queryAllInfoClassesByClassName() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		this.getPager().setPageNo(pageNo);
		this.getPager().setPageSize(pageSize);
		this.getPager().setSearch(search);

		String hql = "select classId as classId, className as className, studentNum as studentNum, teacherName as teacherName from ClassInfoView where organizationId = '" + user.getOrganization().getId()
				+ "' and className like '%" + className + "%'";
		classesService.find(this.getPager(), hql, this.getFilter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		basicInfo.put("totalPage", this.getPager().getTotalPage());
		results = (List<Map<String, Object>>) this.getPager().getDataset();
		results.add(basicInfo);
		return "result>json";
	}

	// 分页查询所有班级信息
	@SuppressWarnings("unchecked")
	public String searchAllInfoClasses() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		this.getPager().setPageNo(pageNo);
		this.getPager().setPageSize(pageSize);
		this.getPager().setSearch(search);

		String hql = "select classId as classId, className as className, studentNum as studentNum, teacherName as teacherName, createTime as createTime from ClassInfoView where organizationId = '" + user.getOrganization().getId() + "'";
		classesService.find(this.getPager(), hql, this.getFilter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		basicInfo.put("totalPage", this.getPager().getTotalPage());
		results = (List<Map<String, Object>>) this.getPager().getDataset();
		results.add(basicInfo);
		return "result>json";
	}
	
	// 分页查询所有班级信息(根据教师id)
	@SuppressWarnings("unchecked")
	public String searchAllInfoClassesByTeacher() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		this.getPager().setPageNo(pageNo);
		this.getPager().setPageSize(pageSize);
		this.getPager().setSearch(search);

		String hql = "select classId as classId, className as className, studentNum as studentNum, teacherName as teacherName, createTime as createTime from ClassInfoView where teacherId = " + user.getId();
		classesService.find(this.getPager(), hql, this.getFilter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		basicInfo.put("totalPage", this.getPager().getTotalPage());
		results = (List<Map<String, Object>>) this.getPager().getDataset();
		results.add(basicInfo);
		return "result>json";
	}
	
	// 教师根据班级名字查看班级
	@SuppressWarnings("unchecked")
	public String teacherQueryClassesByClassName() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		this.getPager().setPageNo(pageNo);
		this.getPager().setPageSize(pageSize);
		this.getPager().setSearch(search);
		String hql = "select classId as classId, className as className, studentNum as studentNum, teacherName as teacherName, createTime as createTime from ClassInfoView where teacherId = '" + user.getId()
				+ "' and className like '%" + className + "%'";
		classesService.find(this.getPager(), hql, this.getSorter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		basicInfo.put("totalPage", this.getPager().getTotalPage());
		results = (List<Map<String, Object>>) this.getPager().getDataset();
		results.add(basicInfo);
		return "result>json";
	}
		
	/*获取班级列表（非分页式）*/
	public String allClassesList() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		if (user.getUserType() == 1) {
			String hql = "select classId as classId, className as className, studentNum as studentNum, teacherName as teacherName, createTime as createTime from ClassInfoView where teacherId = ? and organizationId = ?";
			basicInfo.put("result",classesService.getResultByHQL(hql, user.getId(), user.getOrganization().getId()));
		}else if(user.getUserType() == 0){
			String hql = "select classId as classId, className as className, studentNum as studentNum, teacherName as teacherName, createTime as createTime from ClassInfoView where organizationId = ?";
			basicInfo.put("result",classesService.getResultByHQL(hql, user.getOrganization().getId()));
		}
		results.add(basicInfo);
		return "result>json";
	}
	
	/*获取有学生的班级列表*/
	public String allClassesWithoutNullStu() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		if(user.getUserType()==1){
			String hql = "select distinct classId as classId, className as className, studentNum as studentNum, teacherName as teacherName, createTime as createTime from ClassInfoView where teacherId = ? and organizationId = ? and studentNum > 0";
			basicInfo.put("result",classesService.getResultByHQL(hql, user.getId(), user.getOrganization().getId()));
		}else if(user.getUserType()==0){
			String hql = "select distinct classId as classId, className as className, studentNum as studentNum, teacherName as teacherName, createTime as createTime from ClassInfoView where organizationId = ? and studentNum > 0";
			basicInfo.put("result",classesService.getResultByHQL(hql, user.getOrganization().getId()));
		
		}
		results.add(basicInfo);
		return "result>json";
	}
	
	//根据教师id获取班级（非分页式）
	public String classesByTeacherList() {
		User user = SystemContext.getCurrentUser();
		results = new ArrayList<Map<String, Object>>();
		String hql = "select classId as classId, className as className from ClassInfoView where studentNum != null and teacherId = " + user.getId();
		results.addAll(classesService.getResultByHQL(hql));
		return "result>json";
	}
	
	
	//删除班级
	@SuppressWarnings("serial")
	public String deleteClassesByClassIds() {
		results = new ArrayList<Map<String,Object>>();
		User user = SystemContext.getCurrentUser();
		
			try {
				System.out.println(classIds);
				Integer nums = classesService.deleteClassesInfo(classIds);
				if(nums==0){
					ajaxResult.setSubOk(false);
				}
				else{
					ajaxResult.setSubOk(true);
				}
			} catch (Exception e) {
				ajaxResult.setSubOk(false);
				System.out.println(e);
			}
			results.add(new HashMap<String,Object>(){
				{	
						put("result",(Object) (ajaxResult.isSubOk() ? "true" : "false"));
				}
			});
		
		return "result>json";
	}
	
	//删除班级(check学生数)
	public String deleteClasses() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		List<Map<String, Object>> deleteFile = new ArrayList<Map<String, Object>>();
		String deleteInfo = "";
		results = new ArrayList<Map<String, Object>>();
		try {
			System.out.println(this.getClassIds());
			deleteFile = classesService.showClassesInfo(this.getClassIds());
			for (Map<String, Object> map : deleteFile) {
				if(studentNum == 0){
					classesService.deleteClassesInfo(""+map.get("classId"));
					deleteInfo += "["+map.get("className")+ "," + "删除完成]、";
				} else{
					deleteInfo += "["+map.get("className")+ "," + "删除失败]、";
				}
			}
			ajaxResult.setSubOk(true);
		} catch (Exception e) {
			ajaxResult.setSubOk(false);
		}
		basicInfo.put("result", deleteInfo);
		results.add(basicInfo);
		return "result>json";
	}
	
	public String queryStudentNotInClass() {
		User user = SystemContext.getCurrentUser();
		results = classesService.queryStudentNotInClass(user.getOrganization().getId(), this.getClassId());
		System.out.println(results);
		return "result>json";
	}
	
	public String queryStudentInClass() {
		User user = SystemContext.getCurrentUser();
		results = classesService.queryStudentInClass(user.getOrganization().getId(), this.getClassId());
		System.out.println(results);
		return "result>json";
	}
	
	public String queryStudentNotInClassByName() {
		return "result>json";
	}
	
	public String getStudentIds() {
		return studentIds;
	}

	public void setStudentIds(String studentIds) {
		this.studentIds = studentIds;
	}

	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Boolean getSearch() {
		return search;
	}

	public void setSearch(Boolean search) {
		this.search = search;
	}

	public String getClassIds() {
		return classIds;
	}

	public void setClassIds(String classIds) {
		this.classIds = classIds;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getTeacherCode() {
		return teacherCode;
	}

	public void setTeacherCode(String teacherCode) {
		this.teacherCode = teacherCode;
	}

	public Integer getStudentNum() {
		return studentNum;
	}

	public void setStudentNum(Integer studentNum) {
		this.studentNum = studentNum;
	}
	
	
}
