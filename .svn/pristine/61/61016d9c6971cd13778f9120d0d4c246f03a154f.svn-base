package com.annotation.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.annotation.entity.Books;
import com.framework.system.common.base.service.impl.BaseServiceImpl;

@Service

public class UploadService extends BaseServiceImpl<Books>{

	/**
	 * 根据上传的内容存入数据库
	 */
	public void addBooksInfo(String bookName,String bookAuthor,String bookIntroduction,
			String bookCover,Integer bookPage,String outputTxt,String teacherCode,
			String teacherName,Date date) throws Exception {
		
		/*String hql = "insert into ANNOTATION_BOOKTEST (BOOK_CONTENT) values (\' " +outputTxt + " \' )";
		System.out.println(hql);
		this.executeHQLUpdate(hql);*/
		Books book = new Books();
		book.setBookName(bookName);
		book.setBookAuthor(bookAuthor);
		book.setBookIntroduction(bookIntroduction);
		book.setBookCover(bookCover);
		book.setBookPage(bookPage);
		book.setBookContent(outputTxt);
		book.setCreateTime(date);
		book.setTeacherCode(teacherCode);
		book.setTeacherName(teacherName);
		try{
			save(book);
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		
	}
	
}
