package com.framework.authority.entity;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.framework.system.entity.Organization;

@SuppressWarnings({ "rawtypes", "unchecked", "serial" })
@Entity
@Table(name = "SEC_USER")
@NamedQueries({ @javax.persistence.NamedQuery(name = "getUserByLoginName", query = "select u from User u where u.userCode = :userCode") })
public class User implements UserDetails {
	private Integer id;
	private String userCode;
	private String userName;
	private String userPWD;
	private String userTEL;
	private String userMail;
	private String userADDR;
	private Boolean userFlag;
	private Integer userType;
	private String userGender;
	private Organization organization;
	private String userIntroduction;
	private Integer organizationId;
	private String userPhone;
	private String userPhotoName;
	private Set<Role> roles = new LinkedHashSet();
	@Transient
	private Collection<GrantedAuthority> authorities; // 权限变量

	public User() {
	}

	public User(String userCode, String userName) {
		this.userCode = userCode;
		this.userName = userName;
	}

	@Id
	@Column(name = "USER_ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "USER_CODE", length = 20, nullable = false, unique = true)
	public String getUserCode() {
		return this.userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	@Column(name = "USER_NAME", length = 10)
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	@Column(name = "USER_PHONE")
	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	@Column(name = "USER_PHOTO_NAME")
	public String getUserPhotoName() {
		return userPhotoName;
	}

	public void setUserPhotoName(String userPhotoName) {
		this.userPhotoName = userPhotoName;
	}

	@Column(name = "USER_PWD", length = 32, nullable = false)
	public String getUserPWD() {
		return this.userPWD;
	}

	public void setUserPWD(String userPWD) {
		this.userPWD = userPWD;
	}

	@Column(name = "USER_TEL", length = 20)
	public String getUserTEL() {
		return this.userTEL;
	}

	public void setUserTEL(String userTEL) {
		this.userTEL = userTEL;
	}

	@Column(name = "USER_MAIL", length = 60)
	public String getUserMail() {
		return this.userMail;
	}

	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}

	@Column(name = "USER_ADDR", length = 120)
	public String getUserADDR() {
		return this.userADDR;
	}

	public void setUserADDR(String userADDR) {
		this.userADDR = userADDR;
	}

	@Column(name = "USER_FLAG", precision = 1, scale = 0, nullable = false)
	public Boolean getUserFlag() {
		return this.userFlag;
	}

	public void setUserFlag(Boolean userFlag) {
		this.userFlag = userFlag;
	}

/*	@Column(name = "IS_APP_USER", precision = 1, scale = 0, nullable = false)
	public Boolean isAppUser() {
		return isAppUser;
	}

	public void setAppUser(Boolean isAppUser) {
		this.isAppUser = isAppUser;
	}*/
	
	@Column(name = "USER_TYPE", precision = 1, scale = 0, nullable = false)
	public Integer getUserType() {
		return userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}


	@Column(name = "USER_GENDER",length = 5)
	public String getUserGender() {
		return userGender;
	}

	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}

	@Column(name = "USER_INTRODUCTION",length = 200)
	public String getUserIntroduction() {
		return userIntroduction;
	}

	public void setUserIntroduction(String userIntroduction) {
		this.userIntroduction = userIntroduction;
	}
	@Column(name = "ORGANIZATIONID")
	public Integer getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@Fetch(FetchMode.JOIN)
	@JoinColumn(name = "ORGANIZATION_ID")
	@NotFound(action = NotFoundAction.IGNORE)
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.LAZY)
	@JoinTable(name = "SEC_USER_ROLES", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
	@OrderBy("id")
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public Set<Role> getRoles() {
		return this.roles;
	}

	/*public Boolean getIsAppUser() {
		return isAppUser;
	}

	public void setIsAppUser(Boolean isAppUser) {
		this.isAppUser = isAppUser;
	}*/

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	// 以下部分是由 spring-security 框架调用的
	@Transient
	public Collection<GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Transient
	public void setAuthorities(Collection<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Transient
	public String getPassword() {
		return this.userPWD;
	}

	@Transient
	public String getUsername() {
		return this.userCode;
	}

	@Transient
	public boolean isAccountNonExpired() {
		return true;
	}

	@Transient
	public boolean isAccountNonLocked() {
		return true;
	}

	@Transient
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Transient
	public boolean isEnabled() {
		return this.userFlag.booleanValue();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((userCode == null) ? 0 : userCode.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (userCode == null) {
			if (other.userCode != null)
				return false;
		} else if (!userCode.equals(other.userCode))
			return false;
		return true;
	}

	

}