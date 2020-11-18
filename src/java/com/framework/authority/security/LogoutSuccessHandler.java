package com.framework.authority.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import com.framework.authority.entity.User;
import com.framework.system.service.log.LoginLogService;

public class LogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler
{
	private static Logger logger = LoggerFactory.getLogger(LogoutSuccessHandler.class);

	@Autowired
	private LoginLogService loginLogService;

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException
	{
		HttpSession session = request.getSession();

		session.invalidate();

		User user = (User) authentication.getPrincipal();

		loginLogService.logoutLog(user);

		logger.info("注销成功[用户名：{}，姓名：{}，机构：{}，IP：{}]", user.getUserCode(), user.getUserName(), user.getOrganization().getOrganizationName(), request.getRemoteAddr());

		super.onLogoutSuccess(request, response, authentication);
	}
}
