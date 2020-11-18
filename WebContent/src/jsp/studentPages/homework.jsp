<%@ page import="java.util.Date"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.framework.common.SystemContext"%>
<%@ page import="com.framework.authority.entity.User"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%ArrayList<Integer> type = new ArrayList<Integer>();type.add(TYPE_STUDENT); %>
<%@include file = "../../../common/commonRedirect.jsp" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>作业管理</title>
	<script>
        // 公共模块
        const modelUrls = {
            'link': [
                '../../css/studentHomework.css',
            ],
            'script': [
                '../../js/action.js',
                '../../js/preprocessor.js',
                '../../js/studentPages/homework.js',
            ],
        };
	</script>
	<script src="../../js/settings.js"></script>
</head>
<body>
<div class="header"></div>
<div class="main">
	<div class="homework-list container">
		<div class="row" id="homework-list"></div>
	</div>
	<div class="modal-area">
		<div class="modal fade" id="modal-doHomework">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5></h5>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<p>
							<span class="font-weight-bold">老师布置的作业内容：</span>
							<span id="modal-doHomework-p-homeworkContent"></span>
						</p>
						<p>
							<span class="font-weight-bold">老师布置的作业附件：</span>
							<span id="modal-doHomework-a-homeworkFile">无</span>
						</p>
						<p>
							<span class="font-weight-bold">开始时间：</span>
							<span id="modal-doHomework-p-startTime"></span>
						</p>
						<p>
							<span class="font-weight-bold">截止时间：</span>
							<span id="modal-doHomework-p-limitTime"></span>
						</p>
						
						<hr>
						<p id="modal-doHomework-p-myAnswer"></p>
						<p id="modal-doHomework-p-myFile"></p>
						<p id="modal-doHomework-p-score"></p>
						<p id="modal-doHomework-p-evaluation"></p>
						<form>
							<div class="form-group" id="modal-doHomework-answer" hidden>
								<label for="modal-doHomework-input-answer">编辑我的答案：</label>
								<textarea class="form-control" id="modal-doHomework-input-answer"></textarea>
								<small class="form-text text-muted">请勿超过1500字</small>
							</div>
							<div class="form-group" id="modal-doHomework-formGroup-input-file" hidden>
								<label for="modal-doHomework-input-file">我要添加附件：</label>
								<input type="file" class="form-control" id="modal-doHomework-input-file">
							</div>
							<!-- <div class="form-group" hidden>
								<span>我的文件：</span>
								<a id="modal-doHomework-a-yourAnswer"></a>
							</div> -->
						</form>
					</div>
					<div class="modal-footer">
						<!--<button class="btn btn-secondary" data-dismiss="modal" id="modal-doHomework-btn-save">保存</button>-->
						<button class="btn btn-primary" data-dismiss="modal" id="modal-doHomework-btn-ok">提交</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>
