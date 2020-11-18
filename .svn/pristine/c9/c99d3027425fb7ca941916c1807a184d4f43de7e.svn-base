package com.framework.authority.action;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.entityview.ClassStudentTeacherV;
import com.annotation.entityview.studentInClassOrNot;
import com.annotation.studentImport.DealWithData;
import com.framework.authority.entity.Role;
import com.framework.authority.entity.User;
import com.framework.authority.service.UserService;
import com.framework.cache.DefaultDBCache;
import com.framework.cache.impl.ColumnModelCacheImpl;
import com.framework.common.ExportExcelUtil;
import com.framework.common.SystemContext;
import com.framework.excel.entity.ColumnModel;
import com.framework.system.common.base.action.BaseGridAction;
import com.framework.utils.URLUtils;
import com.framework.common.ResultPostModel;

public class UserAction extends BaseGridAction {

	private static final long serialVersionUID = 949994782790906135L;
	@Autowired
	private UserService userService;
	private User user;
	private String userCode;
	private String userName;
	private String ids;
	private List<Role> roles;
	private String originalPWD;
	private String newPWD;
	private String confirmPWD;
	private Integer organizationId;
	private String userIds;
	
	private Integer pageNo=1;
	private Integer pageSize=16;
	private Boolean search=true;
	
	private String userGender;
	private String userMail;
	private String userPhone;
	private String userIntroduction;
	private User currentUser;
	private File userPhoto;
	private File file;
	private String userPhotoFileName;
	private String className;
	private String studentName;
	private String classIds;
	private String studentIds;
	private String teacherIds;
	private Integer classId;
	private Integer studentId;
	private String USERID;
	private String userType;
	
	
	
	/* 用户列表的方法 */
	public String list() {
		User currentUser = SystemContext.getCurrentUser();
		results = userService.queryUsersInfoByAdmin(currentUser
				.getOrganization().getId());
		return "result>json";
	}

	@SuppressWarnings({ "unchecked" })
	public List<Map<String, Object>> userList(String hql) {
		this.getPager().setPageNo(pageNo);
		this.getPager().setPageSize(pageSize);
		this.getPager().setSearch(true);
		userService.find(this.getPager(), hql, this.getFilter());
		ResultPostModel r = new ResultPostModel(
				(List<Map<String, Object>>) this.getPager().getDataset());
		if (!r.isEmpty())
			r.addResult("totalCount", getPager().getTotalCount());
		r.addResult("totalPage", getPager().getTotalPage());

		return r.getResult();
	}

	/* 学生列表 */
	public String studentList() {
		String hql = "select distinct studentId as studentId, className as className, studentName as studentName, studentGender as studentGender, studentCode as studentCode from studentInClassOrNot where organization = " + user.getOrganization().getId();
		results = userList(hql);
		return "result>json";
	}

	/* 教师列表 */
	public String teacherList() {
		results = new ArrayList<Map<String, Object>>();
		User currentUser = SystemContext.getCurrentUser();
		String hql = "select id as teacherId, userCode as teacherCode, userName as teacherName from User user where userType=1 and organization = "
				+ currentUser.getOrganization().getId();
		results.addAll(userService.getResultByHQL(hql));
		return "result>json";
	}

	public String allStudentsList() {
		User user = SystemContext.getCurrentUser();
		String hql = "";
		if(user.getUserType() == 0) {
			hql = "select distinct studentId as studentId, className as className, studentName as studentName, studentGender as studentGender, studentCode as studentCode from studentInClassOrNot where organizationId = "+user.getOrganization().getId();
		}else if(user.getUserType() == 1) {
			hql = "select distinct studentId as studentId, className as className, studentName as studentName, studentGender as studentGender, studentCode as studentCode from studentInClassOrNot where studentId in (select studentId from StudentInfo2V where teacherId = "+user.getId()+")";
		}
		results = new ResultPostModel("result", userService.getResultByHQL(hql))
				.getResult();
		return "result>json";
	}

