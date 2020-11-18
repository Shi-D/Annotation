package com.framework.system.common.base.service.impl;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.DetachedCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Service;

import com.framework.system.common.base.dao.IBaseHibernateDao;
import com.framework.system.common.base.service.IBaseService;
import com.framework.system.common.entity.FilterSearch;
import com.framework.system.common.entity.Pager;
import com.framework.system.common.entity.SearchRule;
import com.framework.system.common.entity.Sorter;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Service
public class BaseServiceImpl<T> implements IBaseService<T> {
	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private IBaseHibernateDao<T> baseHibernateDao;

	
	private HibernateTemplate hibernateTemplate;

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	@Override
	public void merge(T entity) {
		this.baseHibernateDao.merge(entity);
	}

	@Override
	public void flush() {
		this.baseHibernateDao.flush();
	}

	@Override
	public void clear() {
		this.baseHibernateDao.clear();
	}

	@Override
	public void evict(T entity) {
		this.baseHibernateDao.evict(entity);
	}

	@Override
	public void save(T entity) {
		this.baseHibernateDao.save(entity);
	}

	@Override
	public void saveOrUpdate(T entity) {
		this.baseHibernateDao.saveOrUpdate(entity);
	}

	@Override
	public void saveOrUpdateAll(Collection<T> entities) {
		this.baseHibernateDao.saveOrUpdateAll(entities);
	}

	@Override
	public void update(T entity) {
		this.baseHibernateDao.update(entity);
	}

	@Override
	public void delete(T entity) {
		this.baseHibernateDao.delete(entity);
	}

	@Override
	public T get(Class<T> clazz, Serializable id) {
		return this.baseHibernateDao.get(clazz, id);
	}

	@Override
	public T load(Class<T> clazz, Serializable id) {
		return this.baseHibernateDao.load(clazz, id);
	}

	@Override
	public List<T> loadAll(Class<T> clazz) {
		return this.baseHibernateDao.loadAll(clazz);
	}

	@Override
	public List<T> findAll(Class<T> clazz) {
		return this.baseHibernateDao.find("from " + clazz.getName());
	}

	@Override
	public Integer getTotalCountByHQL(String hql, Object... params) {
		return this.baseHibernateDao.getTotalCountByHQL(hql, params);
	}

	@Override
	public Integer getTotalCountByHQL(String hql, Map<Object, Object> params) {
		return this.baseHibernateDao.getTotalCountByHQL(hql, params);
	}

	@Override
	public Integer getTotalCountBySQL(String sql, Object... params) {
		return this.baseHibernateDao.getTotalCountBySQL(sql, params);
	}

	@Override
	public Integer getTotalCountBySQL(String sql, Map<Object, Object> params) {
		return this.baseHibernateDao.getTotalCountBySQL(sql, params);
	}

	@Override
	public int executeHQLUpdate(String hql, Object... params) {
		return this.baseHibernateDao.executeHQLUpdate(hql, params);
	}

	@Override
	public int executeHQLUpdate(String hql, Map<Object, Object> params) {
		return this.baseHibernateDao.executeHQLUpdate(hql, params);
	}

	@Override
	public List<T> executeHQLQuery(String hql, Object... params) {
		return this.baseHibernateDao.executeHQLQuery(hql, params);
	}

	@Override
	public List<T> executeHQLQuery(String hql, Map<Object, Object> params) {
		return this.baseHibernateDao.executeHQLQuery(hql, params);
	}

	@Override
	public int executeSQLUpdate(final String sql, final Object... params) {
		return this.baseHibernateDao.executeSQLUpdate(sql, params);
	}

	@Override
	public int executeSQLUpdate(String sql, Map<Object, Object> params) {
		return this.baseHibernateDao.executeSQLUpdateByNamed(sql, params);
	}

	@Override
	public List<Object[]> executeSQLQuery(String sql, Object... params) {
		return this.baseHibernateDao.executeSQLQuery(sql, params);
	}

	@Override
	public List<Object[]> executeSQLQueryByNamed(final String sql,
			final Map<Object, Object> params) {
		return this.baseHibernateDao.executeSQLQueryByNamed(sql, params);
	}

