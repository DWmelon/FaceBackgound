package com.mesclouds.dao;

import com.mesclouds.model.User;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.ParameterizedBeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户数据访问对象
 * Created by Jeremie on 2015/1/26.
 */
@Repository
public class UserDao extends BaseDao<User> {

    /**
     * 代餐模糊查找
     *
     * @param key
     * @param value
     * @param valid
     * @return
     */

    public List<User> findByFuzzy(String key, Object value, Integer valid) {
        String sql = "select * from " + getCurClass().getSimpleName().toLowerCase() + " where " + key + " like '%" + value + "%' and valid = " + valid;
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<User> list = null;
        try {
            list = (List<User>) this.jdbcTemplate.query(sql, rm);
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    /**
     * 保存用户角色关系
     *
     * @param userId
     * @param roleId
     * @return
     */
    public int saveUserRole(Integer userId, Integer roleId) {
        String sql = "insert into user_role(user_id,role_id) values(?,?)";
        return this.jdbcTemplate.update(sql, userId, roleId);
    }

    /**
     * 删除用户权限角色关系
     *
     * @param userId
     * @return
     */
    public int deleteUserRole(Integer userId) {
        String sql = "delete from user_role where user_id = ?";
        return this.jdbcTemplate.update(sql, userId);
    }

    /**
     * 查找无加入组织的用户
     */
    public List<User> findUsersBynoOrg() {
        String sql = "select * from user where isNull(org_id) and valid = 1";
        return this.execute(sql);
    }

    /**
     * 通过用户分组查找用户
     * @param groupId
     * @return
     */
    public List<User> findUserByGroup(Integer groupId){
        String sql = "select * from user join group_user where id = user_id and group_id = ?";
        return this.execute(sql,groupId);
    }
}
