package com.annotation.service;


import org.springframework.stereotype.Service;

import com.annotation.entityview.AnnotationUserTypeView;
import com.framework.system.common.base.service.impl.BaseServiceImpl;

@Service
public class AnnotationUserTypeService extends BaseServiceImpl<AnnotationUserTypeView> {
	public Integer getAnnotationUserType(Integer annotationId)
	{
		AnnotationUserTypeView user = this.get(AnnotationUserTypeView.class, annotationId);
		return user.getUserType();
	}
	
	public Integer getAnnotationUserId(Integer annotationId)
	{
		AnnotationUserTypeView user = this.get(AnnotationUserTypeView.class, annotationId);
		return user.getUserId();
	}
}