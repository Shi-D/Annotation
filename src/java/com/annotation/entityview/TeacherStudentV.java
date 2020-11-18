package com.annotation.entityview;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TeacherStudentView")
public class TeacherStudentV {
	
	@Id
	@Column(name = "CLASS_ID")
	private Integer classId;
	
	@Column(name = "STUDENT_ID")
	private Integer studentId;
	
	@Column(name = "CLASS_NAME")
	private String className;
	
	@Column(name = "STUDENT_NAME")
	private String studentName;
	
	@Column(name = "TEACHER_ID")
	private Integer teacherId;
	
	@Column(name = "STUDENT_CODE")
	private String studentCode;
	
	@Column(name = "ORGANIZATION_ID")
	private Integer organizationId;
	
	@Column(name = "STUDENT_GENDER")
	private String studentGender;

	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
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

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public String getStudentCode() {
		return studentCode;
	}

	public void setStudentCode(String studentCode) {
		this.studentCode = studentCode;
	}

	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	public String getStudentGender() {
		return studentGender;
	}

	public void setStudentGender(String studentGender) {
		this.studentGender = studentGender;
	}

	
	
	
}