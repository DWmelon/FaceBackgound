<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>My JSP 'index.jsp' starting page</title>

  </head>
  
  <body>
    <h1>上传成功</h1>
    <%
    String youName = request.getAttribute("upload").toString();
    %>
    <h1><%=youName %></h1>
  </body>
</html>