	public List<T> find(String hql, Object... params) {
		return this.baseHibernateDao.find(hql, params);
	}

	@Override
	public List<T> findByNamedParam(String hql, String paramName, Object value) {
		return this.baseHibernateDao.findByNamedParam(hql, paramName, value);
	}

	@Override
	public List<T> findByNamedParam(String hql, String[] paramNames,
			Object[] values) {
		return this.baseHibernateDao.findByNamedParam(hql, paramNames, values);
	}

	@Override
	public List<T> findByNamedParam(String hql, Map<Object, Object> params) {
		return this.baseHibernateDao.findByNamedParam(hql, params);
	}

	@Override
	public List<T> findByNamedQuery(String queryName) {
		return this.baseHibernateDao.findByNamedQuery(queryName);
	}

	@Override
	public List<T> findByNamedQuery(String queryName, Object value) {
		return this.baseHibernateDao.findByNamedQuery(queryName, value);
	}

	@Override
	public List<T> findByNamedQuery(String queryName, Object[] values) {
		return this.baseHibernateDao.findByNamedQuery(queryName, values);
	}

	@Override
	public List<T> findByNamedQueryAndNamedParam(String queryName,
			String paramName, Object value) {
		return this.baseHibernateDao.findByNamedQueryAndNamedParam(queryName,
				paramName, value);
	}

	@Override
	public List<T> findByNamedQueryAndNamedParam(String queryName,
			String[] paramNames, Object[] values) {
		return this.baseHibernateDao.findByNamedQueryAndNamedParam(queryName,
				paramNames, values);
	}

	public List<Map<String, Object>> findBySQL(String sql, Object... params) {
		return this.baseHibernateDao.getResultBySQL(sql, params);
	}

	public IBaseHibernateDao<T> getBaseHibernateDao() {
		return baseHibernateDao;
	}

	public void setBaseHibernateDao(IBaseHibernateDao<T> baseHibernateDao) {
		this.baseHibernateDao = baseHibernateDao;
	}

	public void updateState(HibernateCallback action) {
		this.getHibernateTemplate().execute(action);
	}

	public List<T> findByCriteria(DetachedCriteria criteria) {
		return this.baseHibernateDao.findByCriteria(criteria);
	}

	public <E> E queryByHql(HibernateCallback<E> action) {
		return this.getHibernateTemplate().execute(action);
	}

	@Override
	public Query getHQLQuery(String hql, Object... params) {
		return this.baseHibernateDao.getHQLQuery(hql, params);
	}

	@Override
	public Query getHQLQuery(String hql, Map<Object, Object> params) {
		return this.baseHibernateDao.getHQLQuery(hql, params);
	}

	@Override
	public SQLQuery getSQLQuery(String sql, Object... params) {
		return this.baseHibernateDao.getSQLQuery(sql, params);
	}

	@Override
	public SQLQuery getSQLQuery(String sql, Map<Object, Object> params) {
		return this.baseHibernateDao.getSQLQuery(sql, params);
	}

	@Override
	public List<Map<String, Object>> getResultByHQL(String hql,
			Object... params) {
		return this.baseHibernateDao.getResultByHQL(hql, params);
	}

	@Override
	public List<Map<String, Object>> getResultByHQL(String hql,
			Map<Object, Object> params) {
		return this.baseHibernateDao.getResultByHQL(hql, params);
	}

	@Override
	public List<Map<String, Object>> getResultBySQL(String sql,
			Object... params) {
		return this.baseHibernateDao.getResultBySQL(sql, params);
	}

	@Override
	public List<Map<String, Object>> getResultBySQL(String sql,
			Map<Object, Object> params) {
		return this.baseHibernateDao.getResultBySQL(sql, params);
	}

