package com.framework.authority.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.framework.authority.entity.Role;
import com.framework.authority.entity.User;
import com.framework.common.ResultPostModel;
import com.framework.common.SystemContext;
import com.framework.system.common.base.service.impl.BaseServiceImpl;
import com.framework.system.common.global.CustomProperties;
import com.framework.system.entity.Organization;
import com.framework.system.service.organization.OrganizationService;

@Service
public class UserService extends BaseServiceImpl<User> {
	public static final String SERVICE_BEAN_NAME = "userService";

	@Autowired
	private RoleService roleService;
	@Autowired
	private OrganizationService organizationService;

	/**
	 * 获取所有用户，但是不级联查询
	 * 
	 * @return
	 */
	public List<User> queryAllWithNoCascade() {
		String hql = "FROM User u LEFT JOIN FETCH u.roles r";

		return this.find(hql);
	}

	/**
	 * 获取用户，并级联查询
	 * 
	 * @return
	 */
	public User queryWithCascade(Integer userId) {
		if (userId == null) {
			return null;
		}

		String hql = "FROM User u LEFT JOIN FETCH u.roles r WHERE u.id=?";

		return (User) this.uniqueResultByHQL(hql, userId);
	}

	// 多条件组合查询 学生
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> studentFindMoltiCondition(User user,
			Integer organizationId) {
		List<Object> list = new ArrayList<Object>();
		String hql = "select user.userCode as userCode, user.userName as userName from User user left join user.organization organization where user.userType=2 and organization.id=?";
		list.add(organizationId);
		// 姓名查找
		if (user.getUserName() != null && !"".equals(user.getUserName())) {
			hql += " and user.userName like ?";
			list.add("%" + user.getUserName() + "%");
		}
		// 账号查找
		if (user.getUserCode() != null && !"".equals(user.getUserCode())) {
			hql += " and user.userCode like ?";
			list.add("%" + user.getUserCode() + "%");
		}

		return (List<Map<String, Object>>) this.getResultByHQL(hql,
				list.toArray());
	}

	// 多条件组合查询 教师
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> teacherFindMoltiCondition(User user,
			Integer organizationId) {
		List<Object> list = new ArrayList<Object>();
		String hql = "select user.userCode as userCode, user.userName as userName from User user left join user.organization organization where user.userType=1 and organization.id=?";
		list.add(organizationId);
		// 姓名查找
		if (user.getUserName() != null && !"".equals(user.getUserName())) {
			hql += " and user.userName like ?";
			list.add("%" + user.getUserName() + "%");
		}
		// 账号查找
		if (user.getUserCode() != null && !"".equals(user.getUserCode())) {
			hql += " and user.userCode like ?";
			list.add("%" + user.getUserCode() + "%");
		}

		return (List<Map<String, Object>>) this.getResultByHQL(hql,
				list.toArray());
	}

	/**
	 * 根据编号查询用户
	 * 
	 * @param codes
	 * @return
	 */
	public Map<String, String> queryByCodes(String codes) {
		String hql = "select new User(userCode,userName) from User where userCode in("
				+ codes + ")";
		List<User> userList = this.find(hql);
		Map<String, String> result = new HashMap<String, String>();
		for (User user : userList) {
			result.put(user.getUserCode(), user.getUserName());
		}
		return result;
	}

	/**
	 * 获取用户信息
	 * 
	 * @param userCode
	 *            账号
	 * @return
	 */
	public User getUser(String userCode) {
		String hql = "FROM User WHERE userCode=?";

		return (User) this.uniqueResultByHQL(hql, userCode);
	}

	public Integer getUserType(Integer userId) {
		System.out.println("查看评论");
		User user = this.get(User.class, userId);
		System.out.println("#####" + user.getUserType());
		return user.getUserType();
	}

	/**
	 * 判断账号是否存在
	 * 
	 * @param userCode
	 *            账号
	 * @return
	 */
	public Boolean isExist(String userCode) {
		String hql = "SELECT COUNT(*) FROM User WHERE userCode=?";

		Integer count = this.getTotalCountByHQL(hql, userCode);

		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}

	/* 根据ID查找单个用户 */
	public List<Map<String, Object>> queryById(Integer id) {
		List<Map<String, Object>> temp;
		try {
			String hql = "select userName as userName,userType as userType from User where id=?";
			temp = this.getResultByHQL(hql, id);
		} catch (Exception e) {
			temp = new ResultPostModel("result", false).getResult();
		}
		return temp;

	}

	/* 根据IDs查用户 */
	public List<User> queryByIds(String ids) {
		String hql = "from User where id in(" + ids + ")";
		List<User> userList = this.find(hql);
		return userList;
	}

