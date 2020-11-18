package com.annotation.action.books;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.service.LikeService;
import com.framework.authority.entity.User;
import com.framework.common.SystemContext;
import com.framework.system.common.base.action.BaseGridAction;

public class likeAction extends BaseGridAction {

	@Autowired
	private LikeService likeService;

	private Integer annotationId;
	private Integer commentId;
	private Integer userId;

	// 批注点赞
	public String addAnnotationLike() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		User user = SystemContext.getCurrentUser();
		results = new ArrayList<Map<String, Object>>();
		try {
			likeService.addAnnotationLike(this.getAnnotationId(), user.getId());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 批注取消赞
	public String deleteAnnotationLike() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		User user = SystemContext.getCurrentUser();
		results = new ArrayList<Map<String, Object>>();
		try {
			likeService.deleteAnnotationLike(this.getAnnotationId(), user.getId());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 批注显示赞的个数
	public String annotationLikeNumber() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		try {
			results = likeService.annotationLikeNumber(this.getAnnotationId());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 评论点赞
	public String addCommentLike() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		User user = SystemContext.getCurrentUser();
		results = new ArrayList<Map<String, Object>>();
		try {
			likeService.addCommentLike(this.getCommentId(), user.getId());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 评论取消赞
	public String deleteCommentLike() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		User user = SystemContext.getCurrentUser();
		results = new ArrayList<Map<String, Object>>();
		try {
			likeService.deleteCommentLike(this.getCommentId(), user.getId());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 评论显示赞的个数
	public String commentLikeNumber() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		try {
			results = likeService.commentLikeNumber(this.getCommentId());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	public Integer getAnnotationId() {
		return annotationId;
	}

	public void setAnnotationId(Integer annotationId) {
		this.annotationId = annotationId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCommentId() {
		return commentId;
	}

	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}

}