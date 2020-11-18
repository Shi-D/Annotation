package com.annotation.action.books;


import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.entity.Books;
import com.annotation.service.booksService;
import com.framework.authority.entity.User;
import com.framework.common.SystemContext;
import com.framework.system.common.base.action.BaseGridAction;

public class booksAction extends BaseGridAction {

	private static final long serialVersionUID = 8174619228590563492L;

	@Autowired
	booksService booksService;

	private Books books;
	private Integer pageNo;
	private Integer pageSize;
	private Boolean search;
	private Integer bookId;
	private String bookIds;
	private String bookName;
	private Integer studentId;
	private Integer classId;
	private String classIds;

	private String author;
	private String introduction;
	private File bookFile;
	private File avatarFile = null;
	private String avatarFileName;
	private String bookFileName;

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/* 校园书库：显示所有书库列表(非分页) */
	public String allBooksList() {
		User user = SystemContext.getCurrentUser();
		results = new ArrayList<Map<String, Object>>();
		String hql = "select books.bookId as bookId,books.bookName as bookName,books.bookAuthor as bookAuthor,books.teacherCode as teacherCode,books.teacherName as teacherName,books.createTime as createTime from Books books where organizationId = "+user.getOrganization().getId();
		results.addAll(booksService.getResultByHQL(hql));
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		String time;
		for (int i = 0; i < results.size(); i++) {
			time = dateFormat.format(results.get(i).get("createTime"))
					.toString();
			results.get(i).put("time", time);
		}
		return "result>json";
	}

	/* 书架管理 */
	public String bookshelfManagement() {
		User user = SystemContext.getCurrentUser();
		results = new ArrayList<Map<String, Object>>();
		String hql = "select classId as classId, bookId as bookId, teacherId as teacherId, bookName as bookName, bookAuthor as bookAuthor, bookIntroduction as bookIntroduction, bookCover as bookCover, bookPage as bookPage, className as className, uploadTeacherCode as uploadTeacherCode, uploadTeacherName as uploadTeacherName, createTime as createTime from ClassBookInfoV where teacherId = ?";
		results.addAll(booksService.getResultByHQL(hql, user.getId()));
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		String time;
		for (int i = 0; i < results.size(); i++) {
			time = dateFormat.format(results.get(i).get("createTime"))
					.toString();
			results.get(i).put("time", time);
		}
		return "result>json";
	}