	/* 将user按照机构组成Map */
	public Map<Organization, List<User>> TransformToMap(List<User> userList) {
		Map<Organization, List<User>> result = new HashMap<Organization, List<User>>();
		for (User user : userList) {
			List<User> users = result.get(user.getOrganization());
			if (users == null) {
				users = new ArrayList<User>();
				users.add(user);
				result.put(user.getOrganization(), users);
			} else {
				users.add(user);
				result.put(user.getOrganization(), users);
			}
		}
		return result;
	}

	/**
	 * security使用，通过code查用户，使用了级联查询角色、权限的相关信息
	 * 
	 * @param userCode
	 *            用户账号
	 * @return
	 */
	public User getByCode(String userCode) {
		String hql = "FROM User u LEFT JOIN FETCH u.organization o LEFT JOIN FETCH u.roles r LEFT JOIN FETCH r.authorities where u.userCode=?";

		Object userObj = this.uniqueResultByHQL(hql, userCode);

		if (userObj instanceof User) {
			return (User) userObj;
		}

		return null;
	}

	/* 重置密码 */
	public List<Map<String, Object>> initPassword(String userIds) {
		List<Map<String, Object>> temp;
		try {
			String[] ids = userIds.split(",");
			for (String id : ids) {
				User user = this.get(User.class, Integer.parseInt(id));
				Md5PasswordEncoder encoder = new Md5PasswordEncoder();
				user.setUserPWD(encoder.encodePassword(
						CustomProperties.DEFAULT_PASSWORD, user.getUsername()));
				this.update(user);
			}
			temp = new ResultPostModel("result", true).getResult();
		} catch (Exception e) {
			temp = new ResultPostModel("result", false).getResult();
		}
		return temp;
	}

	/**
	 * 修改密码
	 * 
	 * @param userId
	 * @param originalPWD
	 * @param newPWD
	 * @param confirmPWD
	 */
	public Boolean updatePassword(Integer userId, String originalPWD,
			String newPWD, String confirmPWD) {
		User user = this.get(User.class, userId);
		Md5PasswordEncoder encoder = new Md5PasswordEncoder();
		String password = encoder.encodePassword(originalPWD,
				user.getUsername());
		if (password.equals(user.getPassword()) && newPWD.equals(confirmPWD)) {
			String newPassword = encoder.encodePassword(newPWD,
					user.getUsername());

			user.setUserPWD(newPassword);

			this.update(user);

			return true;
		} else {
			return false;
		}
	}

	/* 修改用户 */
	public void updateUserInfo(Integer userId, String userMail,
			String userPhone, String userIntroduction) {
		User user = this.get(User.class, userId);
		if (userMail == null || "".equals(userMail)) {
			userMail = user.getUserMail();
		}
		if (userPhone == null || "".equals(userPhone)) {
			userPhone = user.getUserPhone();
		}
		if (userIntroduction == null || "".equals(userIntroduction)) {
			userIntroduction = user.getUserIntroduction();
		}
		String hql = "UPDATE SEC_USER SET USER_MAIL = '" + userMail
				+ "', USER_PHONE ='" + userPhone + "',USER_INTRODUCTION = '"
				+ userIntroduction + "'  WHERE USER_ID = " + userId;
		this.executeSQLUpdate(hql);
	}

	public String updateUserPhoto(Integer userId, String userPhotoName) {
		String _userPhotoName = this.get(User.class, userId).getUserPhotoName();
		String hql = "UPDATE SEC_USER SET USER_PHOTO_NAME = '" + userPhotoName
				+ "' WHERE USER_ID = " + userId;
		this.executeSQLUpdate(hql);
		return _userPhotoName;
	}

	/**
	 * 添加用户
	 * 
	 * @param user
	 */
	/* 更新版本添加用户 */
	public List<Map<String, Object>> addUserService(String userName,
			String userCode, String userGender, String userType) {
		List<Map<String, Object>> temp;
		User user = SystemContext.getCurrentUser();
		Md5PasswordEncoder encoder = new Md5PasswordEncoder();
		try {
			int tmpType = 0;
			if(userType.equals("teacher")) tmpType=1;
			else if(userType.equals("student")) tmpType=2;

			if (user.getUserType() == 0 && tmpType != 0) {
				String userPWD = encoder.encodePassword(
						CustomProperties.DEFAULT_PASSWORD, userCode);

				String hql = "INSERT INTO SEC_USER(USER_CODE,USER_NAME,USER_PWD,ORGANIZATION_ID,USER_FLAG,USER_TYPE,USER_GENDER)"
						+ " values('"
						+ userCode
						+ "','"
						+ userName
						+ "','"
						+ userPWD
						+ "',"
						+ user.getOrganization().getId()
						+ ",1,'" + tmpType + "','" + userGender + "')";
				this.executeSQLUpdate(hql);
				temp = new ResultPostModel("result", true).getResult();
			} else {
				temp = new ResultPostModel("result", false).getResult();
			}
		} catch (Exception e) {
			temp = new ResultPostModel("result", false).getResult();
		}
		return temp;
	}

