package com.annotation.action.File;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.annotation.service.UploadService;
import com.annotation.utils.GetCharest;
import com.framework.authority.entity.User;
import com.framework.common.SystemContext;
import com.framework.constants.UpdateResources;
import com.framework.system.common.base.action.BaseGridAction;

public class uploadAction extends BaseGridAction {

	@Autowired
	UploadService uploadService;

	User user;
	private static final long serialVersionUID = 1L;
	// 对应表单的fileTxt <input type="fileTxt" name="fileTxt"/>
	private File fileTxt;
	// 获得封面图片
	private File filePic;

	// 当前上传的文件名
	private String fileTxtFileName;

	private String filePicFileName;

	// 文件类型(MIME)
	private String fileTxtContentType;

	private String filePicContentType;

	private String bookName = "未知";
	private String bookAuthor = "未知";
	private String bookIntroduction = "暂无";
	private String bookCover = "www...";
	private Integer bookPage = 100;

	public File getFilePic() {
		return filePic;
	}

	public void setFilePic(File filePic) {
		this.filePic = filePic;
	}

	public File getFileTxt() {
		return fileTxt;
	}

	public void setFileTxt(File fileTxt) {
		this.fileTxt = fileTxt;
	}

	public String getFilePicFileName() {
		return filePicFileName;
	}

	public void setFilePicFileName(String filePicFileName) {
		this.filePicFileName = filePicFileName;
	}

	public String getFilePicContentType() {
		return filePicContentType;
	}

	public void setFilePicContentType(String filePicContentType) {
		this.filePicContentType = filePicContentType;
	}

	public String getFileTxtFileName() {
		return fileTxtFileName;
	}

	public void setFileTxtFileName(String fileTxtFileName) {
		this.fileTxtFileName = fileTxtFileName;
	}

	public String getFileTxtContentType() {
		return fileTxtContentType;
	}

	public void setFileTxtContentType(String fileTxtContentType) {
		this.fileTxtContentType = fileTxtContentType;
	}

	/**
	 * 已弃用。 将文件转换为String，这里我通过获得文件的编码类型动态地改变了encoding方式。原始版本,无法自己操作每一句
	 * 
	 * @param fileName
	 *            文件名，读入上传文件的文件名
	 * @return 将文件转换为字符串
	 */
	public static String readToString(String fileName) {

		/* 此句改为动态地使用 */
		/* String encoding = "UTF-8"; */
		File file = new File(fileName);
		GetCharest charest = new GetCharest();

		/* 用于获得文件相对应的解码方式 */
		String encoding = charest.getFilecharset(file);
		System.out.println("此文件的编码格式为" + encoding);

		Long filelength = file.length();
		byte[] filecontent = new byte[filelength.intValue()];
		try {
			FileInputStream in = new FileInputStream(file);
			in.read(filecontent);

			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			return new String(filecontent, encoding);
		} catch (UnsupportedEncodingException e) {
			System.err.println("The OS does not support " + encoding);
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * file读成String的更新版本！ 可以在此进行对字符串的操作，且代码十分轻巧灵便。
	 */
	public static String readToStringUpdate(String fileName) throws IOException {

		/* 此句改为动态地使用 */
		/* String encoding = "UTF-8"; */
		File file = new File(fileName);
		GetCharest charest = new GetCharest();
		/* 用于获得文件相对应的解码方式 */
		String encoding = charest.getFilecharset(file);
		System.out.println("此文件的编码格式为" + encoding);

		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(fileName), encoding));
		String str;
		String strAll = "";
		int i = 0;
		while ((str = br.readLine()) != null) {
			i++;
			if (!encoding.equals("GBK") && i == 1) {
				str = str.substring(1, str.length());
				System.out.println("\n" + str + "\n");
			}

			strAll += str.trim() + "\n";
			// System.out.println(str.trim());
		}
		// System.out.println("\n我是strAll"+strAll);
		return strAll;
	}

	/**
	 * 用于执行上传操作的方法
	 */
	@SuppressWarnings("unchecked")
	public String execute() throws Exception {

		User currentUser = SystemContext.getCurrentUser();
		Map<String, Object> basicInfo = new HashMap<String, Object>();
		results = new ArrayList<Map<String, Object>>();

		// 把文件上传到upload目录，获取上传的目录路径
		// String
		// pathTxt=ServletActionContext.getServletContext().getRealPath("/uploadTxt");
		String pathTxt = UpdateResources.ABSOLUTE_URL_TXT;
		System.out.println(pathTxt);

		String pathPic = UpdateResources.ABSOLUTE_URL_PIC;
		System.out.println(pathPic);
		try {

			/* create time时间 */
			Date date = new Date();
			System.out.println(date);// new Date()为获取当前系统时间

			/* 准备插入的字段 */
			bookName = this.getBookName();
			bookAuthor = this.getBookAuthor();
			bookIntroduction = this.getBookIntroduction();
			bookCover = this.getFilePicFileName();
			bookPage = this.getBookPage();
			String teacherCode = currentUser.getUserCode();
			String teacherName = currentUser.getUserName();

			String outputTxt = readToStringUpdate(fileTxt.getPath());

			uploadService.addBooksInfo(bookName, bookAuthor, bookIntroduction, bookCover, bookPage, outputTxt, teacherCode, teacherName, date);
			System.out.println("插入成功");
			basicInfo.put("Massage", "success");
		} catch (Exception e) {
			System.out.println(e);
			basicInfo.put("Massage", "error");
		}

		// 创建目标文件对象,文件名fileTxtFileName，格式_FileName
		File destFileTxt = new File(pathTxt, fileTxtFileName);
		File destFilePic = new File(pathPic, filePicFileName);
		// 把上传的文件，拷贝到目标文件中
		FileUtils.copyFile(fileTxt, destFileTxt);
		FileUtils.copyFile(filePic, destFilePic);

		try {
			results.add(basicInfo);
		}

		catch (Exception e) {
			System.out.println(e);
			basicInfo.put("Massage", "error");
		}
		return "result>json";
	}

	// 评论中图片上传

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getBookAuthor() {
		return bookAuthor;
	}

	public void setBookAuthor(String bookAuthor) {
		this.bookAuthor = bookAuthor;
	}

	public String getBookIntroduction() {
		return bookIntroduction;
	}

	public void setBookIntroduction(String bookIntroduction) {
		this.bookIntroduction = bookIntroduction;
	}

	public String getBookCover() {
		return bookCover;
	}

	public void setBookCover(String bookCover) {
		this.bookCover = bookCover;
	}

	public Integer getBookPage() {
		return bookPage;
	}

	public void setBookPage(Integer bookPage) {
		this.bookPage = bookPage;
	}

}
