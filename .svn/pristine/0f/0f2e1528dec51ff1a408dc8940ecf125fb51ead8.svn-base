package com.annotation.service;


import org.springframework.stereotype.Service;

import com.framework.system.common.base.service.impl.BaseServiceImpl;
import com.framework.system.entity.Organization;

@Service
public class OrganizationInfoService extends BaseServiceImpl<Organization> {

	public void addOrganization(Integer organizationCode, String organizationName) {
		String hql = "insert into T_ORGANIZATION (ORGANIZATION_CODE, ORGANIZATION_NAME) VALUES (?, ?)";
		this.executeSQLUpdate(hql, organizationCode, organizationName);
	}

	public void deleteOrganization(Integer organizationId) {
		String hql = "delete from T_ORGANIZATION where ORGANIZATION_ID = ?";
		this.executeSQLUpdate(hql, organizationId);
	}

	public void addAdminToOrganization(Integer organizationId, String adminIds) {
		String hql = "update SEC_USER set ORGANIZATION_ID = ? where USER_ID in (?)";
		this.executeSQLUpdate(hql, organizationId, adminIds);
	}

	public void removeAdminFromOrganization(String adminIds) {
		String hql = "update SEC_USER set ORGANIZATION_ID = NULL where USER_ID in (?)";
		this.executeSQLUpdate(hql, adminIds);
	}
	
	
}