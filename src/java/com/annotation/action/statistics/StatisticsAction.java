package com.annotation.action.statistics;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.service.StatisticsService;
import com.framework.authority.entity.User;
import com.framework.common.SystemContext;
import com.framework.system.common.base.action.BaseGridAction;

public class StatisticsAction extends BaseGridAction {
	private static final long serialVersionUID = 1L;
	@Autowired
	private StatisticsService statisticsService;

	/* 总的阅读人数 */
	@SuppressWarnings("unchecked")
	public String readerTotal() {
		String sql = "select count(distinct USER_ID) as readerTotal from ANNOTATION";
		results = statisticsService.getResultBySQL(sql);
		return "result>json";
	}

	/* 人均阅读本数 */
	@SuppressWarnings("unchecked")
	public String aveReaderTotal() {
		String sql = "select count(*) as bookNum from (select distinct BOOK_ID, USER_ID from ANNOTATION)A";// 所有人的阅读本数
		results = statisticsService.getResultBySQL(sql);
		int x = ((Integer) results.get(0).get("bookNum")).intValue();
		double ave = statisticsService.getAveRead(x);
		results.get(0).put("aveReadBook", ave);
		return "result>json";
	}

	/* 评论最多的学生 */
	@SuppressWarnings("unchecked")
	public String mostCommentStudent() {
		String sql = "select top 1 USER_ID as userId, USER_CODE as userCode, USER_NAME as userName," + "COMMENT_NUM as commentNum from StudentCommentNumView";
		results = statisticsService.getResultBySQL(sql);
		return "result>json";
	}

	/* 批注赞最多的学生 */
	@SuppressWarnings("unchecked")
	public String mostAnnotationLikeStudent() {
		String sql = "select top 1 USER_ID as userId, USER_NAME as userName," + "LIKE_NUM as likeNum from STUDENT_ANNOTATION_LIKE_NUM_VIEW";
		results = statisticsService.getResultBySQL(sql);
		return "result>json";
	}

	/* 批注总数 */
	@SuppressWarnings("unchecked")
	public String annotationTotal() {
		User user = SystemContext.getCurrentUser();
		String sql = "select count(ANNOTATION_ID) as annotationTotal from ANNOTATION";
		results = statisticsService.getResultBySQL(sql);
		return "result>json";
	}

	/* 批注总字数 */
	@SuppressWarnings("unchecked")
	public String annotationWordsNum() {
		User user = SystemContext.getCurrentUser();
		String sql = "select sum(DATALENGTH(ANNOTATION_CONTENT)) as AnnotationWordsNum from ANNOTATION";
		results = statisticsService.getResultBySQL(sql);
		return "result>json";
	}

	/* 批注最多的学生 */
	@SuppressWarnings("unchecked")
	public String mostAnnotationStudent() {
		User user = SystemContext.getCurrentUser();
		String sql = "select top 1 a.USER_ID,USER_NAME,annotationNum,AnnotationWordsNum from"
				+ " (select USER_ID,user_name,COUNT(ANNOTATION_ID) as annotationNum from USER_ANNOTATION_BOOK_VIEW group by USER_ID,USER_NAME) a "
				+ " left join (select USER_ID,sum(DATALENGTH(ANNOTATION_CONTENT)) as AnnotationWordsNum from USER_ANNOTATION_BOOK_VIEW group by USER_ID) b" + " on a.USER_ID=b.USER_ID"
				+ " order by annotationNum desc";
		results = statisticsService.getResultBySQL(sql);
		return "result>json";
	}

	/* 批注最多的书 */
	@SuppressWarnings("unchecked")
	public String mostAnnotationBook() {
		User user = SystemContext.getCurrentUser();
		String sql = "select top 1 a.BOOK_ID,BOOK_NAME,annotationNum,AnnotationWordsNum from"
				+ "(select BOOK_ID,BOOK_NAME,COUNT(ANNOTATION_ID) as annotationNum from USER_ANNOTATION_BOOK_VIEW group by BOOK_ID,BOOK_NAME) a "
				+ "left join (select BOOK_ID,sum(DATALENGTH(ANNOTATION_CONTENT)) as AnnotationWordsNum from USER_ANNOTATION_BOOK_VIEW group by BOOK_ID) b "
				+ "on a.BOOK_ID=b.BOOK_ID order by annotationNum desc";
		results = statisticsService.getResultBySQL(sql);
		return "result>json";
	}

	/* 评论总数 */
	@SuppressWarnings("unchecked")
	public String commentTotal() {
		User user = SystemContext.getCurrentUser();
		String sql = "select CommentWordsTotalNum,CommentWordsTeacherNum,CommentWordsStudentNum from (select 't' as t,COUNT(COMMENT_ID) as CommentWordsTotalNum from USER_COMMENT_INFO_VIEW) a0"
				+ " left join (select 't' as t,COUNT(COMMENT_ID) as CommentWordsTeacherNum from USER_COMMENT_INFO_VIEW where USER_TYPE = 1) a1 on a0.t = a1.t"
				+ " left join (select 't' as t,COUNT(COMMENT_ID) as CommentWordsStudentNum from USER_COMMENT_INFO_VIEW where USER_TYPE = 2) a2 on a1.t = a2.t";
		results = statisticsService.getResultBySQL(sql);
		return "result>json";
	}

