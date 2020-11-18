package com.annotation.utils;
import java.io.*;
import java.util.Scanner;
//import java.io.BufferedReader;
//import java.io.IOException;

/**
 * 姝ゅ伐鍏风被鐨勭洰鐨勫湪浜庡皢txt鍒嗘垚娈佃惤
 * @author 寮犲崜杈�
 *
 */
public class CutTxt {
	//鏌ョ湅鍏ㄦ枃锛堜互姣�10涓钀戒负涓�椤碉紝缁熻鎬昏鏁帮級
    static void ReadAll (String fileName) throws IOException
    {
        BufferedReader br = new BufferedReader(new InputStreamReader (new FileInputStream (fileName)));//浣跨敤缂撳啿鍖虹殑鏂规硶灏嗘暟鎹鍏ュ埌缂撳啿鍖轰腑
        String str;
        int i=1;
        int a=0,b=1;
        while((str = br.readLine()) != null)
        {
            System.out.println( "["+i+"]:" + str);
            System.out.println( );
            if(i==a+10)   //鍒嗛〉(浠ユ瘡10涓钀戒负涓�椤�)
            {
                System.out.println("------------------------  page "+b+"  ------------------------");
                a=a+10;
                b=b+1;
            }
            i=i+1;
        }
        System.out.println("------------------------  page "+b+"  ------------------------\n");
        i=i-1;
        System.out.println("鏈枃鍏辨湁"+i +"琛�;   鍏辨湁"+b+"椤礬n");
    }
    
   
    
