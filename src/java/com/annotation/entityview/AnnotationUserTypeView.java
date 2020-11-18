package com.annotation.entityview;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ANNOTATION_USERTYPE_VIEW")
public class AnnotationUserTypeView {
	@Id
	@Column(name = "ANNOTATION_ID")
	private Integer annotationId;
	
	@Column(name = "USER_TYPE")
	private Integer userType;
	
	@Column(name = "USER_ID")
	private Integer userId;

	public Integer getAnnotationId() {
		return annotationId;
	}

	public void setAnnotationId(Integer annotationId) {
		this.annotationId = annotationId;
	}

	public Integer getUserType() {
		return userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
}