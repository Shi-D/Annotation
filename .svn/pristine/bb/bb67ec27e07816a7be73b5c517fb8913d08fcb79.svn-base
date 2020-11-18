package com.framework.system.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.framework.authority.entity.User;

/**
 * 上传的附件信息,仅有附件信息
 */
@Entity
@Table(name = "ES_ACCESSORY")
public class Accessory
{
	@Id
	@GeneratedValue
	private Integer id;

	@Column(name = "FILE_NAME")
	private String fileName;// 文件名称

	@Column(name = "FILE_FORMAT")
	private String fileFormat;// 文件格式

	@Column(name = "FILE_PATH")
	private String filePath;// 文件相对路径

	@Column(name = "FILE_TYPE")
	private Integer fileType;// 文件类型，例如：控制柜竣工图类型

	@Column(name = "TOKEN_ID")
	private String tokenId;// 如果是控制柜竣工图类型，则存的是控制柜表册号

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UPLOAD_TIME")
	private Date uploadTime; // 上传时间

	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private User user; // 上传者

	@Column(name = "ORGANIZATION_ID")
	private Integer organizationId; // 机构编号

	public Accessory()
	{
	}
	
	public Accessory(Integer id)
	{
		this.id = id;
	}

	public Accessory(String fileName, String fileFormat, String filePath, Integer fileType, String tokenId, Date uploadTime, User user, Integer organizationId)
	{
		this.fileName = fileName;
		this.fileFormat = fileFormat;
		this.filePath = filePath;
		this.fileType = fileType;
		this.tokenId = tokenId;
		this.uploadTime = uploadTime;
		this.user = user;
		this.organizationId = organizationId;
	}

	public Accessory(String fileName, String fileFormat, String filePath, Integer fileType, Date uploadTime, User user, Integer organizationId)
	{
		this.fileName = fileName;
		this.fileFormat = fileFormat;
		this.filePath = filePath;
		this.fileType = fileType;
		this.uploadTime = uploadTime;
		this.user = user;
		this.organizationId = organizationId;
	}

	public Integer getId()
	{
		return id;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public String getFileName()
	{
		return fileName;
	}

	public void setFileName(String fileName)
	{
		this.fileName = fileName;
	}

	public String getFileFormat()
	{
		return fileFormat;
	}

	public void setFileFormat(String fileFormat)
	{
		this.fileFormat = fileFormat;
	}

	public String getFilePath()
	{
		return filePath;
	}

	public void setFilePath(String filePath)
	{
		this.filePath = filePath;
	}

	public Integer getFileType()
	{
		return fileType;
	}

	public void setFileType(Integer fileType)
	{
		this.fileType = fileType;
	}

	public String getTokenId()
	{
		return tokenId;
	}

	public void setTokenId(String tokenId)
	{
		this.tokenId = tokenId;
	}

	public Date getUploadTime()
	{
		return uploadTime;
	}

	public void setUploadTime(Date uploadTime)
	{
		this.uploadTime = uploadTime;
	}

	public User getUser()
	{
		return user;
	}

	public void setUser(User user)
	{
		this.user = user;
	}

	public Integer getOrganizationId()
	{
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId)
	{
		this.organizationId = organizationId;
	}

}
