package com.annotation.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.annotation.entity.Page;
import com.framework.authority.entity.User;
import com.framework.common.ResultPostModel;
import com.framework.common.SystemContext;
import com.framework.system.common.base.service.impl.BaseServiceImpl;

@Service
public class PageService extends BaseServiceImpl<Object> {

	// 最后一次阅读的页数
	public List<Map<String, Object>> lastPageService(Integer bookId) {
		List<Map<String, Object>> temp;
		User user = SystemContext.getCurrentUser();
		String sql = "SELECT PAGE_NUMBER AS lastPage FROM PAGE WHERE CREATION_TIME IN (SELECT MAX(CREATION_TIME) FROM PAGE GROUP BY USER_ID,BOOK_ID) AND USER_ID = "
				+ user.getId() + " AND BOOK_ID = " + bookId;
		try {
			temp = this.getResultBySQL(sql);
			temp.get(0).put("message", "success");
		} catch (Exception e) {
			temp = new ResultPostModel("message", "error").getResult();
		}
		return temp;
	}

	// 学生看书 记录看到的页数
	public List<Map<String, Object>> addPageService(Integer readCount,
			Integer bookId, Integer currentPage) {
		Page page = new Page();
		List<Map<String, Object>> temp;
		User user = SystemContext.getCurrentUser();
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		String time = dateFormat.format(new Date()).toString();
		String hql = "update Page set readCount = '" + readCount
				+ "', creationTime = '" + time + "' where userId = "
				+ user.getId() + " and bookId = " + bookId
				+ " and pageNumber = " + currentPage;
		try {
			if (this.executeHQLUpdate(hql) == 0) {
				page.setUserId(user.getId());
				page.setBookId(bookId);
				page.setPageNumber(currentPage);
				page.setReadCount(readCount);
				page.setCreationTime(time);
				page.setPageMark(false);
				this.save(page);
			}
			temp = new ResultPostModel("status", true).getResult();
		} catch (Exception e) {
			temp = new ResultPostModel("status", false).getResult();
		}
		return temp;
	}
}
