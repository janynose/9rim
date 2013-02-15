<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=euc-kr" %>
<%
String query="";
Enumeration<String> enum1 = request.getParameterNames();
Date now = new Date();
System.out.println("--------------------------------------------------------");
System.out.println("QueryString: " + request.getQueryString());
System.out.println("Referer: " + request.getHeader("referer"));
System.out.println("Date: " + now.toString());
while(enum1.hasMoreElements()){
    String key=(String)enum1.nextElement();
    String value=request.getParameter(key);
    System.out.println("\t" + key + ": " + value);
}
%>