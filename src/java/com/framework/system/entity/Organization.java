package com.framework.system.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "T_ORGANIZATION")
public class Organization implements Serializable
{
	private static final long serialVersionUID = 1L;

	/** 表或者视图编号，人为设定 */
	public static final Integer TABLE_CODE = 10012;
	
	private Integer id;
	private Integer organizationCode;
	private Integer organizationOrder;
	private String organizationName;

	public Organization()
	{
	}

	public Organization(Integer id, String organizationName)
	{
		this.id = id;
		this.organizationName = organizationName;
	}

	/**
	 * 更新自身数据
	 * 
	 * @param organization
	 */
	public void update(Organization organization)
	{
		this.organizationOrder = organization.getOrganizationOrder();
		this.organizationName = organization.getOrganizationName();
	}

	@Id
	@Column(name = "ORGANIZATION_ID")
	public Integer getId()
	{
		return this.id;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	@Column(name = "ORGANIZATION_CODE", length = 20, nullable = false)
	public Integer getOrganizationCode()
	{
		return this.organizationCode;
	}

	public void setOrganizationCode(Integer organizationCode)
	{
		this.organizationCode = organizationCode;
	}

	@Column(name = "ORGANIZATION_NAME", length = 50)
	public String getOrganizationName()
	{
		return this.organizationName;
	}

	public void setOrganizationName(String organizationName)
	{
		this.organizationName = organizationName;
	}

	@Column(name = "ORGANIZATION_ORDER", precision = 3, scale = 0)
	public Integer getOrganizationOrder()
	{
		return this.organizationOrder;
	}

	public void setOrganizationOrder(Integer organizationOrder)
	{
		this.organizationOrder = organizationOrder;
	}

}