	/* 获取有书籍的班级列表 */
	public String classesHaveBook() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		String hql = "select distinct classId as classId, className as className from ClassBookInfoV where teacherId = ? and bookName != NULL";
		basicInfo.put("result", booksService.getResultByHQL(hql, user.getId()));
		results.add(basicInfo);
		return "result>json";
	}

	/* 书库列表显示 */
	@SuppressWarnings("unchecked")
	public String booksList() {

		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		/* 页面信息先加进去 */
		this.getPager().setPageNo(this.getPageNo());
		this.getPager().setPageSize(this.getPageSize());
		this.getPager().setSearch(this.getSearch());

		/* 查询语句 */
		String hql = "select books.bookId as bookId,"
				+ " books.bookName as bookName,"
				+ " books.bookAuthor as bookAuthor,"
				+ "books.teacherCode as teacherCode,"
				+ "books.teacherName as teacherName,"
				+ "books.createTime as createTime" + " from Books books";

		booksService.find(this.getPager(), hql, this.getFilter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		basicInfo.put("totalPage", this.getPager().getTotalPage());
		results = (List<Map<String, Object>>) this.getPager().getDataset();

		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		String time;
		for (int i = 0; i < results.size(); i++) {
			time = dateFormat.format(results.get(i).get("createTime"))
					.toString();
			results.get(i).put("time", time);
		}
		/* 把results的东西add进去 */
		if (!results.isEmpty())
			results.add(basicInfo);
		return "result>json";
	}

	/* 根据获取的书籍ID，进行书籍内容传递 */
	public String booksContent() {
		results = booksService.bookContentService(this.getBookId());
		return "result>json";
	}

	// 增加书籍
	public String addBook() {
		results = booksService.addBookService(this.getAvatarFile(),
				this.getBookFile(), this.getAvatarFileName(),this.getBookFileName(),this.getBookName(), this.getAuthor(),
				this.getIntroduction(), 0);
		return "result>json";
	}

	// 删除书籍
	public String deleteBook() {
		results = booksService.deleteBookService(bookIds);
		return "result>json";
	}

	/********************************** 教师书籍操作 ****************************************/
	/* 推送书籍 */
	public String pushBooksToClass() throws Exception {

		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			booksService.pushBooksToClass(classId, bookIds.split(","));
			basicInfo.put("result", "推送成功");
		} catch (Exception e) {
			basicInfo.put("result", "推送失败");
		}
		results.add(basicInfo);
		return "result>json";
	}

	/* 将书籍移出班级 多班级ids */
	public String removeBooksFromClass() {
		try {
			String hql = "delete BookClass where bookId in(" + bookIds
					+ ") and classId in(" + classId + ")";
			System.out.println("将书籍移除班级：" + hql + " 书籍ids " + bookIds
					+ " 班级id " + classId);
			booksService.executeHQLUpdate(hql);
			ajaxResult.setSubOk(true);
		} catch (Exception e) {
			ajaxResult.setSubOk(false);
		}
		return "result>json";
	}

	/* 查看班级书籍 */
	@SuppressWarnings("unchecked")
	public String searchAllInfoClassesByTeacher() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		this.getPager().setPageNo(pageNo);
		this.getPager().setPageSize(pageSize);
		this.getPager().setSearch(search);

		String hql = "select bookId as bookId, bookName as bookName, bookAuthor as bookAuthor, bookIntroduction as bookIntroduction, bookCover as bookCover, bookPage as bookPage, className as className from TeacherClassBooks where teacherId = '"
				+ user.getId() + "'";
		booksService.find(this.getPager(), hql, this.getFilter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		basicInfo.put("totalPage", this.getPager().getTotalPage());
		results = (List<Map<String, Object>>) this.getPager().getDataset();
		results.add(basicInfo);
		return "result>json";
	}

	/* 显示不在该班级的书籍 */
	public String queryBookNotInClass() {
		User user = SystemContext.getCurrentUser();
		results = booksService.queryBookNotInClass(user.getOrganization()
				.getId(), this.getClassId());
		System.out.println(results);
		return "result>json";
	}

	/* 显示在该班级的书籍 */
	public String queryBookInClass() {
		User user = SystemContext.getCurrentUser();
		results = booksService.queryBookInClass(user.getOrganization().getId(),
				this.getClassId());
		System.out.println(results);
		return "result>json";
	}

	/* 根据班级Id显示在班级的书籍信息（和上面 重复了 除了上传者 */

	@SuppressWarnings("unchecked")
	public String queryClassBookInfo() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		this.getPager().setPageNo(this.getPageNo());
		this.getPager().setPageSize(this.getPageSize());
		this.getPager().setSearch(this.getSearch());
		String hql = "select classId as classId, bookId as bookId, teacherId as teacherId, bookName as bookName, className as className, bookAuthor as bookAuthor, bookIntroduction as bookIntroduction, bookCover as bookCover, bookPage as bookPage, className as className, uploadTeacherCode as uploadTeacherCode, uploadTeacherName as uploadTeacherName, createTime as createTime from ClassBookInfoV where teacherId = '"
				+ user.getId() + "'";
		booksService.find(this.getPager(), hql, this.getFilter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		basicInfo.put("totalPage", this.getPager().getTotalPage());
		results = (List<Map<String, Object>>) this.getPager().getDataset();
		results.add(basicInfo);
		return "result>json";
	}

	/* 显示未推送给某学生的书籍 */
	public String queryBookNotInStudent() {
		results = booksService.queryBookNotInStudent(this.getStudentId());
		return "result>json";
	}

	/* 推送书籍给学生 */
	public String pushBooksToStudent() throws Exception {

		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			booksService.pushBooksToStudent(studentId, bookIds.split(","));
			basicInfo.put("result", "推送成功");
		} catch (Exception e) {
			basicInfo.put("result", "推送失败");
		}
		results.add(basicInfo);
		return "result>json";
	}

	/* 显示已经推送给某学生的书籍 */
	public String queryBookInStudent() {
		results = booksService.queryBookInStudent(this.getStudentId());
		return "result>json";
	}

	/* 将书籍移出 多学生ids */
	public String removeBooksFromStudent() {
		try {
			String hql = "delete BookStudent where bookId in(" + bookIds
					+ ") and studentId in(" + studentId + ")";
			System.out.println("将书籍移除：" + hql + " 书籍ids " + bookIds + " 学生id "
					+ studentId);
			booksService.executeHQLUpdate(hql);
			ajaxResult.setSubOk(true);
		} catch (Exception e) {
			ajaxResult.setSubOk(false);
		}
		return "result>json";
	}

	/********************************** 教师书籍操作 ****************************************/

	public booksService getBooksService() {
		return booksService;
	}

	public void setBooksService(booksService booksService) {
		this.booksService = booksService;
	}

	public Books getBooks() {
		return books;
	}

	public void setBooks(Books books) {
		this.books = books;
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

	public Integer getBookId() {
		return bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}

	public String getBookIds() {
		return bookIds;
	}

	public void setBookIds(String bookIds) {
		this.bookIds = bookIds;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getClassIds() {
		return classIds;
	}

	public void setClassIds(String classIds) {
		this.classIds = classIds;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public File getBookFile() {
		return bookFile;
	}

	public void setBookFile(File bookFile) {
		this.bookFile = bookFile;
	}

	public File getAvatarFile() {
		return avatarFile;
	}

	public void setAvatarFile(File avatarFile) {
		this.avatarFile = avatarFile;
	}

	public String getAvatarFileName() {
		return avatarFileName;
	}

	public void setAvatarFileName(String avatarFileName) {
		this.avatarFileName = avatarFileName;
	}

	public String getBookFileName() {
		return bookFileName;
	}

	public void setBookFileName(String bookFileName) {
		this.bookFileName = bookFileName;
	}
	
	
}
