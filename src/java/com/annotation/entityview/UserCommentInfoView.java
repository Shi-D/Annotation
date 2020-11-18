package com.annotation.entityview;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USER_COMMENT_INFO_VIEW")
public class UserCommentInfoView {
	@Id
	@Column(name = "COMMENT_ID")
	private Integer commentId;
	
	@Column(name = "ANNOTATION_ID")
	private Integer annotationId;
	
	@Column(name = "REPLY_ID")
	private Integer replyId;
	
	@Column(name = "REPLY_TYPE")
	private Integer replyType;
	
	@Column(name = "COMMENT_CONTENT")
	private String commentContent;
	
	@Column(name = "FROM_USER_ID")
	private Integer fromUserId;
	
	@Column(name = "FROM_USER_NAME")
	private String fromUserName;
	
	@Column(name = "FROM_USER_CODE")
	private String fromUserCode;
	
	@Column(name = "TO_USER_ID")
	private Integer toUserId;
	
	@Column(name = "TO_USER_NAME")
	private String toUserName;
	
	@Column(name = "TO_USER_CODE")
	private String toUserCode;
	
	@Column(name = "LIKE_NUM")
	private Integer likeNum;
	
	@Column(name = "CREATION_TIME")
	private Date creationTime;
	
	@Column(name = "PIC_URL")
	private String picUrl;

	public String getPicUrl() {
		return picUrl;
	}

	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}

	public Integer getCommentId() {
		return commentId;
	}

	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}

	public Integer getAnnotationId() {
		return annotationId;
	}

	public void setAnnotationId(Integer annotationId) {
		this.annotationId = annotationId;
	}

	public Integer getReplyId() {
		return replyId;
	}

	public void setReplyId(Integer replyId) {
		this.replyId = replyId;
	}

	public Integer getReplyType() {
		return replyType;
	}

	public void setReplyType(Integer replyType) {
		this.replyType = replyType;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public Integer getFromUserId() {
		return fromUserId;
	}

	public void setFromUserId(Integer fromUserId) {
		this.fromUserId = fromUserId;
	}

	public String getFromUserName() {
		return fromUserName;
	}

	public void setFromUserName(String fromUserName) {
		this.fromUserName = fromUserName;
	}

	public String getFromUserCode() {
		return fromUserCode;
	}

	public void setFromUserCode(String fromUserCode) {
		this.fromUserCode = fromUserCode;
	}

	public Integer getToUserId() {
		return toUserId;
	}

	public void setToUserId(Integer toUserId) {
		this.toUserId = toUserId;
	}

	public String getToUserName() {
		return toUserName;
	}

	public void setToUserName(String toUserName) {
		this.toUserName = toUserName;
	}

	public String getToUserCode() {
		return toUserCode;
	}

	public void setToUserCode(String toUserCode) {
		this.toUserCode = toUserCode;
	}

	public Integer getLikeNum() {
		return likeNum;
	}

	public void setLikeNum(Integer likeNum) {
		this.likeNum = likeNum;
	}

	public Date getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}
	
	
}