package com.annotation.entityview;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BOOK_CLASS_ANNOTATION_VIEW")
public class BookClassAnnotationView {
	@Id
	@Column(name = "ANNOTATION_ID")
	private Integer annotationId;
	
	@Column(name = "BOOK_ID")
	private Integer bookId;
	
	@Column(name = "USER_ID")
	private Integer userId;

	@Column(name = "USER_CODE")
	private String userCode;
	
	@Column(name = "STUDENT_NAME")
	private String studentName;
	
	@Column(name = "ORGANIZATION_ID")
	private Integer organizationId;
	
	@Column(name = "ANNOTATION_CONTENT")
	private String annotationContent;
	
	@Column(name = "ANNOTATION_IMAGE")
	private String annotationImage;
	
	@Column(name = "CLASS_NAME")
	private String className;
	
	@Column(name = "THUMBS_UP")
	private Integer thumbsUp;
	
	@Column(name = "ANNOTATION_STYLE")
	private String annotationStyle;
	
	@Column(name = "BOOK_CONTENT_OF_ANNOTATION")
	private String bookContentOfAnnotation;
	
	@Column(name = "START_PARAGRAPH_NUMBER")
	private Integer startParagraphNumber;
	
	@Column(name = "START_OFFSET")
	private Integer startOffset;
	
	@Column(name = "CLASS_ID")
	private Integer classId;
	
	@Column(name = "END_PARAGRAPH_NUMBER")
	private Integer endParagraphNumber;
	
	@Column(name = "END_OFFSET")
	private Integer endOffset;
	
	@Column(name = "STYLE_DISPLAY")
	private Boolean styleDisplay;
	
	@Column(name = "MARK_DISPLAY")
	private Boolean markDisplay;
	
	@Column(name = "COLOR")
	private String color;
	
	@Column(name = "PAGE")
	private String page;
	
	@Column(name = "CREATION_TIME")
	private String creationTime;

	public Integer getAnnotationId() {
		return annotationId;
	}

	public void setAnnotationId(Integer annotationId) {
		this.annotationId = annotationId;
	}

	public Integer getBookId() {
		return bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	public String getAnnotationContent() {
		return annotationContent;
	}

	public void setAnnotationContent(String annotationContent) {
		this.annotationContent = annotationContent;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public Integer getThumbsUp() {
		return thumbsUp;
	}

	public void setThumbsUp(Integer thumbsUp) {
		this.thumbsUp = thumbsUp;
	}

	public String getAnnotationStyle() {
		return annotationStyle;
	}

	public void setAnnotationStyle(String annotationStyle) {
		this.annotationStyle = annotationStyle;
	}

	public String getBookContentOfAnnotation() {
		return bookContentOfAnnotation;
	}

	public void setBookContentOfAnnotation(String bookContentOfAnnotation) {
		this.bookContentOfAnnotation = bookContentOfAnnotation;
	}

	public Integer getStartParagraphNumber() {
		return startParagraphNumber;
	}

	public void setStartParagraphNumber(Integer startParagraphNumber) {
		this.startParagraphNumber = startParagraphNumber;
	}

	public Integer getStartOffset() {
		return startOffset;
	}

	public void setStartOffset(Integer startOffset) {
		this.startOffset = startOffset;
	}

	public Integer getEndParagraphNumber() {
		return endParagraphNumber;
	}

	public void setEndParagraphNumber(Integer endParagraphNumber) {
		this.endParagraphNumber = endParagraphNumber;
	}

	public Integer getEndOffset() {
		return endOffset;
	}

	public void setEndOffset(Integer endOffset) {
		this.endOffset = endOffset;
	}

	public Boolean getStyleDisplay() {
		return styleDisplay;
	}

	public void setStyleDisplay(Boolean styleDisplay) {
		this.styleDisplay = styleDisplay;
	}

	public Boolean getMarkDisplay() {
		return markDisplay;
	}

	public void setMarkDisplay(Boolean markDisplay) {
		this.markDisplay = markDisplay;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(String creationTime) {
		this.creationTime = creationTime;
	}

	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getAnnotationImage() {
		return annotationImage;
	}

	public void setAnnotationImage(String annotationImage) {
		this.annotationImage = annotationImage;
	}
	
	
}