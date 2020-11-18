package com.annotation.action.comment;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.entity.Comment;
import com.annotation.service.AnnotationUserTypeService;
import com.annotation.service.CommentService;
import com.framework.authority.entity.User;
import com.framework.common.SystemContext;
import com.framework.system.common.base.action.BaseGridAction;
import com.framework.utils.URLUtils;

public class commentAction extends BaseGridAction {

	@Autowired
	private CommentService commentService;
	@Autowired
	private AnnotationUserTypeService annotationUserType;

	private Comment comment;

	private Integer commentId;
	private Integer annotationId;
	private Integer replyId;
	private Integer replyType;
	private String commentContent;
	private Integer fromUser;
	private Integer toUser;
	private Date creationTime;

	private Integer toId;
	private Integer type;
	private String content;
	private Integer from;
	private Date time;

	public String getCommentPicFileName() {
		return commentPicFileName;
	}

	public void setCommentPicFileName(String commentPicFileName) {
		this.commentPicFileName = commentPicFileName;
	}

	private File commentPic;
	private String commentPicFileName;

	public File getCommentPic() {
		return commentPic;
	}

	public void setCommentPic(File commentPic) {
		this.commentPic = commentPic;
	}

	// 添加评论
	public String addComment() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		User user = SystemContext.getCurrentUser();

		try {
			/* 获得图片 */
			File file = new File(URLUtils.generateURLforComment(user.getUsername()));
			if (!file.exists())
				file.mkdirs();
			String commentPicName;

			if (null != this.getCommentPic()) {

				File copy = new File(file, this.getCommentPicFileName());
				/* 复制文件 */
				FileUtils.copyFile(this.getCommentPic(), copy);
				commentPicName = user.getUsername() + "/comment/" + this.getCommentPicFileName();

				System.out.println(this.getCommentPic().getName());
				System.out.println(this.getCommentPicFileName());
			} else {
				commentPicName = null;
			}

			if (this.getToId() == null) {
				commentService.addCommentToAnnotation(this.getAnnotationId(), this.getContent(), user.getId(), commentPicName);
			} else {
				commentService.addComment(this.getAnnotationId(), this.getToId(), this.getContent(), user.getId(), commentPicName);
			}
			basicInfo.put("status", "ok");
			basicInfo.put("commentPic", commentPicName);
		} catch (Exception e) {
			basicInfo.put("status", "error");
			System.out.println(e);
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 删除评论
	public String deleteComment() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			/* if there is a picture of Comment,delete the picture file */
			String picName = commentService.get(Comment.class, this.getCommentId()).getPicUrl();

			commentService.deleteComment(this.getCommentId());

			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 查看评论
	public String lookOverComment() throws Exception {
		results = commentService.addCommentService(this.getAnnotationId());
		return "result>json";
	}

	public CommentService getCommentService() {
		return commentService;
	}

	public void setCommentService(CommentService commentService) {
		this.commentService = commentService;
	}

	public Comment getComment() {
		return comment;
	}

	public void setComment(Comment comment) {
		this.comment = comment;
	}

	public Integer getCommentId() {
		return commentId;
	}

	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}

	public Integer getAnnotationId() {
		return annotationId;
	}

	public void setAnnotationId(Integer annotationId) {
		this.annotationId = annotationId;
	}

	public Integer getReplyId() {
		return replyId;
	}

	public void setReplyId(Integer replyId) {
		this.replyId = replyId;
	}

	public Integer getReplyType() {
		return replyType;
	}

	public void setReplyType(Integer replyType) {
		this.replyType = replyType;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public Integer getFromUser() {
		return fromUser;
	}

	public void setFromUser(Integer fromUser) {
		this.fromUser = fromUser;
	}

	public Integer getToUser() {
		return toUser;
	}

	public void setToUser(Integer toUser) {
		this.toUser = toUser;
	}

	public Date getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}

	public Integer getToId() {
		return toId;
	}

	public void setToId(Integer toId) {
		this.toId = toId;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getFrom() {
		return from;
	}

	public void setFrom(Integer from) {
		this.from = from;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}
}