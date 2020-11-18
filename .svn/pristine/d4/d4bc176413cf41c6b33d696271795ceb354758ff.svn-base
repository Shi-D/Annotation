package com.annotation.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "COMMENT")
public class Comment {
	@Id
	@Column(name = "COMMENT_ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer commentId;
	
	@Column(name = "ANNOTATION_ID")
	private Integer annotationId;
	
	@Column(name = "REPLY_ID")
	private Integer replyId;
	
	@Column(name = "REPLY_TYPE")
	private Integer replyType;
	
	@Column(name = "COMMENT_CONTENT")
	private String commentContent;
	
	@Column(name = "FROM_USER")
	private Integer fromUser;
	
	@Column(name = "TO_USER")
	private Integer toUser;
	
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

	public Integer getFromUser() {
		return fromUser;
	}

	public void setFromUser(Integer fromUser) {
		this.fromUser = fromUser;
	}

	public Integer getToUser() {
		return toUser;
	}

	public void setToUser(Integer toUser) {
		this.toUser = toUser;
	}

	public Date getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}
	
}