    //鏌ョ湅鎸囧畾椤电爜锛屽疄鐜颁笂涓嬬炕椤�
    static void getPage (String fileName) throws IOException
    {
        System.out.println("(鎻愮ず锛氳緭鍏�00杩斿洖涓婁竴绾�)");
        System.out.print("璇疯緭鍏ユ煡璇㈤〉鐮侊細");
        Scanner sc=new Scanner(System.in);
        int pageNumber=sc.nextInt();
        while(pageNumber!=00)
        {
            BufferedReader br = new BufferedReader(new InputStreamReader (new FileInputStream (fileName)));
            String line = br.readLine();
            int num=0;
            int startNumber=(pageNumber-1)*10+1;
            int endNumber=pageNumber*10;
            while(line!= null)
            {
                if(startNumber==++num)
                {

                    System.out.println("["+startNumber+"]:"+line);
                    int i=startNumber;
                    while(i<endNumber)
                    {
                        i=i+1;
                        line=br.readLine();
                        System.out.println("["+i+"]:"+line);
                    }
                    System.out.println("-------------------page "+ pageNumber+"--------------------");
                    System.out.println("(鎻愮ず锛氳緭鍏�+(涓嬩竴椤�)锛涜緭鍏�-(涓婁竴椤�);杈撳叆bye(杩斿洖涓婁竴绾�);");
                    System.out.print("璇疯緭鍏ワ細");
                    Scanner sc1=new Scanner(System.in);
                    String pageNumber1=sc1.next();
                    int pn=pageNumber;
                    while(!pageNumber1.equals("bye"))
                    {
                        if(pageNumber1.equals("+"))
                        {
                            BufferedReader br1 = new BufferedReader(new InputStreamReader (new FileInputStream (fileName)));
                            String line1=br1.readLine();
                            pn=pn+1;
                            int num1=0;
                            int startNumber1=(pn-1)*10+1,endNumber1=pn*10;
                            while(line1!= null)
                            {
                                if (startNumber1==++num1)
                                {
                                    System.out.println("["+startNumber1+"]:"+line1);
                                    int a=startNumber1;
                                    while(a<endNumber1)
                                    {
                                        a=a+1;
                                        line1=br1.readLine();
                                        System.out.println("["+a+"]:"+line1);
                                    }
                                    System.out.println("-------------------page "+ pn+"--------------------");

                                }
                                line1=br1.readLine();
                            }
                        }
                        if(pageNumber1.equals("-"))
                        {
                            BufferedReader br2 = new BufferedReader(new InputStreamReader (new FileInputStream (fileName)));
                            String line2=br2.readLine();
                            pn=pn-1;
                            int num2=0;
                            int startNumber2=(pn-1)*10+1,endNumber2=pn*10;
                            while(line2!= null)
                            {
                                if (startNumber2==++num2)
                                {
                                    System.out.println("["+startNumber2+"]:"+line2);
                                    int b=startNumber2;
                                    while(b<endNumber2)
                                    {
                                        b=b+1;
                                        line2=br2.readLine();
                                        System.out.println("["+b+"]:"+line2);
                                    }
                                    System.out.println("-------------------page "+ pn+"--------------------");

                                }
                                line2=br2.readLine();
                            }
                        }
                        else
                        {}
                        System.out.print("璇疯緭鍏ワ細");
                        pageNumber1=sc1.next();
                    }
                }
                line=br.readLine();
            }
            System.out.println("(鎻愮ず锛氳緭鍏�00杩斿洖涓婁竴绾�)");
            System.out.print("璇疯緭鍏ユ煡璇㈤〉鐮侊細");
            pageNumber=sc.nextInt();
        }
        System.out.println("杩斿洖鍒颁笂涓�绾�");
    }
    //璇诲彇鎸囧畾琛�,骞舵煡鐪嬩笂涓嬭
    static void readxxLine (String fileName) throws IOException
    {
        System.out.println("(鎻愮ず锛氳緭鍏�00杩斿洖涓婁竴绾�)");
        System.out.print("璇疯緭鍏ユ煡璇㈣锛�");
        Scanner sc=new Scanner(System.in);
        int lineNumber=sc.nextInt();
        while(lineNumber!=00)
        {
            BufferedReader br = new BufferedReader(new InputStreamReader (new FileInputStream (fileName)));//浣跨敤缂撳啿鍖虹殑鏂规硶灏嗘暟鎹鍏ュ埌缂撳啿鍖轰腑
            String line = br.readLine();
            int num=0;
            while(line!= null)
            {
                if(lineNumber==++num)
                {
                    System.out.println("["+lineNumber+"]:"+line);
                    System.out.println("鎻愮ず锛氳緭鍏�+(涓嬩竴琛�)锛涜緭鍏�-(涓婁竴琛�)锛涜緭鍏ye(杩斿洖涓婁竴绾�)");
                    System.out.print("璇疯緭鍏ワ細");
                    Scanner sc1=new Scanner(System.in);
                    String lineNumber1=sc1.next();
                    int ln=lineNumber;
                    while(!lineNumber1.equals("bye"))
                    {
                        if(lineNumber1.equals("+"))
                        {
                            BufferedReader br1 = new BufferedReader(new InputStreamReader (new FileInputStream (fileName)));
                            String line1=br1.readLine();
                            ln=ln+1;
                            int num1=0;
                            while(line1!= null)
                            {
                                if (ln==++num1)
                                {
                                    System.out.println("["+ln+"]:"+line1);
                                }
                                line1=br1.readLine();
                            }
                        }
                        if(lineNumber1.equals("-"))
                        {
                            BufferedReader br2 = new BufferedReader(new InputStreamReader (new FileInputStream (fileName)));
                            String line2=br2.readLine();
                            ln=ln-1;
                            int num2=0;
                            while(line2!= null)
                            {
                                if (ln==++num2)
                                {
                                    System.out.println("["+ln+"]:"+line2);
                                }
                                line2=br2.readLine();
                            }
                        }
                        else
                        {}
                        lineNumber1=sc1.next();
                    }
                }
                line=br.readLine();
            }
            System.out.println("(鎻愮ず锛氳緭鍏�00杩斿洖涓婁竴绾�)");
            System.out.print("璇疯緭鍏ユ煡璇㈣锛�");
            lineNumber=sc.nextInt();
        }
        System.out.println("杩斿洖涓婁竴绾�");
    }
    /*//涓荤▼搴�
    public static void main(String[] args) throws IOException
    {
//        String fileName ="C:\\Users\\寮犲崜杈塡\Desktop\\榫欐棌3榛戞湀涔嬫疆锛堜笂涓笅锛夊畬鏈�.txt";
        System.out.println("鎻愮ず锛氳緭鍏�1(鏌ョ湅鍏ㄦ枃,缁熻鍏ㄦ枃鎬昏鏁板拰鎬婚〉鐮佹暟)锛涜緭鍏�2(璇诲彇鎸囧畾琛岋紝骞舵煡鐪嬩笂涓嬭)锛涜緭鍏�3(鏌ョ湅鎸囧畾椤电爜鐨勫唴瀹癸紝涓婁笅缈婚〉)锛�");
        while(true)
        {

            System.out.print("璇疯緭鍏ワ細");
            Scanner sc=new Scanner(System.in);
            int j=sc.nextInt();
            if(j==1)
            {
                ReadAll(fileName);
                j=0;
            }
            if(j==2)
            {
                readxxLine(fileName);
                j=0;
            }
            if(j==3)
            {
                getPage(fileName);
                j=0;
            }
            if(j==0)
            {}
            else
            {
                System.out.println("杈撳叆閿欒");
            }
            System.out.println("鎻愮ず锛氳緭鍏�1(鏌ョ湅鍏ㄦ枃,缁熻鍏ㄦ枃鎬昏鏁板拰鎬婚〉鐮佹暟)锛涜緭鍏�2(璇诲彇鎸囧畾琛岋紝骞舵煡鐪嬩笂涓嬭)锛涜緭鍏�3(鏌ョ湅鎸囧畾椤电爜鐨勫唴瀹癸紝涓婁笅缈婚〉)锛�");
        }
    }*/
	
}