	/* 更新版本添加老师 */
	public void addUserTea(String userName, String userCode, String userGender,
			Integer organizationId) {

		Md5PasswordEncoder encoder = new Md5PasswordEncoder();

		String userPWD = encoder.encodePassword(
				CustomProperties.DEFAULT_PASSWORD, userCode);

		String hql = "insert INTO SEC_USER(USER_CODE,USER_NAME,USER_PWD,ORGANIZATION_ID,USER_FLAG,USER_TYPE,USER_GENDER)"
				+ " values('"
				+ userCode
				+ "','"
				+ userName
				+ "','"
				+ userPWD
				+ "'," + organizationId + ",1,1,'" + userGender + "')";

		this.executeSQLUpdate(hql);

	}

	/* 通过机构查询用户 */
	public List<User> queryByOrganization(Organization organization) {
		String hql = "from User where organization = ?";
		List<User> userList = this.find(hql, organization);
		return userList;
	}

	/**
	 * 通过机构ID查询用户
	 * 
	 * @param organizationId
	 *            机构编号
	 * @return
	 */
	public List<User> queryByOrganizationId(Integer organizationId) {
		String hql = "from User where organization.id = ?";
		List<User> userList = this.find(hql, organizationId);
		return userList;
	}

	/**
	 * 通过机构ID查询用户，{key: userId, value: User对象}
	 * 
	 * @param organizationId
	 *            机构编号
	 * @return
	 */
	public Map<Integer, User> queryByOrganizationIdToMap(Integer organizationId) {
		List<User> userList = this.queryByOrganizationId(organizationId);

		Map<Integer, User> map = new HashMap<Integer, User>();

		for (User user : userList) {
			map.put(user.getId(), user);
		}

		return map;
	}

	/* 通过机构组查询机构 */
	public List<Map<String, Object>> queryByOrganization(Integer organizationId) {
		String hql = "select user.id as id,user.userCode as userCode,user.email as email,user.userTEL as userTEL,user.userName as userName,user.wechat as wechat,organization.organizationName as organizationName from User user left join user.organization organization where organization.id =?";
		List<Map<String, Object>> userList = this.getResultByHQL(hql,
				organizationId);
		return userList;
	}

	/* 用户关联角色 */
	public void updateRelationRole(User user, List<Role> roles) {
		User sourceUser = this.get(User.class, user.getId());

		if (roles != null && roles.size() > 0) {
			Set<Role> sourceSet = new HashSet<Role>();

			for (Role role : roles) {
				Role sourceRole = roleService.get(Role.class, role.getId());

				sourceSet.add(sourceRole);
			}

			sourceUser.setRoles(sourceSet);
		} else {
			sourceUser.setRoles(null);
		}

		this.update(sourceUser);
	}

	/**
	 * 删除用户
	 * 
	 * @param user
	 */
	public void deleteUser(User user) {
		user = this.get(User.class, user.getId());

		this.delete(user);
	}

	/**
	 * 批量删除用户
	 * 
	 * @param userIds
	 */
	public void deleteBatchUser(String userIds) {
		String hql = "delete User where id in(" + userIds + ")";
		this.executeHQLUpdate(hql);

	}

	public List<Map<String,Object>> deleteUserService(String ids){
		User user = SystemContext.getCurrentUser();
		List<Map<String,Object>> temp;
		try{
			if(user.getUserType() == 0){
				String hql = "DELETE User WHERE id IN ("+ids+")";
				this.executeHQLUpdate(hql);
				temp = new ResultPostModel("result",true).getResult();
			}
			else{
				temp = new ResultPostModel("result",false).getResult();
			}
		}catch(Exception e){
			temp = new ResultPostModel("result",false).getResult();
		}
		System.out.println(temp);
		return temp;
	}

	/* 冻结用户 */
	public void updateDisabledUser(String userIds) {
		String hql = "update User set userFlag = ? where id in(" + userIds
				+ ")";
		this.executeHQLUpdate(hql, false);
	}

	/* 启用用户 */
	public void updateEnableUser(String userIds) {
		String hql = "update User set userFlag = ? where id in(" + userIds
				+ ")";
		this.executeHQLUpdate(hql, true);
	}

