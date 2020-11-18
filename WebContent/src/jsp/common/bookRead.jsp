<%@ page import="java.util.Date"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.framework.common.SystemContext"%>
<%@ page import="com.framework.authority.entity.User"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%ArrayList<Integer> type = new ArrayList<Integer>();type.add(TYPE_ADMIN);type.add(TYPE_STUDENT); type.add(TYPE_TEACHER);type.add(TYPE_SUPERADMIN);%>
<%@include file = "../../../common/commonRedirect.jsp" %>
<!doctype html>
<html lang="zh-CN">
<head>
	<meta charset="utf-8">
	<title>阅读书籍</title>
	<script>
        // 公共模块
        const modelUrls = {
            'link': [
                '../../css/commonBookRead.css',
            ],
            'script': [
                '../../js/action.js',
                '../../js/common/bookRead/event.js',
                '../../js/common/bookRead/tools.js',
                '../../js/common/bookRead/Book.js',
                '../../js/common/bookRead/AnnaoationManager.js',
                '../../js/common/bookRead/classes.js',
                '../../js/common/bookRead/annotationInfo.js',
                '../../js/common/bookRead/bookRead.js',
            ],
        };
	</script>
	<script src="../../js/settings.js"></script>
</head>
<body>
<div class="back-previous-page" id="back-pervious-page" title="返回上一页" data-toggle="tooltip" data-placement="top">
	<i class="fa fa-angle-left"></i>
</div>
<div class="book-container">
	<div class="classes" id="classes">
		<div>
			<div class="read-status" id="read-status">您已进入阅读模式...</div>
			<div class="btn-begin-read-text" hidden>
				您在浏览他人批注，进入阅读模式请点击继续阅读。
			</div>
			<button class="btn btn-outline-primary btn-begin-read" hidden>继续阅读</button>
		</div>
		<div class="dropdown">
			<button class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">

			</button>
			<div class="dropdown-menu">

			</div>
		</div>
		<table class="table">
			<thead id="table-thead">

			</thead>
		</table>
	</div>
	<div class="book-inner-container">
		<div class="book" id="book">
			<div class="book-header">
				<img src="" class="bookmark-sign" id="bookmark-sign">
			</div>
			<div class="book-content" id="book-content"></div>
			<div class="book-footer">
				<button class="btn-prev-page" id="btn-prev-page">上一页</button>
				<div>
					<input type="text" placeholder="1" class="current-page" id="current-page">
					<span>/</span>
					<span class="total-page" id="total-page"></span>
				</div>
				<button class="btn-next-page" id="btn-next-page">下一页</button>
			</div>
		</div>
	</div>

	<div class="annotation-info">
		<div class="annotation-info-btns">
			<button class="btn btn-outline-primary" id="annotation-info-btn-underline" disabled>划线</button>
			<button class="btn btn-outline-danger" id="annotation-info-btn-delete" disabled>删除</button>
		</div>
		<div class="annotation-info-body" id="annotation-info-body"></div>
		<input type="file" accept="image/*" id="reply-upload-image" hidden>
	</div>
</div>
</body>
</html>