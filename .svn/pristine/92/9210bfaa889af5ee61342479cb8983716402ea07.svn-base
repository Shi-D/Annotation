package com.annotation.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.framework.system.common.base.service.impl.BaseServiceImpl;
import com.annotation.entity.AnnotationLike;
import com.annotation.entity.CommentLike;

@Service
public class LikeService extends BaseServiceImpl<Object> {

	public void addAnnotationLike(Integer annotationId, Integer userId) {
		String hql = "insert into ANNOTATION_LIKE (ANNOTATION_ID, LIKE_USER) VALUES (?, ?)";
		this.executeSQLUpdate(hql, annotationId, userId);
	}

	public void deleteAnnotationLike(Integer annotationId, Integer userId) {
		String hql = "delete from ANNOTATION_LIKE where ANNOTATION_ID = ? and LIKE_USER = ?";
		this.executeSQLUpdate(hql, annotationId, userId);
	}

	public List<Map<String, Object>> annotationLikeNumber(Integer annotationId) {
		String hql = "select count(*) from ANNOTATION_LIKE where ANNOTATION_ID = ?";
		return this.getResultByHQL(hql, annotationId);
	}
	
	public void addCommentLike(Integer commentId, Integer userId) {
		String hql = "insert into COMMENT_LIKE (COMMENT_ID, LIKE_USER) VALUES (?, ?)";
		this.executeSQLUpdate(hql, commentId, userId);
	}

	public void deleteCommentLike(Integer commentId, Integer userId) {
		String hql = "delete from COMMENT_LIKE where COMMENT_ID = ? and LIKE_USER = ?";
		this.executeSQLUpdate(hql, commentId, userId);
	}

	public List<Map<String, Object>> commentLikeNumber(Integer commentId) {
		String hql = "select count(*) from COMMENT_LIKE where COMMENT_ID = ?";
		return this.getResultByHQL(hql, commentId);
	}
	
}