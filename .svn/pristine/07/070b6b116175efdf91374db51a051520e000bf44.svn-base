<%@ page import="java.util.Date"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.framework.common.SystemContext"%>
<%@ page import="com.framework.authority.entity.User"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%ArrayList<Integer> type = new ArrayList<Integer>();type.add(TYPE_STUDENT); %>
<%@include file = "../../../common/commonRedirect.jsp" %>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>我的书架</title>
	<script>
        // 公共模块
        const modelUrls = {
            'link': [
                '../../css/studentBookshelf.css',
            ],
            'script': [
                '../../js/action.js',
                '../../js/preprocessor.js',
                '../../js/studentPages/bookshelf.js',
            ],
        };
	</script>
	<script src="../../js/settings.js"></script>
</head>
<body>
<div class="header"></div>

<div class="main">
	<div class="readed">
		<div class="title">
			<h3>最近阅读</h3>
		</div>
		<div class="book-list" id="readed-book-list"></div>
	</div>
	<div class="bookshelf" id="bookshelf">
		<h3>班级书架</h3>
		<div class="book-list" id="book-list"></div>
	</div>
</div>
</body>

</html>