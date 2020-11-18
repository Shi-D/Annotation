package com.annotation.action.studentManagement;

import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.entityview.StudentClassBookInfoView;
import com.annotation.service.StudentBookService;
import com.framework.authority.entity.User;
import com.framework.common.ResultPostModel;
import com.framework.common.SystemContext;
import com.framework.system.common.base.action.BaseGridAction;

public class StudentBookAction extends BaseGridAction {
	/**
	 * 此action用于在学生书架里显示书籍内容，传入的学生id通过userId确定
	 */

	@Autowired
	StudentBookService studentBookService;

	private User user;
	private StudentClassBookInfoView studentClassBook;
	private String className;
	private Integer bookId;
	private Integer pageNo;
	private Integer pageSize;
	private Boolean search;
	private String bookName;
	private String bookAuthor;
	private String bookCover;
	
	/* 学生班级书架显示 */
	public String studentClassBook(){
		User user = SystemContext.getCurrentUser();
		try{
			results = studentBookService.stuBookShelt(user.getId());
		}catch(Exception e){
			results = new ResultPostModel("result","error").getResult();
		}
		return "result>json";
	}

	/* 学生有的书所属班级列表 */
	public String studentBookInClass() {
		User user = SystemContext.getCurrentUser();
		String hql = "select distinct classId as classId, className as className from StudentClassBookInfoView where studentId = '" + user.getId() + "'";
		results = studentBookService.getResultByHQL(hql);
		return "result>json";
	}

	/* 学生最近阅读书架显示 */
	public String studentRecentBook(){
		User user = SystemContext.getCurrentUser();
		try {
			results = new ResultPostModel(studentBookService.studentRecentBookInfo(user.getId()),"message","success").getResult();
		} catch (Exception e) {
			results = new ResultPostModel("message","error").getResult();
		}
		return "result>json";
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Boolean getSearch() {
		return search;
	}

	public void setSearch(Boolean search) {
		this.search = search;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public StudentClassBookInfoView getStudentClassBook() {
		return studentClassBook;
	}

	public void setStudentClassBook(StudentClassBookInfoView studentClassBook) {
		this.studentClassBook = studentClassBook;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Integer getBookId() {
		return bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
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

	public String getBookCover() {
		return bookCover;
	}

	public void setBookCover(String bookCover) {
		this.bookCover = bookCover;
	}

}
