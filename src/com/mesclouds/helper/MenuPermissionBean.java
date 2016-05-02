package com.mesclouds.helper;

import com.mesclouds.model.Menu;
import com.mesclouds.model.Permission;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Jeremie on 2015/2/5.
 */
public class MenuPermissionBean implements Serializable {
    private Menu menu;
    private List<Permission> permissionList;
    private List<Boolean> permissionSelected;

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public List<Permission> getPermissionList() {
        return permissionList;
    }

    public void setPermissionList(List<Permission> permissionList) {
        this.permissionList = permissionList;
    }

    public List<Boolean> getPermissionSelected() {
        return permissionSelected;
    }

    public void setPermissionSelected(List<Boolean> permissionSelected) {
        this.permissionSelected = permissionSelected;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MenuPermissionBean that = (MenuPermissionBean) o;

        if (menu != null ? !menu.equals(that.menu) : that.menu != null) return false;
        if (permissionList != null ? !permissionList.equals(that.permissionList) : that.permissionList != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = menu != null ? menu.hashCode() : 0;
        result = 31 * result + (permissionList != null ? permissionList.hashCode() : 0);
        return result;
    }
}