	public boolean isAuthorized(String authority) {
		return isAuthorized(new SimpleGrantedAuthority(authority));
	}

	/*-------------*/
	public boolean isAuthorized(GrantedAuthority authority) {
		Object principal = SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();

		return ((!(principal instanceof User)) || (!(((User) principal)
				.getAuthorities().contains(authority))));
	}

	public boolean isAuthorized(List<String> authorities) {
		Object principal = SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		if (principal instanceof User) {
			for (String authority : authorities) {
				if (!(((User) principal).getAuthorities()
						.contains(new SimpleGrantedAuthority(authority))))
					return false;
			}
		}
		return true;
	}

	public List<Map<String, Object>> queryUsersInfoByAdmin(
			Integer organizationId) {
		String hql = "select user.id as id,user.userCode as userCode,user.userName as userName,organization.organizationName as organizationName from User user left join user.organization organization where organization.id =?";
		return this.getResultByHQL(hql, organizationId);
	}

	/* 这个service写的还有所缺陷 */
	public List<Map<String, Object>> queryAllStudents(Integer organizationId) {
		String hql = "select user.userCode as userCode, user.userName as userName from User user left join user.organization organization where organization.id =? and user.userType = 2";
		return this.getResultByHQL(hql, organizationId);
	}

	/* 这个service写的还有所缺陷 */
	public List<Map<String, Object>> queryAllTeachers(Integer organizationId) {
		String hql = "select user.userCode as userCode, user.userName as userName from User user left join user.organization organization where organization.id =? and user.userType = 1";
		return this.getResultByHQL(hql, organizationId);
	}

	/*
	 * 
	 * 导入用户
	 */
	public List<Map<String, Object>> studentImport(
			List<Map<String, String>> datas, Integer organizationId) {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> failResult = new HashMap<String, Object>();
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		if (CollectionUtils.isEmpty(datas)) {
			result.put("error.empty.file", "上传的文件数据为空！");
			results.add(result);
			return results;
		}

		String hql;
		for (Map<String, String> map : datas) {
			Md5PasswordEncoder encoder = new Md5PasswordEncoder();
			hql = "insert into SEC_USER (USER_CODE,USER_NAME,USER_GENDER,USER_PWD,USER_TYPE,USER_FLAG,ORGANIZATION_ID)"
					+ "VALUES"
					+ "('"
					+ map.get("用户账号")
					+ "','"
					+ map.get("用户名")
					+ "','"
					+ map.get("性别")
					+ "','"
					+ encoder.encodePassword(CustomProperties.DEFAULT_PASSWORD,
							map.get("用户账号"))
					+ "',"
					+ 2
					+ ","
					+ 1
					+ ","
					+ organizationId + ")";
			try {
				this.executeSQLUpdate(hql);
			} catch (Exception e) {
				failResult.put("用户账户", map.get("用户账号"));
				results.add(failResult);
			}
		}
		return results;
	}

	public void addAdmin(String adminCode, String adminName) {
		Md5PasswordEncoder encoder = new Md5PasswordEncoder();
		String userPWD = encoder.encodePassword(
				CustomProperties.DEFAULT_PASSWORD, adminCode);
		String hql = "insert INTO SEC_USER(USER_CODE,USER_NAME,USER_PWD,USER_FLAG,USER_TYPE)"
				+ " values('"
				+ adminCode
				+ "','"
				+ adminName
				+ "','"
				+ userPWD
				+ "'," + "1,0)";
		this.executeSQLUpdate(hql);
	}

	public List<Map<String, Object>> queryAdminNotInOrganization() {
		String hql = "select adminId as adminId," + " adminCode as adminCode,"
				+ " adminName as adminName"
				+ " from AdminInfoView where organizationId = null";
		return this.getResultByHQL(hql);
	}

	public List<Map<String, Object>> queryAdminInOrganization(
			Integer organizationId) {
		String hql = "select adminId as adminId," + " adminCode as adminCode,"
				+ " adminName as adminName"
				+ " from AdminInfoView where organizationId = ?";
		return this.getResultByHQL(hql, organizationId);
	}

	public List<Map<String, Object>> queryUserInfo(Integer id) {
		String hql = "select userName as userName, userPhone as userPhone, userMail as userMail, userIntroduction as userIntroduction, userType as userType,userPhotoName as userPhotoName from User where id = ?";
		return this.getResultByHQL(hql, id);
	}

	public Integer updateUserPhotoService(String UserId, String photoName) {
		String sql = "UPDATE SEC_USER SET USER_PHOTO_NAME = '" + photoName
				+ "' WHERE USER_CODE = '" + UserId + "'";
		return this.executeSQLUpdate(sql);
	}

}
