package com.annotation.entityview;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ClassBookInfoView")
public class ClassBookInfoV {
	
	@Id
	@Column(name = "CLASS_ID")
	private Integer classId;
	
	@Column(name = "BOOK_ID")
	private Integer bookId;
	
	@Column(name = "TEACHER_ID")
	private Integer teacherId;
	
	@Column(name = "CLASS_NAME")
	private String className;
	
	@Column(name = "BOOK_NAME")
	private String bookName;
	
	@Column(name = "BOOK_AUTHOR")
	private String bookAuthor;
	
	@Column(name = "BOOK_INTRODUCTION")
	private String bookIntroduction;
	
	@Column(name = "BOOK_COVER")
	private String bookCover;
	
	@Column(name = "BOOK_PAGE")
	private Integer bookPage;
	
	@Column(name = "UPLOAD_TEACHER_CODE")
	private String uploadTeacherCode;
	
	@Column(name = "UPLOAD_TEACHER_NAME")
	private String uploadTeacherName;
	
	@Column(name = "CREATE_TIME")
	private Date createTime;

	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}

	public Integer getBookId() {
		return bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getBookAuthor() {
		return bookAuthor;
	}

	public void setBookAuthor(String bookAuthor) {
		this.bookAuthor = bookAuthor;
	}

	public String getBookIntroduction() {
		return bookIntroduction;
	}

	public void setBookIntroduction(String bookIntroduction) {
		this.bookIntroduction = bookIntroduction;
	}

	public String getBookCover() {
		return bookCover;
	}

	public void setBookCover(String bookCover) {
		this.bookCover = bookCover;
	}

	public Integer getBookPage() {
		return bookPage;
	}

	public void setBookPage(Integer bookPage) {
		this.bookPage = bookPage;
	}

	public String getUploadTeacherCode() {
		return uploadTeacherCode;
	}

	public void setUploadTeacherCode(String uploadTeacherCode) {
		this.uploadTeacherCode = uploadTeacherCode;
	}

	public String getUploadTeacherName() {
		return uploadTeacherName;
	}

	public void setUploadTeacherName(String uploadTeacherName) {
		this.uploadTeacherName = uploadTeacherName;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	
}