	/**
	 * 获取属性全名与属性别名的映射集合
	 * 
	 * @param hql
	 *            关系根据hql语句中as关系确定 select mainEntity.ID as
	 *            ID,mainEntity.inforValue as inforValue,mainEntity.inforType as
	 *            inforType, customer.ID as customerID from BasicInfor as
	 *            mainEntity。。。 属性全名mainEntity.ID-属性别名ID
	 *            属性全名mainEntity.inforValue-属性别名inforValue
	 *            属性全名mainEntity.inforType -属性别名inforType
	 * 
	 * @return
	 */
	private Map<String, String> getObjectPropertyFullNameOtherNameMap(String hql) {
		try {
			String propertyHql = hql.substring(hql.indexOf("select ") + 7,
					hql.indexOf(" from "));
			if (propertyHql == null) {
				return null;
			}
			String[] splitByComma = propertyHql.split(",");// 将select .... from
															// 间的字符串以','分成数组;
			Map<String, String> map = new HashMap<String, String>();
			for (int i = 0; i < splitByComma.length; i++) {
				try {
					String str = splitByComma[i];
					String propertyFullName = str.substring(0,
							str.indexOf(" as ")).trim();
					String otherName = str.substring(str.indexOf(" as ") + 4)
							.trim();
					map.put(otherName, propertyFullName);
				} catch (Exception e) {
				}
			}
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			return new HashMap<String, String>();
		}
	}

	/**
	 * @param prefix
	 *            前缀、别名 根据conditions转换成sql格式 根据条件拼装SQL语句（只限于where之后的条件，不包括where）
	 */
	private String tranToSQL(Map<String, String> propertyMap,
			FilterSearch filterSearch) {
		StringBuilder sb = new StringBuilder("");
		if (null != filterSearch && filterSearch.getRules() != null) {
			List<SearchRule> rules = filterSearch.getRules();
			int count = 0;
			if (null != rules && (count = rules.size()) > 0) {
				for (SearchRule rule : rules) {
					if (null != rule.getField() && null != rule.getData()
							&& null != rule.getOp()) {
						/*
						 * 如果有前缀，则把前缀加上，每个条件都会需要前缀 有些查询条件属性全名可能为空，就以查询时的字段名
						 */
						String 属性全名 = propertyMap.get(rule.getField());
						sb.append((属性全名 == null || 属性全名.indexOf("(") != -1) ? rule
								.getField() : 属性全名);

						// 过滤掉字符串两端空格
						rule.setData(rule.getData().trim());
						/* 等于 */
						if ("eq".equalsIgnoreCase(rule.getOp())) {
							sb.append(" = ").append("'").append(rule.getData())
									.append("'");
							/* 不等于 */
						} else if ("ne".equalsIgnoreCase(rule.getOp())) {
							sb.append(" != ").append("'")
									.append(rule.getData()).append("'");
							/* 小于 */
						} else if ("lt".equalsIgnoreCase(rule.getOp())) {
							sb.append(" < ").append("'").append(rule.getData())
									.append("'");
							/* 小于等于 */
						} else if ("le".equalsIgnoreCase(rule.getOp())) {
							sb.append(" <= ").append("'")
									.append(rule.getData()).append("'");
							/* 大于 */
						} else if ("gt".equalsIgnoreCase(rule.getOp())) {
							sb.append(" > ").append("'").append(rule.getData())
									.append("'");
							/* 大于等于 */
						} else if ("ge".equalsIgnoreCase(rule.getOp())) {
							sb.append(" >= ").append("'")
									.append(rule.getData()).append("'");
							/* 开始于 */
						} else if ("bw".equalsIgnoreCase(rule.getOp())) {
							sb.append(" like ").append("'")
									.append(rule.getData()).append("%")
									.append("'");
							/* 不开始于 */
						} else if ("bn".equalsIgnoreCase(rule.getOp())) {
							sb.append(" not like ").append("'")
									.append(rule.getData()).append("%")
									.append("'");
							/* 结束于 */
						} else if ("ew".equalsIgnoreCase(rule.getOp())) {
							sb.append(" like ").append("'").append("%")
									.append(rule.getData()).append("'");
							/* 不结束于 */
						} else if ("en".equalsIgnoreCase(rule.getOp())) {
							sb.append(" not like ").append("'").append("%")
									.append(rule.getData()).append("'");
							/* 包含于 */
						} else if ("cn".equalsIgnoreCase(rule.getOp())) {
							String data = rule.getData();
							if (data.contains("[")) {
								data = data.replaceAll("\\[", "[[]");
							}
							sb.append(" like ").append("'").append("%")
									.append(data).append("%").append("'");
							/* 不包含于 */
						} else if ("nc".equalsIgnoreCase(rule.getOp())) {
							sb.append(" not like ").append("'").append("%")
									.append(rule.getData()).append("%")
									.append("'");
						} else if ("in".equalsIgnoreCase(rule.getOp())) {
							sb.append(" in ").append("(")
									.append(rule.getData()).append(")");
						} else if ("is".equalsIgnoreCase(rule.getOp())) {
							sb.append(" is ").append(rule.getData());
						} else {

						}
						count--;
						if (count > 0) {
							if (null != filterSearch.getGroupOp()) {
								if (filterSearch.getGroupOp().toLowerCase()
										.equals("and")) {
									sb.append(" and ");
								} else {
									sb.append(" or ");
								}
							}
						}
					}
				}
			}
		}
		return sb.toString();
	}

