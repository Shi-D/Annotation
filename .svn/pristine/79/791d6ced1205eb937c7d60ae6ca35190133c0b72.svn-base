package com.annotation.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "CLASS_TEACHER")
public class ClassTeacher {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "CLASS_ID")
	private Integer classId;
	
	@Column(name = "TEACHER_ID")
	private Integer teacherId;
	
	@Column(name = "CREATE_TIME")
	private Date createTime;

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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreationTime(Date createTime) {
		this.createTime = createTime;
	}
	
	
}
