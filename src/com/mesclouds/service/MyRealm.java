package com.mesclouds.service;


import com.mesclouds.dao.MenuDao;
import com.mesclouds.dao.PermissionDao;
import com.mesclouds.dao.RoleDao;
import com.mesclouds.dao.UserDao;
import com.mesclouds.model.Menu;
import com.mesclouds.model.Permission;
import com.mesclouds.model.Role;
import com.mesclouds.model.User;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

/**
 * 自定义Realm,进行数据源配置
 *
 * Created by Jeremie on 2014/10/1.
 */

@Service
public class MyRealm extends AuthorizingRealm{

    @Autowired
    private UserDao userDao;
    @Autowired
    private RoleDao roleDao;
    @Autowired
    private PermissionDao permissionDao;
    @Autowired
    private MenuDao menuDao;
    /**
     * 获取授权信息
     */
    @Override
    public AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取登录时输入的用户名  
        String loginName=(String) principalCollection.fromRealm(getName()).iterator().next();
        //到数据库获取此用户
        Map<String,Object> userParams = new HashMap<String,Object>();
        userParams.put("account",loginName);
        User user=userDao.findUniqueResult(userParams);
        if(user!=null){
            //权限信息对象info,用来存放查出的用户的所有的角色（role）及权限（permission）  
            SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
            //用户的角色集合
            HashSet<String> rolesNameSet = new HashSet<String>();
            for(Role role:roleDao.getUserRoles(user.getId())) {
                rolesNameSet.add(role.getName());
                for(Menu menu : menuDao.getMenuRole(role.getId()))
                    for(Permission permission:permissionDao.getMenuPermission(menu.getId()))
                        //用户的角色对应的所有权限，如果只使用角色定义访问权限
                        info.addStringPermission( menu.getName() + ":" + permission.getPermissionType());
                /*for(Permission permission:permissionDao.getRolePermission(role.getId())) {
                    info.addStringPermission(permission.getName());
                }*/
            }
            //用户的角色
            info.setRoles(rolesNameSet);
            return info;
        }
        return null;
    }

    /**
     * 获取身份验证相关信息
     */
    @Override
    public AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken authenticationToken) throws AuthenticationException {
        //UsernamePasswordToken对象用来存放提交的登录信息  
        UsernamePasswordToken token=(UsernamePasswordToken) authenticationToken;
        //查出是否有此用户
        Map<String,Object> userParams = new HashMap<String,Object>();
        userParams.put("account",token.getUsername());
        User user=userDao.findUniqueResult(userParams);
        if(user!=null){
            //若存在，将此用户存放到登录认证info中  
            return new SimpleAuthenticationInfo(user.getAccount(), user.getPassword(), getName());
        }
        return null;
    }
}