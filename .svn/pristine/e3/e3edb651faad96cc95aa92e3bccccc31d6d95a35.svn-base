package com.annotation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.framework.system.common.base.service.impl.BaseServiceImpl;
import com.annotation.entity.Classes;
import com.annotation.entity.ClassTeacher;

@Service
public class ClassesService extends BaseServiceImpl<Classes> {

	/**
	 * 根据classIds数组批量删除
	 * 
	 * @param ids
	 */

	public Integer deleteClassesInfo(String classIds) throws Exception {
		Integer num = 0;
		for(String id : classIds.split(",")){
			String hql = "delete from ClassStudent where classId in (" + id + ")";
			this.executeHQLUpdate(hql);
			hql = "delete from Classes where classId in(" + id + ")";
			this.executeHQLUpdate(hql);
			hql = "delete from ClassTeacher where classId in(" + id + ")";
			this.executeHQLUpdate(hql);
			num += 1;
		}
		return num;
	}
	
	public List<Map<String, Object>> showClassesInfo(String classIds) throws Exception {
		List<Map<String, Object>> showFile = new ArrayList<Map<String, Object>>();
		String hql = "select className as className, classId as classId from Classes c where classId in(" + classIds + ")";
		showFile = this.getResultByHQL(hql);
		return showFile;
	}

	public void addStudentsToClass(Integer classId, String[] studentId) throws Exception {
		int len = studentId.length;
		String hql = "";
		for (int i = 0; i < len; i++) {
			System.out.println(studentId[i]);         			
			hql = "insert into CLASS_STUDENT ( CLASS_ID,STUDENT_ID ) values (" + classId + "," + studentId[i] + ")";
			System.out.println(hql);
			this.executeSQLUpdate(hql);
		}
	}

	public List<Map<String, Object>> queryClassesByOrganizationId(Integer organizationId) {
		String hql = "select c.className as className from Classes c where c.organizationId = ?";
		return this.getResultByHQL(hql, organizationId);
	}
	
	public List<Map<String, Object>> queryStudentNotInClass(Integer organizationId, Integer classId) {
		String hql = "select distinct studentName as studentName, studentId as studentId, studentCreationtime as studentCreationtime, studentCode as studentCode from ClassStudentTeacherV where studentId not in (select studentId as studentId from ClassStudentTeacherV where classId =?) and studentId in (select studentId as studentId from ClassStudentTeacherV where organizationId = ?) Order By studentCreationtime DESC";
		return this.getResultByHQL(hql, classId, organizationId);
	}
	
	public List<Map<String, Object>> queryStudentInClass(Integer organizationId, Integer classId) {
		String hql = "select distinct studentName as studentName, studentId as studentId, studentCode as studentCode from ClassStudentTeacherV where studentId in (select studentId as studentId from ClassStudentTeacherV where organizationId = ? and classId =?)";
		return this.getResultByHQL(hql, organizationId, classId);
	}

	public String queryClassesByStudentId(Integer studentId) {
		String hql ="select classId as classId from ClassStudent WHERE studentId = "+studentId;
		List<Map<String,Object>> classStudent = this.getResultByHQL(hql);
		int len = classStudent.size();
		if(len == 0)
			return null;
		if(len == 1)
			return classStudent.get(0).get("classId").toString();
		String classIds = "";
		classIds += classStudent.get(0).get("classId");
		for(int i=1; i<len; i++){
			classIds += ",";
			classIds += classStudent.get(i).get("classId");
		}
		return classIds;
	}

	public List<Map<String, Object>> queryClassesByTeacherId(Integer teacherId) {
		String sql ="SELECT CLASS_NAME as className, CLASS_ID as classId FROM ClassInfoView WHERE TEACHER_ID = "+teacherId;
		return this.getResultBySQL(sql);
	}
}
