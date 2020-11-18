package com.framework.authority.action;

import com.framework.authority.entity.User;
import com.framework.common.SystemContext;
import com.framework.system.common.base.action.BaseAction;

public class LoginAction extends BaseAction {

	private static final long serialVersionUID = -8357649612172585316L;

	/* 用户验证登录 */
	public String login() {
	
		User user = SystemContext.getCurrentUser();
		if (user != null ) {
			if(user.getUserType() == 0)
				return "admin";
			else if(user.getUserType() ==1)
				return "teacher";
			else if(user.getUserType() ==2)
				return "student";
			else if(user.getUserType() ==3)
				return "Administrator";
			else{
				return ERROR;
			}
		} else {
			return ERROR;
		}
		
	}
}
