package com.mesclouds.dao;

import com.mesclouds.model.Permission;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 权限数据访问对象
 * Created by Jeremie on 2015/1/27.
 */
@Repository
public class PermissionDao extends BaseDao<Permission>{

    /**
     * 通过菜单获取角色的权限
     * @param menuId
     * @return
     */
    public List<Permission> getMenuPermission(Integer menuId){
        String sql = "select * from permission join menu_permission where id=permission_id and menu_id = ?";
        return this.execute(sql,menuId);
    }

    /**
     * 通过用户获取菜单的权限
     * @param userId
     * @param menuId
     * @return
     */
    public List<Permission> getPermissionByUserMenu(Integer userId,Integer menuId){
        String sql = "select * from permission join role_menu_permission natural join user_role where user_id = ? and menu_id = ? and id = permission_id";
        return this.execute(sql,userId,menuId);
    }
}