	/**
	 * 返回未添加 order by的hql
	 * 
	 * @param filter
	 * @param jqgridID
	 * @return
	 */
	public StringBuilder getUnSortedHQL(FilterSearch filter, String basehql) {
		StringBuilder hql = new StringBuilder(basehql);
		/* 获取属性全名与别名关系集合 */
		Map<String, String> propertyMap = getObjectPropertyFullNameOtherNameMap(hql
				.toString());
		/* 拼装查询条件 */
		String tranSql = tranToSQL(propertyMap, filter);
		if (tranSql.length() > 5) {
			if (hql.indexOf(" where ") != -1) {
				if (hql.toString().contains("@")) {
					String temp = hql.toString();
					int index = temp.indexOf("@");
					temp = temp.substring(0, index) + " and " + tranSql + " "
							+ temp.substring(index + 1, temp.length());
					hql = new StringBuilder(temp);
				} else {
					if (this.checkCondition(hql.toString())) {
						String temp = hql.toString();
						int index = temp.indexOf("group by");
						temp = temp.substring(0, index) + " and " + tranSql
								+ " " + temp.substring(index, temp.length());
						hql = new StringBuilder(temp);
					} else if (hql.indexOf("order by") != -1) {
						String temp = hql.toString();
						int index = temp.indexOf("order by");
						temp = temp.substring(0, index) + " and " + tranSql
								+ " " + temp.substring(index, temp.length());
						hql = new StringBuilder(temp);
					} else {
						hql.append(" and ").append(tranSql).append(" ");
					}
				}
			} else {
				if (this.checkCondition(hql.toString())) {
					String temp = hql.toString();
					int index = temp.indexOf("group by");
					temp = temp.substring(0, index) + " where " + tranSql + " "
							+ temp.substring(index, temp.length());
					hql = new StringBuilder(temp);
				} else if (hql.indexOf("order by") != -1) {
					String temp = hql.toString();
					int index = temp.indexOf("order by");
					temp = temp.substring(0, index) + " where " + tranSql + " "
							+ temp.substring(index, temp.length());
					hql = new StringBuilder(temp);
				} else {
					hql.append(" where ").append(tranSql);
				}
			}
		} else {
			if (hql.toString().contains("@")) {
				String temp = hql.toString();
				int index = temp.indexOf("@");
				temp = temp.substring(0, index)
						+ temp.substring(index + 1, temp.length());
				hql = new StringBuilder(temp);
			}
		}
		return hql;
	}

