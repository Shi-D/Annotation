package com.annotation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.framework.system.common.base.service.impl.BaseServiceImpl;

@Service
public class StatisticsService extends BaseServiceImpl<Object>{

	public double getAveRead(int bookNum) {
		String sql = "select StudentNum as StudentNum from StudentNumberView";
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		results = this.getResultBySQL(sql);
		Integer StudentNum = (Integer) results.get(0).get("StudentNum");
		int y = StudentNum.intValue();
		double ave;
		ave = (double)bookNum / y;
		return ave;
	}

}
