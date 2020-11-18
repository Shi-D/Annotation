package com.annotation.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "COMMENT_LIKE")
public class CommentLike {
	
	@Id
	@Column(name = "LIKE_ID")
	private Integer likeId;
	
	@Column(name = "COMMENT_ID")
	private Integer commentId;
	
	@Column(name = "LIKE_USER")
	private Integer likeUser;
	
	@Column(name = "CREATION_TIME")
	private Date creationTime;

	public Integer getLikeId() {
		return likeId;
	}

	public void setLikeId(Integer likeId) {
		this.likeId = likeId;
	}

	

	public Integer getCommentId() {
		return commentId;
	}

	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}

	public Integer getLikeUser() {
		return likeUser;
	}

	public void setLikeUser(Integer likeUser) {
		this.likeUser = likeUser;
	}

	public Date getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}
}