	private Boolean checkCondition(String hql) {
		if (hql.contains("group by")) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @param page
	 * @param basehql
	 *            //最原始的hql
	 * @param filter
	 *            //参数
	 * @return 返回page对象
	 */
	public Pager find(Pager page, String basehql, FilterSearch filter) {
		StringBuilder hql = null;

		try {
			hql = getUnSortedHQL(filter, basehql);
		} catch (Exception e) {
			return page;
		}

		/* 获取总记录数 */
		page.setTotalCount(this.getTotalCountByHQL(hql.toString()));
		page.setTotalPage((page.getTotalCount() - 1) / page.getPageSize() + 1);

		/* 在hql语句中加入排序相关字段 */
		if (filter != null) {
			List<Sorter> sorters = filter.getSorters();

			if (sorters != null && sorters.size() > 0) {
				StringBuilder orderBy = null;

				if (hql.indexOf("order by") == -1) {
					orderBy = new StringBuilder(" order by ");
				} else {
					orderBy = new StringBuilder(",");
				}

				for (Sorter sorter : sorters) {
					String property = sorter.getProperty();
					String direction = sorter.getDirection();

					if (property != null && !"".equals(property)
							&& direction != null && !"".equals(direction)) {
						orderBy.append(property).append(" ").append(direction)
								.append(",");
					}
				}

				orderBy.deleteCharAt(orderBy.length() - 1);

				hql.append(orderBy);
			}
		}

		Query query = this.getHQLQuery(hql.toString());
		int pageNo = page.getPageNo();
		int pageSize = page.getPageSize();
		query.setFirstResult((pageNo - 1) * pageSize);
		query.setMaxResults(pageSize);

		List<Map<String, Object>> result = query.setResultTransformer(
				Criteria.ALIAS_TO_ENTITY_MAP).list();
		page.setDataset(result);
		return page;
	}

	/**
	 * @param page
	 * @param basehql
	 *            //最原始的hql
	 * @param filter
	 *            //参数
	 * @return 返回page对象
	 */
	public List<Map<String, Object>> find(String basehql, FilterSearch filter) {
		StringBuilder hql = null;

		try {
			hql = getUnSortedHQL(filter, basehql);
		} catch (Exception e) {
			return null;
		}

		/* 在hql语句中加入排序相关字段 */
		if (filter != null) {
			List<Sorter> sorters = filter.getSorters();

			if (sorters != null && sorters.size() > 0) {
				StringBuilder orderBy = null;

				if (hql.indexOf("order by") == -1) {
					orderBy = new StringBuilder(" order by ");
				} else {
					orderBy = new StringBuilder(",");
				}

				for (Sorter sorter : sorters) {
					String property = sorter.getProperty();
					String direction = sorter.getDirection();

					if (property != null && !"".equals(property)
							&& direction != null && !"".equals(direction)) {
						orderBy.append(property).append(" ").append(direction)
								.append(",");
					}
				}

				orderBy.deleteCharAt(orderBy.length() - 1);

				hql.append(orderBy);
			}
		}

		Query query = this.getHQLQuery(hql.toString());

		List<Map<String, Object>> result = query.setResultTransformer(
				Criteria.ALIAS_TO_ENTITY_MAP).list();
		return result;
	}

	@Override
	public Object uniqueResultByHQL(String hql, Object... params) {
		return this.baseHibernateDao.uniqueResultByHQL(hql, params);
	}

	@Override
	public Object uniqueResultByHQL(String hql, Map<Object, Object> params) {
		return this.baseHibernateDao.uniqueResultByHQL(hql, params);
	}

	@Override
	public Object uniqueResultBySQL(String sql, Object... params) {
		return this.baseHibernateDao.uniqueResultBySQL(sql, params);
	}

	@Override
	public Object uniqueResultBySQL(String sql, Map<Object, Object> params) {
		return this.baseHibernateDao.uniqueResultBySQL(sql, params);
	}

	/**
	 * 获得符合条件的实体集合 通过增加条件参数对结果集进行筛选 通过在hql中设置排序字段与方式对结果集进行排序
	 * 
	 * @param hql
	 *            查询语句 eg:hql="from User u where u.sex=? order by u.name desc"
	 * @param params
	 *            条件参数 eg:params={"man"}
	 * @param firstResult
	 *            要获取记录集的开始条数 eg:firstResult=10
	 * @param maxResult
	 *            要获取记录集的最大条数 eg:maxResult=20
	 * @return 查询结果集
	 */
	public List<?> getEntityListByHQL(String hql, Integer firstResult,
			Integer maxResult, Object... params) {
		Query query = getHQLQuery(hql, params);
		if (firstResult != null)
			query.setFirstResult(firstResult);
		if (maxResult != null)
			query.setMaxResults(maxResult);
		return query.list();
	}

	/**
	 * 判断数据库中是否存在指定的表，仅用于SQL SERVER数据库
	 * 
	 * @param tableName
	 * @throws Exception
	 */
	public boolean existsTable(String tableName) throws Exception {
		return this.baseHibernateDao.existsTable(tableName);
	}
}
