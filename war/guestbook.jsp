<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
	<link type="text/css" rel="stylesheet" href="/stylesheets/main.css" />
</head>

  <body>

<%
    UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    if (user != null) {
      pageContext.setAttribute("user", user);
%>
<p>Hello, ${fn:escapeXml(user.nickname)}! (You can
<a href="<%= userService.createLogoutURL(request.getRequestURI()) %>">sign out</a>.)</p>
<%
    } else {
%>
<p>Hello!
<a href="<%= userService.createLoginURL(request.getRequestURI()) %>">Sign in</a>
to include your name with greetings you post.</p>
<%
    }
%>
	<form action="/sign" method="post">
	   <div><textarea name="content" rows="3" cols="60"></textarea></div>
	   <div><input type="submit" value="Post Greeting" /></div>
	</form>
	<ul>
		<li><a href="/me/editor.jsp">Mobile Safari Editor (patented)</a></li>
		<li><a href="/canvas/dot.html">Canvas Image Processing</a></li>
		<li><a href="/canvas/pt/me.html">Description</a></li>
	</ul>
  </body>
</html>