	/* 评论最多的批注 */
	@SuppressWarnings("unchecked")
	public String mostCommentAnnotation() {
		User user = SystemContext.getCurrentUser();
		String sql = "select top 1 a.ANNOTATION_ID as annotationId,annotationNum,ANNOTATION_CONTENT as annotationContent,BOOK_CONTENT_OF_ANNOTATION as text from "
				+ "(select ANNOTATION_ID,COUNT(ANNOTATION_ID) as annotationNum from USER_COMMENT_INFO_VIEW group by ANNOTATION_ID) a "
				+ "left join (select ANNOTATION_ID,ANNOTATION_CONTENT,BOOK_CONTENT_OF_ANNOTATION from USER_COMMENT_INFO_VIEW) b " + "on a.ANNOTATION_ID=b.ANNOTATION_ID order by annotationNum desc";
		results = statisticsService.getResultBySQL(sql);
		return "result>json";
	}

	/* 总统计——前段要求一并发给前端 不包括前三个 */
	public String allStatistics() {
		List<Map<String, Object>> t0 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> t1 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> t2 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> t3 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> t4 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> t5 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> t6 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> t7 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> t8 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> t9 = new ArrayList<Map<String, Object>>();
		results = new ArrayList<Map<String, Object>>();

		String sql_0 = "select count(ANNOTATION_ID) as annotationTotal from ANNOTATION";
		t0 = statisticsService.getResultBySQL(sql_0);

		String sql_1 = "select sum(DATALENGTH(ANNOTATION_CONTENT)) as AnnotationWordsNum from ANNOTATION";
		t1 = statisticsService.getResultBySQL(sql_1);

		String sql_2 = "select top 1 a.USER_ID,USER_NAME,annotationNum,AnnotationWordsNum from"
				+ " (select USER_ID,user_name,COUNT(ANNOTATION_ID) as annotationNum from USER_ANNOTATION_BOOK_VIEW group by USER_ID,USER_NAME) a "
				+ " left join (select USER_ID,sum(DATALENGTH(ANNOTATION_CONTENT)) as AnnotationWordsNum from USER_ANNOTATION_BOOK_VIEW group by USER_ID) b" + " on a.USER_ID=b.USER_ID"
				+ " order by annotationNum desc";
		t2 = statisticsService.getResultBySQL(sql_2);

		String sql_3 = "select top 1 a.BOOK_ID,BOOK_NAME,annotationNum,AnnotationWordsNum from"
				+ "(select BOOK_ID,BOOK_NAME,COUNT(ANNOTATION_ID) as annotationNum from USER_ANNOTATION_BOOK_VIEW group by BOOK_ID,BOOK_NAME) a "
				+ "left join (select BOOK_ID,sum(DATALENGTH(ANNOTATION_CONTENT)) as AnnotationWordsNum from USER_ANNOTATION_BOOK_VIEW group by BOOK_ID) b "
				+ "on a.BOOK_ID=b.BOOK_ID order by annotationNum desc";
		t3 = statisticsService.getResultBySQL(sql_3);

		String sql_4 = "select CommentWordsTotalNum,CommentWordsTeacherNum,CommentWordsStudentNum from (select 't' as t,COUNT(COMMENT_ID) as CommentWordsTotalNum from USER_COMMENT_INFO_VIEW) a0"
				+ " left join (select 't' as t,COUNT(COMMENT_ID) as CommentWordsTeacherNum from USER_COMMENT_INFO_VIEW where USER_TYPE = 1) a1 on a0.t = a1.t"
				+ " left join (select 't' as t,COUNT(COMMENT_ID) as CommentWordsStudentNum from USER_COMMENT_INFO_VIEW where USER_TYPE = 2) a2 on a1.t = a2.t";
		t4 = statisticsService.getResultBySQL(sql_4);

		String sql_5 = "select top 1 a.ANNOTATION_ID as annotationId,annotationNum,ANNOTATION_CONTENT as annotationContent,BOOK_CONTENT_OF_ANNOTATION as text from "
				+ "(select ANNOTATION_ID,COUNT(ANNOTATION_ID) as annotationNum from USER_COMMENT_INFO_VIEW group by ANNOTATION_ID) a "
				+ "left join (select ANNOTATION_ID,ANNOTATION_CONTENT,BOOK_CONTENT_OF_ANNOTATION from USER_COMMENT_INFO_VIEW) b " + "on a.ANNOTATION_ID=b.ANNOTATION_ID order by annotationNum desc";
		t5 = statisticsService.getResultBySQL(sql_5);

		// 阅读总人数
		String sql_6 = "select count(distinct USER_ID) as readerTotal from ANNOTATION";
		t6 = statisticsService.getResultBySQL(sql_6);

		// 人均阅读本数
		String sql_7 = "select count(*) as bookNum from (select distinct BOOK_ID, USER_ID from ANNOTATION)A";// 所有人的阅读本数
		t7 = statisticsService.getResultBySQL(sql_7);
		System.out.println(t7);
		int x = ((Integer) t7.get(0).get("bookNum")).intValue();
		double ave = statisticsService.getAveRead(x);
		ave = (double)Math.round(ave*100)/100;
		t7.get(0).put("aveReadBook", ave);

		String sql_8 = "select top 1 USER_ID as userId, USER_CODE as userCode, USER_NAME as userName," + "COMMENT_NUM as commentNum from StudentCommentNumView";
		t8 = statisticsService.getResultBySQL(sql_8);

		String sql_9 = "select sum(READ_COUNT) as ReadWordsTotal from PAGE";
		t9 = statisticsService.getResultBySQL(sql_9);

		results.addAll(t0);
		results.addAll(t1);
		results.addAll(t2);
		results.addAll(t3);
		results.addAll(t4);
		results.addAll(t5);
		results.addAll(t6);
		results.addAll(t7);
		results.addAll(t8);
		results.addAll(t9);

		return "result>json";
	}
}
