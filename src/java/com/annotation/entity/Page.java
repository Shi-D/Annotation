package com.annotation.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PAGE")
public class Page {
	
	@Id
	@Column(name = "PAGE_ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer pageId;
	
	@Column(name = "USER_ID")
	private Integer userId;
	
	@Column(name = "BOOK_ID")
	private Integer bookId;
	
	@Column(name = "READ_COUNT")
	private Integer readCount;
	
	@Column(name = "PAGE_NUMBER")
	private Integer pageNumber;
	
	@Column(name = "PAGE_MARK")
	private Boolean pageMark;
	
	@Column(name = "CREATION_TIME")
	private String creationTime;

	public Integer getPageId() {
		return pageId;
	}

	public void setPageId(Integer pageId) {
		this.pageId = pageId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getBookId() {
		return bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public Integer getReadCount() {
		return readCount;
	}

	public void setReadCount(Integer readCount) {
		this.readCount = readCount;
	}

	public Integer getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(Integer pageNumber) {
		this.pageNumber = pageNumber;
	}

	public Boolean getPageMark() {
		return pageMark;
	}

	public void setPageMark(Boolean pageMark) {
		this.pageMark = pageMark;
	}

	public String getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(String creationTime) {
		this.creationTime = creationTime;
	}
	
	
	
	
	
	
}
