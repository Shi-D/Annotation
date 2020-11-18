package com.annotation.action.page;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.entity.Page;
import com.annotation.service.PageService;
import com.framework.authority.entity.User;
import com.framework.common.SystemContext;
import com.framework.system.common.base.action.BaseGridAction;

public class pageAction extends BaseGridAction {
	private static final long serialVersionUID = 1L;

	private Page page = new Page();
	private User user;

	@Autowired
	private PageService pageService;

	private Integer bookId;// 前端传来的书号
	private Integer readCount;// 传来的一页字数
	private Integer currentPage;// 传来的当前页
	private Integer markPage;// 书签页

	private String time;

	// 增加学生阅读页
	public String addPage() throws Exception {
		results = pageService.addPageService(readCount, bookId, currentPage);
		return "result>json";
	}

	// 增加或取消书签
	public String addMark() throws Exception {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();

		// 如果已经是书签则去掉，反之则加入
		String hql_search = "select pageMark as mark from Page where userId = "
				+ user.getId() + " and bookId = " + bookId
				+ " and pageNumber = " + markPage;

		try {
			if (pageService.getResultByHQL(hql_search).size() != 0
					&& pageService.getResultByHQL(hql_search).get(0)
							.get("mark").equals(true)) {

				String hql = "update Page set pageMark = '0' where userId = "
						+ user.getId() + " and bookId = " + bookId
						+ " and pageNumber = " + markPage;
				pageService.executeHQLUpdate(hql);
				basicInfo.put("status", "success");

			} else if (pageService.getResultByHQL(hql_search).size() != 0
					&& pageService.getResultByHQL(hql_search).get(0)
							.get("mark").equals(false)) {

				String hql = "update Page set pageMark = '1' where userId = "
						+ user.getId() + " and bookId = " + bookId
						+ " and pageNumber = " + markPage;
				pageService.executeHQLUpdate(hql);
				basicInfo.put("status", "success");

			} else {
				basicInfo.put("message", "error");
			}
		} catch (Exception e) {

			basicInfo.put("message", "error");
		}

		results.add(basicInfo);
		return "result>json";
	}

	// 最后一次阅读的页
	public String lastPage() throws Exception {
		results = pageService.lastPageService(this.getBookId());
		return "result>json";
	}

	// 书签页
	public String markPage() throws Exception {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();

		String sql_search = "select PAGE_NUMBER as pageNumber from PAGE where USER_ID ="
				+ user.getId()
				+ " and BOOK_ID ="
				+ bookId
				+ " and PAGE_MARK = 1";

		try {
			results = pageService.getResultBySQL(sql_search);
			basicInfo.put("message", "success");
		} catch (Exception e) {

			basicInfo.put("message", "error");
		}

		results.add(basicInfo);
		return "result>json";
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public PageService getPageService() {
		return pageService;
	}

	public void setPageService(PageService pageService) {
		this.pageService = pageService;
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

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Integer getMarkPage() {
		return markPage;
	}

	public void setMarkPage(Integer markPage) {
		this.markPage = markPage;
	}
}
