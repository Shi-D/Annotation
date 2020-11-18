<%@ page import="java.util.Date"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.framework.common.SystemContext"%>
<%@ page import="com.framework.authority.entity.User"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%ArrayList<Integer> type = new ArrayList<Integer>();type.add(TYPE_ADMIN); %>
<%@include file = "../../../common/commonRedirect.jsp" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>用户管理</title>
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
                '../../js/adminPages/user.js',
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
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a class="nav-link active" id="nav-teacherManagement">老师管理</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="nav-studentManagement">学生管理</a>
				</li>
			</ul>
			<div class="table-part" id="table-part"></div>
			<div class="modal-area">
				<div class="modal fade" id="modal-resetPassword">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5>重置密码</h5>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<p>您确认要重置用户 <span class="text-danger" id="modal-resetPassword-span-names"></span> 的密码吗？</p>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" id="modal-resetPassword-btn-ok">确定
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="modal fade" id="modal-addUser">
					<div class="modal-dialog modal-dialog-scrollable">
						<div class="modal-content">
							<div class="modal-header">
								<h5>添加用户</h5>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<form>
									<div class="form-group">
										<label for="modal-addUser-input-name">
											姓名
											<span class="text-danger">*</span>
										</label>
										<input type="text" class="form-control" id="modal-addUser-input-name">
									</div>
									<div class="form-group">
										<label for="modal-addUser-input-sex">
											性别
											<span class="text-danger">*</span>
										</label>
										<input type="text" class="form-control" id="modal-addUser-input-sex">
									</div>
									<div class="form-group">
										<label for="modal-addUser-input-account">
											账号
											<span class="text-danger">*</span>
										</label>
										<input type="text" class="form-control" id="modal-addUser-input-account">
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button class="btn btn-primary" data-dismiss="modal"
										id="modal-addUser-btn-ok">确认
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="modal fade" id="modal-deleteUser">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5>删除用户</h5>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<p>您确认要删除用户 <span class="text-danger" id="modal-deleteUser-span-names"></span> 吗？</p>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-danger" id="modal-deleteUser-btn-ok">确定
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="modal fade" id="modal-uploadExcel">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5>导入学生名单</h5>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<div class="modal-body">
								<form>
									<div class="form-group">
										<label for="modal-uploadExcel-input-file">
											选择文件
											<span class="text-danger">*</span>
										</label>
										<input type="file" class="form-control" id="modal-uploadExcel-input-file">
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary" id="modal-uploadExcel-btn-ok">确定
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>