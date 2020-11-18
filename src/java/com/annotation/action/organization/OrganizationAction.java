package com.annotation.action.organization;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.service.OrganizationInfoService;
import com.framework.authority.service.UserService;
import com.framework.system.common.base.action.BaseGridAction;

public class OrganizationAction extends BaseGridAction {

	@Autowired
	private OrganizationInfoService organizationInfoService;

	@Autowired
	private UserService userService;

	private Integer organizationId;
	private Integer organizationCode;
	private String organizationName;

	private Integer adminId;
	private String adminIds;
	private String adminName;
	private String adminCode;

	private Integer pageNo;
	private Integer pageSize;
	private Boolean search;

	// 新增机构
	public String addOrganization() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			organizationInfoService.addOrganization(this.getOrganizationCode(), this.getOrganizationName());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 删除机构
	public String deleteOrganization() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			organizationInfoService.deleteOrganization(this.getOrganizationId());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 显示机构列表
	@SuppressWarnings("unchecked")
	public String organizationList() throws Exception {

		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		this.getPager().setPageNo(pageNo);
		this.getPager().setPageSize(pageSize);
		this.getPager().setSearch(search);

		String hql = "select id as organizationId," + " organizationCode as organizationCode," + " organizationName as organizationName from Organization";
		organizationInfoService.find(this.getPager(), hql, this.getFilter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		basicInfo.put("totalPage", this.getPager().getTotalPage());
		results = (List<Map<String, Object>>) this.getPager().getDataset();
		results.add(basicInfo);
		return "result>json";
	}

	// 往机构中添加管理员
	public String addAdminToOrganization() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			organizationInfoService.addAdminToOrganization(this.getOrganizationId(), this.getAdminIds());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 从机构中移除管理员
	public String removeAdminFromOrganization() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			organizationInfoService.removeAdminFromOrganization(this.getAdminIds());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 新增管理员
	public String addAdmin() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			userService.addAdmin(this.getAdminCode(), this.getAdminName());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 删除管理员
	public String deleteAdmin() throws Exception {
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		try {
			userService.deleteBatchUser(this.getAdminIds());
			basicInfo.put("status", "ok");
		} catch (Exception e) {
			basicInfo.put("status", "error");
		}
		results.add(basicInfo);
		return "result>json";
	}

	// 显示管理员列表
	@SuppressWarnings("unchecked")
	public String adminList() throws Exception {

		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();
		this.getPager().setPageNo(pageNo);
		this.getPager().setPageSize(pageSize);
		this.getPager().setSearch(search);

		String hql = "select adminId as adminId," + "adminCode as adminCode," + "adminName as adminName," + "organizationId as adminOrganizationId," + "adminCreationTime as adminCreationTime,"
				+ "organizationCode as adminOrganizationCode," + "organizationName as adminOrganizationName" + " from AdminInfoView";
		userService.find(this.getPager(), hql, this.getFilter());
		basicInfo.put("totalCount", this.getPager().getTotalCount());
		basicInfo.put("totalPage", this.getPager().getTotalPage());
		results = (List<Map<String, Object>>) this.getPager().getDataset();
		results.add(basicInfo);
		return "result>json";
	}

	public Integer getOrganizationCode() {
		return organizationCode;
	}

	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	public void setOrganizationCode(Integer organizationCode) {
		this.organizationCode = organizationCode;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
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

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public String getAdminCode() {
		return adminCode;
	}

	public void setAdminCode(String adminCode) {
		this.adminCode = adminCode;
	}

	public Integer getAdminId() {
		return adminId;
	}

	public void setAdminId(Integer adminId) {
		this.adminId = adminId;
	}

	public String getAdminIds() {
		return adminIds;
	}

	public void setAdminIds(String adminIds) {
		this.adminIds = adminIds;
	}

}