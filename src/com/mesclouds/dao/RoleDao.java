package com.mesclouds.dao;

import com.mesclouds.model.Role;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 角色数据访问对象
 * Created by Jeremie on 2015/1/27.
 */
@Repository
public class RoleDao extends BaseDao<Role> {

    /**
     * 通过用户id获取用户角色
     *
     * @param userId
     * @return
     */
    public List<Role> getUserRoles(Integer userId) {
        String sql = "select * from role join user_role where id=role_id and user_id = ?";
        return this.execute(sql, userId);
    }

    /**
     * 保存角色权限关系
     *
     * @param roleId
     * @param menuId
     * @param permissionId
     * @return
     */
    public int saveRolePermission(Integer roleId, Integer menuId,Integer permissionId) {
        String sql = "insert into role_menu_permission values(?,?,?)";
        return this.jdbcTemplate.update(sql, roleId,menuId, permissionId);
    }

    /**
     * 删除角色权限关系
     *
     * @param roleId
     * @return
     */
    public int deleteRoleMenuPermission(Integer roleId) {
        String sql = "delete from role_menu_permission where role_id = ?";
        return this.jdbcTemplate.update(sql, roleId);
    }

}
