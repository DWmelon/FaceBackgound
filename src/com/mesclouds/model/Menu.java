package com.mesclouds.model;

import java.beans.Transient;
import java.io.Serializable;
import java.util.List;

/**
 * 菜单项
 * Created by Jeremie on 2015/2/3.
 */
public class Menu implements Serializable {
    //id
    private Integer id;
    //编码
    private String number;
    //菜单名
    private String name;
    //父菜单
    private Integer parentId;
    //是否叶子菜单
    private Integer isLeaf;
    //菜单url
    private String url;
    //排序号
    private Integer orderId;
    //菜单集合
    private List<Menu> menus;
    //该菜单的权限集合
    private List<Permission> permissions;

    @Transient
    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    @Transient
    public List<Menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Menu> menus) {
        this.menus = menus;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIsLeaf() {
        return isLeaf;
    }

    public void setIsLeaf(Integer isLeaf) {
        this.isLeaf = isLeaf;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Menu menu = (Menu) o;

        if (id != null ? !id.equals(menu.id) : menu.id != null) return false;
        if (isLeaf != null ? !isLeaf.equals(menu.isLeaf) : menu.isLeaf != null) return false;
        if (name != null ? !name.equals(menu.name) : menu.name != null) return false;
        if (number != null ? !number.equals(menu.number) : menu.number != null) return false;
        if (orderId != null ? !orderId.equals(menu.orderId) : menu.orderId != null) return false;
        if (parentId != null ? !parentId.equals(menu.parentId) : menu.parentId != null) return false;
        if (url != null ? !url.equals(menu.url) : menu.url != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (parentId != null ? parentId.hashCode() : 0);
        result = 31 * result + (isLeaf != null ? isLeaf.hashCode() : 0);
        result = 31 * result + (url != null ? url.hashCode() : 0);
        result = 31 * result + (orderId != null ? orderId.hashCode() : 0);
        return result;
    }
}
