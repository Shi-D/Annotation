package com.annotation.entityview;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ClassStudentNumberView")
public class ClassStudentNumber {
	
	@Id
	@Column(name = "CLASS_ID")
	private Integer classId;
	
	@Column(name = "CLASS_NAME")
	private String className;
	
	@Column(name = "STUDENT_NUM")
	private Integer studentNum;

	@Column(name = "ORGANIZATION_ID")
	private Integer organizationId;
	
	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Integer getStudentNum() {
		return studentNum;
	}

	public void setStudentNum(Integer studentNum) {
		this.studentNum = studentNum;
	}

	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}
	
	
}