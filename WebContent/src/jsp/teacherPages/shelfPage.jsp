<%@ page import="java.util.Date"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.framework.common.SystemContext"%>
<%@ page import="com.framework.authority.entity.User"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%ArrayList<Integer> type = new ArrayList<Integer>();type.add(TYPE_TEACHER); %>
<%@include file = "../../../common/commonRedirect.jsp" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>书架管理</title>
	<script>
        // 公共模块
        const modelUrls = {
            'link': [
                '../../css/teacherPage.css',
            ],
            'script': [
                '../../js/action.js',
                '../../js/preprocessor.js',
                '../../js/table.js',
                '../../js/teacherPages/shelfPage.js',
            ],
        };
	</script>
	<script src="../../js/settings.js"></script>
</head>
<body>
<div class="main">
	<div class="sider"></div>
	<div class="main-body">
		<div class="main-body-header"></div>
		<div class="main-body-content">
			<div class="table-part" id="table-part"></div>
		</div>
	</div>
</div>
</body>
</html>