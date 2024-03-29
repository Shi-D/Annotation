<%@ page import="java.util.Date"%>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.framework.common.SystemContext"%>
<%@ page import="com.framework.authority.entity.User"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%ArrayList<Integer> type = new ArrayList<Integer>();type.add(TYPE_SUPERADMIN); %>
<%@include file = "../../../common/commonRedirect.jsp" %>
<meta charset="UTF-8">
<title>机构管理</title>
<link rel="stylesheet"
	href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css">
<link rel="stylesheet" href="../css/managementPage.css" />
</head>
<body>
	<div class="main">
		<div class="sider-menu">
			<div class="sider-menu-header"></div>
			<ul class="management-menu" id="management-menu">
				<li class="active"><span> <i
						class="fa fa-graduation-cap"></i> <a
						href="organizationManagement.html">机构管理</a>
				</span></li>
				<li><span> <i class="fa fa-group"></i> <a
						href="adminManagement.html">管理员管理</a>
				</span></li>
			</ul>
		</div>
		<div class="layout">
			<div class="layout-header">
				<i class="fa fa-outdent sider-menu-trigger"></i>
				<div class="top-right">
					<span class="user-info" id="user-info"> <img
						class="user-avatar"
						src="https://fany12.oss-cn-hangzhou.aliyuncs.com/PictureBed/userAvatar.png">
						<span class="user-name">fany12</span>
					</span>
				</div>
			</div>
			<div class="layout-content">
				<div class="layout-content-main">
					<div class="table-part">
						<div class="table-operate" id="operate">
							<button class="disabled btn btn-primary" id="add-admin"
								data-toggle="modal" data-target="#add-admin-modal" disabled>
								<i class="fa fa-plus-circle"></i> <span>为机构添加管理员</span>
							</button>

							<button class="disabled btn btn-primary" id="remove-admin"
								data-toggle="modal" data-target="#remove-admin-modal" disabled>
								<i class="fa fa-minus-circle" aria-hidden="true"></i> <span>从机构移除管理员</span>
							</button>

							<button class="btn btn-primary" id="add-organization"
								data-toggle="modal" data-target="#add-organization-modal">
								<i class="fa fa-plus-circle"></i> <span>新增机构</span>
							</button>

							<button class="btn btn-primary" id="delete-organization"
								data-toggle="modal" data-target="#delete-organization-modal"
								disabled>
								<i class="fa fa-minus-circle" aria-hidden="true"></i> <span>删除机构</span>
							</button>

							<div class="modal" id="add-admin-modal">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">

											<p id="addAdmin_organizationName">为机构添加管理员</p>

											<button type="button" class="close" data-dismiss="modal">&times;</button>
										</div>
										<div class="modal-body">

											<div class="table-context-body">
												<table id="modal_adminNotInOrganization_list"
													class="modal_list">
												</table>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary"
												id="addAdminCommit">添加</button>
										</div>
									</div>
								</div>
							</div>
							<div class="modal" id="remove-admin-modal">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<p id="removeAdmin_organizationName">从机构移除管理员</p>
											<button type="button" class="close" data-dismiss="modal">&times;</button>
										</div>
										<div class="modal-body">

											<div class="table-context-body">
												<table id="modal_adminInOrganization_list"
													class="modal_list">
												</table>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary"
												id="removeAdminCommit">移除</button>
										</div>
									</div>
								</div>
							</div>
							<div class="modal" id="add-organization-modal">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<p>添加机构</p>
											<button type="button" class="close" data-dismiss="modal">&times;</button>
										</div>
										<div class="modal-body">
											<input type="text" placeholder="机构名称"
												id="addOrganizationName"> <input type="text"
												placeholder="机构号码" id="addOrganizationCode">
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary"
												data-dismiss="modal" id="addOrganizationCommit">添加</button>
										</div>
									</div>
								</div>
							</div>
							<div class="modal" id="delete-organization-modal">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<p>删除机构</p>
											<button type="button" class="close" data-dismiss="modal">&times;</button>
										</div>
										<div class="modal-body">
											<p>
												确认删除机构？<span id="deleteOrganization_organizationName"
													style="color: red"></span>?
											</p>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary"
												data-dismiss="modal" id="deleteOrganizationCommit">确认</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="table-fliter" id="table-fliter">
							<!--<div>
                            <div>
                                <label for="search-organization">机构名：</label>
                                <input id="search-organization" type="text" placeholder="" data-value="organizationName">
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-primary" id="query">
                                <span>查询</span>
                            </button>
                            <button class="btn btn-outline-secondary" id="reset">
                                <span>重置</span>
                            </button>
                        </div>-->
						</div>
						<div class="table-context">
							<div class="tablet-context-header">
								<table>
									<tbody id="table-header">

									</tbody>
								</table>
							</div>
							<div class="table-context-body" id="table-context-body">
								<table>
									<tbody id="table-body">

									</tbody>
								</table>
							</div>
						</div>
						<div class="table-footer">
							<div class="jump-page">
								<button id="first-page">
									<i class="fa fa-angle-double-left"></i>
								</button>
								<button id="pre-page">
									<i class="fa fa-angle-left"></i>
								</button>
								<span class="page-description"> <span>第</span> <input
									id="current-page" type="text" placeholder=""> <span>页，共</span>
									<span id="total-page"></span> <span>页</span>
								</span>
								<button class="pre-page" id="next-page">
									<i class="fa fa-angle-right"></i>
								</button>
								<button class="first-page" id="last-page">
									<i class="fa fa-angle-double-right"></i>
								</button>
								<button class="refresh-page" id="refresh-page">
									<i class="fa fa-refresh"></i>
								</button>
							</div>
							<div class="select-page">
								<span class="page-description"> <span>显示</span> <span
									id="first-index"></span> <span>到</span> <span id="last-index"></span>
									<span>条，共</span> <span id="total-item"></span> <span>条，</span>
									<input id="per-page" type="text" placeholder=""> <span>条/页</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="../../common/common.js"></script>
	<script src="../../common/jquery-3.3.1.js"></script>
	<script
		src="https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js"></script>
	<script
		src="https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
	<script src="../js/Server.js"></script>
	<script src="../js/tableManager.js"></script>
	<script src="../js/organizationManagement.js"></script>
</body>
</html>