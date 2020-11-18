package com.annotation.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.framework.authority.entity.User;
import com.framework.common.ResultPostModel;
import com.framework.common.SystemContext;
import com.framework.system.common.base.service.impl.BaseServiceImpl;
import com.annotation.entity.Comment;

@Service
public class CommentService extends BaseServiceImpl<Comment> {

	@Autowired
	private AnnotationUserTypeService annotationUserType;

	public void addComment(Integer annotationId, Integer toUser,
			String commentContent, Integer fromUser, String commentPicName) {
		String hql = "insert into COMMENT  (ANNOTATION_ID, COMMENT_CONTENT, TO_USER, FROM_USER,PIC_URL) values ("
				+ annotationId
				+ ",'"
				+ commentContent
				+ "',"
				+ toUser
				+ ","
				+ fromUser + ",'" + commentPicName + "')";
		System.out.println("########" + hql);
		this.executeSQLUpdate(hql);
	}

	public void addCommentToAnnotation(Integer annotationId,
			String commentContent, Integer fromUser, String commentPicName) {
		String sql = "insert into COMMENT  (ANNOTATION_ID, COMMENT_CONTENT, FROM_USER,PIC_URL) values ("
				+ annotationId
				+ ",'"
				+ commentContent
				+ "',"
				+ fromUser
				+ ",'"
				+ commentPicName + "')";
		System.out.println("########" + sql);
		this.executeSQLUpdate(sql);
	}

	public void deleteComment(Integer commentId) {
		String hql = "delete from Comment where commentId = " + commentId;
		this.executeHQLUpdate(hql);
	}

	// 老师查看评论
	public List<Map<String, Object>> teacherLookOverComment(
			Integer annotationId, Integer userId) {
		String hql = "select commentId as commentId,"
				+ "commentContent as commentContent,"
				+ "fromUserId as fromUserId,"
				+ "fromUserName as fromUserName,"
				+ "toUserId as toUserId,"
				+ "toUserName as toUserName,"
				+ "likeNum as likeNum, "
				+ "creationTime as creationTime, "
				+ "picUrl as commentPic"
				+ " from UserCommentInfoView where annotationId = ? order by creationTime";
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		results = this.getResultByHQL(hql, annotationId);
		for (int i = 0; i < results.size(); i++) {
			SimpleDateFormat dateFormat = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			String time = dateFormat.format(results.get(i).get("creationTime"));
			results.get(i).put("time", time);
			String hql1 = "select count(*) from CommentLike where commentId = ? and likeUser = ?";
			Integer count = this.getTotalCountByHQL(hql1,
					results.get(i).get("commentId"), userId);
			System.out.println("test" + results.get(i).get(0));
			if (count > 0) {
				results.get(i).put("islike", true);
			} else {
				results.get(i).put("islike", false);
			}
		}
		return results;
	}

	// 学生查看评论
	public List<Map<String, Object>> studentLookOverComment(
			Integer annotationId, Integer userId, Integer AnnotationUserId,
			Integer type) {
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();

		if (type == 1) {
			String hql = "select commentId as commentId,"
					+ "commentContent as commentContent,"
					+ "fromUserId as fromUserId,"
					+ "fromUserName as fromUserName,"
					+ "toUserId as toUserId,"
					+ "toUserName as toUserName,"
					+ "likeNum as likeNum, "
					+ "picUrl as commentPic, "
					+ "creationTime as creationTime"
					+ " from UserCommentInfoView where annotationId = ? and (fromUserId = ? or fromUserId = ?) order by creationTime";
			results = this.getResultByHQL(hql, annotationId, userId,
					AnnotationUserId);
			for (int i = 0; i < results.size(); i++) {
				SimpleDateFormat dateFormat = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				String time = dateFormat.format(results.get(i).get(
						"creationTime"));
				results.get(i).put("time", time);
				String hql1 = "select count(*) from CommentLike where commentId = ? and likeUser = ?";
				Integer count = this.getTotalCountByHQL(hql1, results.get(i)
						.get("commentId"), userId);
				System.out.println("test" + results.get(i).get(0));
				if (count > 0) {
					results.get(i).put("islike", true);
				} else {
					results.get(i).put("islike", false);
				}
			}
		} else {
			String hql = "select commentId as commentId,"
					+ "commentContent as commentContent,"
					+ "fromUserId as fromUserId,"
					+ "fromUserName as fromUserName,"
					+ "toUserId as toUserId,"
					+ "toUserName as toUserName,"
					+ "likeNum as likeNum, "
					+ "picUrl as commentPic, "
					+ "creationTime as creationTime"
					+ " from UserCommentInfoView where annotationId = ? order by creationTime";
			results = this.getResultByHQL(hql, annotationId);
			for (int i = 0; i < results.size(); i++) {
				SimpleDateFormat dateFormat = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				String time = dateFormat.format(results.get(i).get(
						"creationTime"));
				results.get(i).put("time", time);
				String hql1 = "select count(*) from CommentLike where commentId = ? and likeUser = ?";
				Integer count = this.getTotalCountByHQL(hql1, results.get(i)
						.get("commentId"), userId);
				System.out.println("test" + results.get(i).get(0));
				if (count > 0) {
					results.get(i).put("islike", true);
				} else {
					results.get(i).put("islike", false);
				}
			}
		}
		return results;
	}

	// 查看评论
	public List<Map<String, Object>> addCommentService(Integer annoId) {
		List<Map<String, Object>> temp;
		User user = SystemContext.getCurrentUser();
		try {
			if (annoId != null && annoId >= 0) {
				Integer type = annotationUserType.getAnnotationUserType(annoId);
				Integer annotationUserId = annotationUserType
						.getAnnotationUserId(annoId);
				if (user.getUserType() == 1)
					temp = new ResultPostModel("data",
							this.teacherLookOverComment(annoId, user.getId()),
							"status", "ok").getResult();

				else
					temp = new ResultPostModel("data",
							this.studentLookOverComment(annoId, user.getId(),
									annotationUserId, type), "status", "ok")
							.getResult();
			} else {
				temp = new ResultPostModel("status", "error").getResult();
			}

		} catch (Exception e) {
			temp = new ResultPostModel("status", "error").getResult();
			System.out.println(e);
		}
		return temp;
	}
}