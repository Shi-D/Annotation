package com.annotation.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.framework.authority.entity.User;
import com.framework.system.common.base.service.impl.BaseServiceImpl;
import com.annotation.entity.ClassTeacher;

@Service
public class ClassTeacherService extends BaseServiceImpl<ClassTeacher> {

	public void addClass(String className, User user) throws Exception {
		Date date = new Date();
		ClassTeacher classTeacher = new ClassTeacher();
		classTeacher.setTeacherId(user.getId());
		classTeacher.setCreationTime(date);
		this.save(classTeacher);
		String hql = "insert into SEC_CLASS  (CLASS_ID,CLASS_NAME,ORGANIZATION_ID) values (" + classTeacher.getClassId() + ",'" + className + "'," + user.getOrganization().getId() + ")";
		this.executeSQLUpdate(hql);
	}
	
	
	public List<Map<String, Object>> queryStudentNotInClass(String teacherCode,Integer classId) {
		String hql = "select distinct studentName as studentName, studentId as studentId from StudentClassTeacher where studentId not in (select studentId as studentId from StudentClassTeacher where teacherCode = ? and classId =?)";
		return this.getResultByHQL(hql, teacherCode,classId);
	}
}
