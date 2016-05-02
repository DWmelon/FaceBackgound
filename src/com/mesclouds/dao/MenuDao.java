package com.mesclouds.dao;

import com.mesclouds.model.Menu;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.ParameterizedBeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 菜单数据访问对象
 * Created by Jeremie on 2015/2/3.
 */

@Repository
public class MenuDao extends BaseDao<Menu> {

    /**
     * 重写一下模糊查找
     * @param key
     * @param value
     * @return
     */
    @Override
    public List<Menu> findByFuzzy(String key, Object value) {
        String sql = "select * from menu where " + key + " like '%" + value + "%' order by order_id asc";
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<Menu> list = null;
        try {
            list = (List<Menu>) this.jdbcTemplate.query(sql, rm);
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    /**
     * 重写一下查找
     * @return
     */
    @Override
    public List<Menu> find() {
        String sql = "select * from menu order by order_id asc";
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<Menu> list = null;
        try {
            list = (List<Menu>) this.jdbcTemplate.query(sql, rm);
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    /**
     * 重写~
     * @param params
     * @return
     */
    @Override
    public List<Menu> find(Map<String, Object> params) {
        String sql = "select * from menu where ";
        List<Object> objects = new ArrayList<Object>();
        String keys = "";
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            keys += entry.getKey() + " = ? and ";
            objects.add(entry.getValue());
        }
        keys = keys.substring(0, keys.length() - 4);
        sql += keys + " order by order_id asc";
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<Menu> list = null;
        try {
            list = (List<Menu>) this.jdbcTemplate.query(sql, rm, objects.toArray());
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    /**
     * 获取父菜单
     * @return
     */
    public List<Menu> findParentMenus(){
        String sql = "select * from menu where isNull(parent_id) order by order_id asc";
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        return jdbcTemplate.query(sql,rm);
    }


    /**
     * 排除查找
     *
     * @param params
     * @param ids
     * @return
     */
    public List<Menu> findWithoutIds(Map<String, Object> params, List<Integer> ids) {
        String sql = "select * from menu where ";
        List<Object> objects = new ArrayList<Object>();
        String keys = "";
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            keys += entry.getKey() + " = ? and ";
            objects.add(entry.getValue());
        }
        keys = keys.substring(0, keys.length() - 4);
        keys += "and id not in (";
        for (Integer id : ids)
            keys += id + ",";
        keys = keys.substring(0, keys.length() - 1) + ")";
        sql += keys;
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<Menu> list = null;
        try {
            list = (List<Menu>) this.jdbcTemplate.query(sql, rm, objects.toArray());
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    /**
     * 保存菜单权限关系
     *
     * @param menuId
     * @param permissionId
     * @return
     */
    public int saveMenuPermission(Integer menuId, Integer permissionId) {
        String sql = "insert into menu_permission values(?,?)";
        return this.jdbcTemplate.update(sql, menuId, permissionId);
    }

    /**
     * 删除菜单权限关系
     *
     * @param menuId
     * @return
     */
    public int deleteMenuPermission(Integer menuId) {
        String sql = "delete from menu_permission where menu_id = ?";
        return this.jdbcTemplate.update(sql, menuId);
    }

    /**
     * 删除角色菜单权限关系
     *
     * @param menuId
     * @return
     */
    public int deleteRoleMenuPermission(Integer menuId) {
        String sql = "delete from role_menu_permission where menu_id = ?";
        return this.jdbcTemplate.update(sql, menuId);
    }

    /**
     * 数一下符合要求的角色菜单权限关系
     *
     * @param roleId
     * @param menuId
     * @param permissionId
     * @return
     */
    public Long countMenuPermission(Integer roleId,Integer menuId,Integer permissionId){
        String sql = "select count(*) from role_menu_permission where role_id = ? and menu_id = ? and permission_id = ?";
        return this.jdbcTemplate.queryForObject(sql,Long.class,roleId,menuId,permissionId);
    }

    /**
     * 获取菜单
     * @param roleId
     * @return
     */
    public List<Menu> getMenuRole(Integer roleId){
        String sql = "select * from menu join role_menu_permission where role_id = ? and id = menu_id order by order_id asc";
        return this.execute(sql,roleId);
    }
}