	//分页查询学生列表
	@SuppressWarnings("unchecked")
	public String queryStudentsList() {
		User user = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo =new HashMap<String, Object>();
		this.getPager().setPageNo(pageNo);
		this.getPager().setPageSize(pageSize);
		this.getPager().setSearch(search);
		String hql = "select studentId as studentId, className as className, studentName as studentName, studentGender as studentGender, studentCode as studentCode from StudentInfo2V where teacherId="+user.getId();
		userService.find(this.getPager(), hql, this.getFilter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		results = (List<Map<String, Object>>) this.getPager().getDataset();
		results.add(basicInfo);
		return "result>json";
	}
	
	
	/* 班级下拉菜单（学生 */
	public String studentListNotPage() {
		String hql = "select distinct classId as classId, className as className from TeacherStudentV";
		results = userService.getResultByHQL(hql);
		return "result>json";
	}

	// 老师页面中查找学生
	public String studentInClasses() {
		User currentUser = SystemContext.getCurrentUser();
		String hql = "select studentId as studentId, className as className, studentName as studentName, studentCode as studentCode from StudentInfo2V where teacherId = '"
				+ currentUser.getId() + "'";
		results = userList(hql);
		return "result>json";
	}

	/************************************* 教师界面功能 *****************************************************/
	public String teacherStudentListNotPage() {
		User currentUser = SystemContext.getCurrentUser();
		String hql = "select distinct classId as classId, className as className from TeacherStudentV where teacherId = '"
				+ currentUser.getId() + "'";
		results = userService.getResultByHQL(hql);
		return "result>json";
	}

	/* 班级中查找学生 */
	public String teacherFindStudentInClass() {
		String id = SystemContext.getCurrentUser().getId().toString();
		String hql = "select classId as classId, studentId as studentId, className as className, studentName as studentName, studentCode as studentCode from TeacherStudentV where teacherId ="
				+ id;
		results = userList(hql);
		return "result>json";
	}

	/* 将学生移出班级 班级id */
	public List<Map<String, Object>> deleteStudentOfClass() {
		ResultPostModel r = new ResultPostModel();
		try {
			String hql = "delete ClassStudent where studentId in(" + studentIds
					+ ") and classId in(" + classId + ")";
			userService.executeHQLUpdate(hql);
			r.addResult("result", true);
		} catch (Exception e) {
			r.addResult("result", true);
		}
		return r.getResult();
	}

	/* 将学生移出班级 单班级 id */
	public String removeStudentOfClass() {
		results = deleteStudentOfClass();
		return "result>json";
	}

	// 导入模板
	public void downloadTemplate() {
		ExportExcelUtil.exportTemplate("学生名单导入模板", columnNames.split(","));
	}

	// 导出学生名单
	public void exportExcel() {
		String hql;
		List<Map<String, Object>> result = null;
		User user = SystemContext.getCurrentUser();
		DefaultDBCache.init();
		if (this.getIds() == null)
			if (null != getClassName() && getClassName().equals(""))
				hql = ExportExcelUtil.createHQL(
						studentInClassOrNot.class.getName(),
						propertyNames.split(","))
						+ " where organizationId = "
						+ user.getOrganization().getId()
						+ " and className is null ";
			else
				hql = ExportExcelUtil.createHQL(
						studentInClassOrNot.class.getName(),
						propertyNames.split(","))
						+ " where organizationId = "
						+ user.getOrganization().getId();
		else
			hql = ExportExcelUtil.createHQL(
					studentInClassOrNot.class.getName(),
					propertyNames.split(","))
					+ " where organizationId = "
					+ user.getOrganization().getId()
					+ " and  studentId in "
					+ this.getIds();
		result = userService.find(hql, this.getFilter());
		ColumnModelCacheImpl columnModelCache = (ColumnModelCacheImpl) DefaultDBCache
				.getCacheStore(ColumnModelCacheImpl.CACHE_NAME);
		columnModelCache.init();
		List<ColumnModel> cmList = columnModelCache.getColumnModelList(
				ClassStudentTeacherV.TABLE_CODE, propertyNames.split(","));
		String[] lst=null;
		ExportExcelUtil.exportExcel(result, cmList, "学生名单",
				columnNames.split(","),lst);
	}

	/* 导入学生 */
	public String studentImport() {
		User user = SystemContext.getCurrentUser();
		results = userService.studentImport(DealWithData.getDatas(file), user
				.getOrganization().getId());
		return "result>json";
	}

	/***************************************************************************************************/

	/* 学生 多重条件查询 */
	public String studentQuery() {
		Integer id = currentUser.getOrganization().getId();
		String hql = "select id as userId, userCode as userCode, userName as userName from User user where userType = 2 and organization.id="
				+ id;
		results = userList(hql);
		return "result>json";
	}

	/* 教师 多重条件查询 */
	public String teacherQuery() {
		Integer id = currentUser.getOrganization().getId();
		String hql = "select id as userId, userCode as userCode, userName as userName from User user where userType = 1 and organization.id="
				+ id;
		results = userList(hql);
		return "result>json";
	}
	
	public String addUser(){
		results = userService.addUserService(this.getUserName(),this.getUserCode(),
				this.getUserGender(), this.getUserType());
		return "result>json";
	}

	/* 查看用户信息 */
	public String queryUserInfo() {
		User user = SystemContext.getCurrentUser();
		results = userService.queryUserInfo(user.getId());
		return "result>json";
	}

	/* 修改用户 */
	public String updateUserInfo() {
		User user = SystemContext.getCurrentUser();
		try {
			userService.updateUserInfo(user.getId(), this.getUserMail(),
					this.getUserPhone(), this.getUserIntroduction());
			results = new ResultPostModel("result", true).getResult();
		} catch (Exception e) {
			System.out.println(e);
			results = new ResultPostModel("result", false).getResult();
		}
		return "result>json";
	} 

	/* 更新用户密码 */
	public String updateCurrentUserPwd() {
		results = new ArrayList<Map<String, Object>>();
		User user = SystemContext.getCurrentUser();
		try {
			results = new ResultPostModel("result",
					(Object) userService.updatePassword(user.getId(),
							getOriginalPWD(), getNewPWD(), getConfirmPWD()))
					.getResult();

		} catch (Exception e) {
			results = new ResultPostModel("result", false).getResult();
		}
		return "result>json";
	}
	
	// 更新用户头像
	public String uploadUserPhoto() {
		results = new ArrayList<Map<String, Object>>();
		User user = SystemContext.getCurrentUser();
		/* 创建路径 */
		File file = new File(
				URLUtils.generateURLforUserInfo(user.getUsername()));
		if (!file.exists())
			file.mkdirs();
		try {
			/* 复制文件 */
			FileUtils.copyFile(this.getUserPhoto(),
					new File(file, this.getUserPhotoFileName()));
			String Path = user.getUserCode() + "/userInfo/"+this.getUserPhotoFileName();
			Integer t = userService.updateUserPhotoService(user.getUserCode(),Path);
			if(t>0){
				results = new ResultPostModel("result", true).getResult();
			}
			else{
				results = new ResultPostModel("result", false).getResult();
			}
		} catch (Exception e) {
			results = new ResultPostModel("result", false).getResult();
			System.out.println(e);
		}
		return "result>json";
	}

	/* 密码初始化 */
	public String resetPassword() {
		results = userService.initPassword(this.getIds());
		return "result>json";
	}

	/* 删除用户 */
	public String deleteUser() {
		results = userService.deleteUserService(this.getIds());
		return "result>json";
	}

	/* 根据Id查找单个用户 */
	public String queryUserById() {
		User user = SystemContext.getCurrentUser();
		results = new ArrayList<Map<String, Object>>();
		try {
			results = userService.queryById(user.getId());
		} catch (Exception e) {
			results = new ResultPostModel("result", false).getResult();
			System.out.println(e);
		}
		return "result>json";
	}

	/* 获取当前用户姓名 */
	public String getCurrentUserName() {
		User user = SystemContext.getCurrentUser();
		results = userService.queryById(user.getId());
		return "result>json";
	}

	/* 没添加至机构的管理员 */
	public String queryAdminNotInOrganization() {
		results = new ArrayList<Map<String, Object>>();
		try {
			results = userService.queryAdminNotInOrganization();
			results = new ResultPostModel("status", true).getResult();
		} catch (Exception e) {
			results = new ResultPostModel("status", "error").getResult();
		}
		return "result>json";
	}

	/* 已经添加至某个机构的管理员 */
	public String queryAdminInOrganization() {
		results = new ArrayList<Map<String, Object>>();
		try {
			results = userService.queryAdminInOrganization(this
					.getOrganizationId());

		} catch (Exception e) {
			results = new ResultPostModel("result", false).getResult();
		}
		return "result>json";
	}

	// following is getter and setter func
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public String getOriginalPWD() {
		return originalPWD;
	}

	public void setOriginalPWD(String originalPWD) {
		this.originalPWD = originalPWD;
	}

	public String getNewPWD() {
		return newPWD;
	}

	public void setNewPWD(String newPWD) {
		this.newPWD = newPWD;
	}

	public String getConfirmPWD() {
		return confirmPWD;
	}

	public void setConfirmPWD(String confirmPWD) {
		this.confirmPWD = confirmPWD;
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	public String getUserIds() {
		return userIds;
	}

	public void setUserIds(String userIds) {
		this.userIds = userIds;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Boolean getSearch() {
		return search;
	}

	public void setSearch(Boolean search) {
		this.search = search;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getClassIds() {
		return classIds;
	}

	public void setClassIds(String classIds) {
		this.classIds = classIds;
	}

	public String getStudentIds() {
		return studentIds;
	}

	public void setStudentIds(String studentIds) {
		this.studentIds = studentIds;
	}

	public Integer getClassId() {
		return classId;
	}

	public void setClassId(Integer classId) {
		this.classId = classId;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public String getTeacherIds() {
		return teacherIds;
	}

	public void setTeacherIds(String teacherIds) {
		this.teacherIds = teacherIds;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getUserMail() {
		return userMail;
	}

	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public String getUserIntroduction() {
		return userIntroduction;
	}

	public void setUserIntroduction(String userIntroduction) {
		this.userIntroduction = userIntroduction;
	}

	public User getCurrentUser() {
		return currentUser;
	}

	public void setCurrentUser(User currentUser) {
		this.currentUser = currentUser;
	}

	public File getUserPhoto() {
		return userPhoto;
	}

	public void setUserPhoto(File userPhoto) {
		this.userPhoto = userPhoto;
	}

	public String getUserPhotoFileName() {
		return userPhotoFileName;
	}

	public void setUserPhotoFileName(String userPhotoFileName) {
		this.userPhotoFileName = userPhotoFileName;
	}

	public String getUserGender() {
		return userGender;
	}

	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}

	public String getUSERID() {
		return USERID;
	}

	public void setUSERID(String uSERID) {
		USERID = uSERID;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}
	
}
