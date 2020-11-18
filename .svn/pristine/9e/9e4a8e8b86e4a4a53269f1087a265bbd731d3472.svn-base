package com.annotation.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.annotation.entityview.StudentClassBookInfoView;
import com.framework.system.common.base.service.impl.BaseServiceImpl;

@Service
public class StudentBookService extends
		BaseServiceImpl<StudentClassBookInfoView> {

	public List<Map<String, Object>> studentClassBook(Integer userId) {
		// 书架列表
		String hql = "select bookId as bookId," + "className as className,"
				+ "bookName as bookName," + "bookAuthor as bookAuthor,"
				+ "bookCover as bookCover,"
				+ "bookIntroduction as bookIntroduction,"
				+ "bookPage as bookPage"
				+ " from StudentClassBookInfoView where studentId = " + userId;
		return this.getResultByHQL(hql);
	}

	public List<Map<String, Object>> studentClassBookInfo() {
		/* 查询语句 */
		String hql = "select bookId as bookId," + "bookName as bookName,"
				+ "bookAuthor as bookAuthor," + "bookCover as bookCover,"
				+ "bookIntroduction as bookIntroduction,"
				+ "bookPage as bookPage" + " from StudentClassBookInfoView";

		return this.getResultByHQL(hql);
	}
	/* 查找最近三天的书籍 */
	public List<Map<String, Object>> studentRecentBookInfo(Integer userId) {
		String sql = "SELECT BOOK_ID AS bookId,BOOK_NAME AS bookName,BOOK_AUTHOR AS bookAuthor,BOOK_COVER AS bookCover,BOOK_INTRODUCTION AS bookIntroduction FROM STU_RECENT_READ_BOOK_VIEW WHERE USER_ID = "
				+ userId;
		return this.getResultBySQL(sql);
	}
	//學生首页书架上的书
	public List<Map<String,Object>> stuBookShelt(Integer userId){
			String hql = "select bookId as bookId, className as className, bookName as bookName, bookAuthor as bookAuthor, bookCover as bookCover,"
					+ "bookIntroduction as bookIntroduction, bookPage as bookPage from StudentClassBookInfoView where studentId = " + userId;
		return this.getResultByHQL(hql);		
	}

}
