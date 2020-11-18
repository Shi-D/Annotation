package com.framework.common;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;


public class ResultPostModel implements List<Map<String, Object>> {

	private List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
	private HashMap<String, Object> baseInfo;
	//无参构造方法
	public ResultPostModel() {
		
	}
	//有参构造方法 key val
	public ResultPostModel(String key,Object flag){
		baseInfo = new HashMap<String,Object>();
		baseInfo.put(key,flag);
		this.result.add(baseInfo);
	}
	//有参构造方法 后面那个Object参数可省
	public ResultPostModel(List<Map<String, Object>> result,Object...element){
		this.result = result;
		baseInfo = new HashMap<String,Object>();
		for(int i = 0;i<element.length;i++){
			baseInfo.put((String) element[i],element[++i]);
		}
		this.result.add(baseInfo);
	}
	//有参构造方法
	public ResultPostModel(Object...element){
		baseInfo = new HashMap<String,Object>();
		for(int i = 0;i<element.length;i++){
			baseInfo.put((String) element[i],element[++i]);
		}
		this.result.add(baseInfo);
	}
	
	//通过key val给result添加内容，必须偶数 
	public void addResult(Object...element){
		baseInfo = new HashMap<String,Object>();
		for(int i = 0;i<element.length;i++){
			baseInfo.put((String) element[i],element[++i]);
		}
		this.result.add(baseInfo);
	}
	//向map中插入内容
	public void insertListMap(Integer i,Object...element){
		for(int k = 0;k < element.length;k++){
			result.get(i).put((String) element[k], element[++k]);
		}
	}
	public List<Map<String, Object>> getResult() {
		return result;
	}
	public void setResult(List<Map<String, Object>> result) {
		this.result = result;
	}
	public HashMap<String, Object> getBaseInfo() {
		return baseInfo;
	}
	public void setBaseInfo(HashMap<String, Object> baseInfo) {
		this.baseInfo = baseInfo;
	}
	
	@Override
	public int size() {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public boolean isEmpty() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean contains(Object o) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public Iterator<Map<String, Object>> iterator() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Object[] toArray() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public <T> T[] toArray(T[] a) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public boolean add(Map<String, Object> e) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean remove(Object o) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean containsAll(Collection<?> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean addAll(Collection<? extends Map<String, Object>> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean addAll(int index, Collection<? extends Map<String, Object>> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean removeAll(Collection<?> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean retainAll(Collection<?> c) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public void clear() {
		// TODO Auto-generated method stub
		
	}
	@Override
	public Map<String, Object> get(int index) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Map<String, Object> set(int index, Map<String, Object> element) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public void add(int index, Map<String, Object> element) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public Map<String, Object> remove(int index) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public int indexOf(Object o) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public int lastIndexOf(Object o) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public ListIterator<Map<String, Object>> listIterator() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public ListIterator<Map<String, Object>> listIterator(int index) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<Map<String, Object>> subList(int fromIndex, int toIndex) {
		// TODO Auto-generated method stub
		return null;
	}
}
