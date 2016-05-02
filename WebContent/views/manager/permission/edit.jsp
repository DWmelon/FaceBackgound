<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="${ctx}/html/img/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="${ctx}/html/img/favicon.ico" type="image/x-icon">
    <title>权限项管理</title>
    
    <!-- Bootstrap -->
    <link href="${ctx}/html/css/bootstrap.min.css" rel="stylesheet">
     <link rel="stylesheet" href="${ctx}/html/style/index.css">
    <link rel="stylesheet" href="${ctx}/html/style/moreImg.css">
    <link rel="stylesheet" href="${ctx}/html/style/tool.css">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
      <div id = "mask"></div>
      <div id = "wrap" class = "container-fluid">
        <div class = "container-fluid" id = "header">
          <nav class="navbar container navbar-defined" role="navigation">
            <div class = "navbar-header container">
              <div class = "navbar-brand">
                <a class="navbar-brand brand"  href="#" id="logo">
                  <img src="${ctx}/html/img/logo.png" class = "img-logo">
                  <h3 >米讯平台管理系统</h3>
                  <span class="label label-default label-defined">BETA
                  </span>
                </a>
              </div>
              <div class = "customer-info">
                <img src="${ctx}/html/img/demo.png" class = "customer-img">
                <div class = "type">
                  <a href="#" class = "type-name label">服务号</a>
                  <a href="#" class = "type-verify label">未认证</a>
                </div>
                <a href="" class = "customer-name label">疯掉了丰厚的开</a>
                <a href="#" class = "info-inbox">
                  <i class = "icon-inbox"></i>
                  <i class = "icon-notices"></i>
                </a>
                <div class = "exit-box">
                  <span>|</span>
                  <a href="#" class = "btn btn-exit">退出</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class = " container main-defined" id ="main">
          <div class ="col-md-2 clearfix" id ="nav_tab">
            <ul class = "nav nav-stacked nav-pills" role = "tablist">
              <li role = "presentation">
                <i class="glyphicon glyphicon-th-large" ></i><span>功能</span>
              </li>
              <li role = "presentation">
                <a href="index.html">群发消息</a> 
              </li>
              <li role = "presentation">
                <a href="#">自动回复</a>
              </li>
              <li role = "presentation">
                <a href="#">自定义菜单</a>
              </li>
            </ul>
            <ul class = "nav nav-stacked nav-pills" role = "tablist">
              <li role = "presentation">
                <i class="glyphicon glyphicon-book" style = "margin:10px;" ></i><span>管理</span>
              </li>
              <li role = "presentation">
                <a href="#">消息管理</a> 
              </li>
              <li role = "presentation">
                <a href="#">用户管理</a>
              </li>
              <li role = "presentation">
                <a href="source.html">素材管理</a>
              </li>
            </ul>
            <ul class = "nav nav-stacked nav-pills" role = "tablist">
              <li role = "presentation" class="active">
                <a href = "${ctx}/permission/list">权限管理</a>
              </li>
              <li role = "presentation">
                <a href = "${ctx}/menu/list">菜单管理</a>
              </li>
              <li role = "presentation" >
                <a href = "${ctx}/role/list">角色管理</a>
              </li>
              <li role = "presentation" >
                <a href = "${ctx}/user/list">用户管理</a>
              </li>
              <li role = "presentation" >
                <a href = "${ctx}/groups/list">分组管理</a>
              </li>
              <li role = "presentation" >
                <a href = "${ctx}/organization/list">组织管理</a>
              </li>
            </ul>
          </div>
         <div class="col-main col-md-10">
           <div id="main-title">
             <h4 class="title">权限项管理</h4>
             <ul class="title-nav nav nav-pills">
               <li>
                 <a href="list">权限列表</a>
               </li>
               <li class="active">
                 <a href="#">${permission.id>0 ? "修改" : "添加"}权限</a>
               </li>
             </ul>
           </div>
           <div id="messageBox" class="alert alert-${type} ${empty message ? 'hide' : ''}">
             ${message}
           </div>
            <form name="permission" method="post" action="edit" style="width: 40%" >
              <input name="id" type="hidden" value="${permission.id}">
              <input name="oldName" type="hidden" value="${permission.name}">
              <input name="oldType" type="hidden" value="${permission.permissionType}">
              <div class="form-group">
                <label>编码</label>
                <input name="number" type="text" class="form-control" value="${permission.number}" required>
              </div>
              <div class="form-group">
              <label>权限名</label>
              <input name="name" type="text" class="form-control" value="${permission.name}" required>
              </div>
              <div class="form-group">
                <label>权限类型</label>
                <input name="permissionType" type="text" class="form-control" value="${permission.permissionType}" required>
              </div>
              <div class="tool-area row">
                <button class="btn btn-primary col-md-offset-5">保存</button>
              </div>
            </form>
      </div>
        </div>
        <div class = "row" id ="footer"></div>
      </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="${ctx}/html/js/jquery-1.11.1.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="${ctx}/html/js/bootstrap.min.js"></script>
  </body>
</html>