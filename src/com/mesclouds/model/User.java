package com.mesclouds.model;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 用户类
 * Created by Jeremie on 2015/1/26.
 */
public class User implements Serializable {

    //id
    private Integer id;
    //员工编号
    private String number;
    //所属组织id
    private Integer orgId;
    //生效时间
    private Timestamp effectiveDate;
    //失效时间
    private Timestamp invalidationDate;
    //错误次数
    private Integer errCount;
    //是否锁定
    private Integer locked;
    //锁定时间
    private Timestamp lockedTime;
    //姓名
    private String name;
    //AD域账号
    private String adAccount;
    //登陆账号
    private String account;
    //密码
    private String password;
    //是否有效
    private Integer valid;

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

    public Integer getOrgId() {
        return orgId;
    }

    public void setOrgId(Integer orgId) {
        this.orgId = orgId;
    }

    public Timestamp getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(Timestamp effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public Timestamp getInvalidationDate() {
        return invalidationDate;
    }

    public void setInvalidationDate(Timestamp invalidationDate) {
        this.invalidationDate = invalidationDate;
    }

    public Integer getErrCount() {
        return errCount;
    }

    public void setErrCount(Integer errCount) {
        this.errCount = errCount;
    }

    public Integer getLocked() {
        return locked;
    }

    public void setLocked(Integer locked) {
        this.locked = locked;
    }

    public Timestamp getLockedTime() {
        return lockedTime;
    }

    public void setLockedTime(Timestamp lockedTime) {
        this.lockedTime = lockedTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdAccount() {
        return adAccount;
    }

    public void setAdAccount(String adAccount) {
        this.adAccount = adAccount;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getValid() {
        return valid;
    }

    public void setValid(Integer valid) {
        this.valid = valid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (account != null ? !account.equals(user.account) : user.account != null) return false;
        if (adAccount != null ? !adAccount.equals(user.adAccount) : user.adAccount != null) return false;
        if (effectiveDate != null ? !effectiveDate.equals(user.effectiveDate) : user.effectiveDate != null)
            return false;
        if (errCount != null ? !errCount.equals(user.errCount) : user.errCount != null) return false;
        if (id != null ? !id.equals(user.id) : user.id != null) return false;
        if (invalidationDate != null ? !invalidationDate.equals(user.invalidationDate) : user.invalidationDate != null)
            return false;
        if (locked != null ? !locked.equals(user.locked) : user.locked != null) return false;
        if (lockedTime != null ? !lockedTime.equals(user.lockedTime) : user.lockedTime != null) return false;
        if (name != null ? !name.equals(user.name) : user.name != null) return false;
        if (number != null ? !number.equals(user.number) : user.number != null) return false;
        if (orgId != null ? !orgId.equals(user.orgId) : user.orgId != null) return false;
        if (password != null ? !password.equals(user.password) : user.password != null) return false;
        if (valid != null ? !valid.equals(user.valid) : user.valid != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (orgId != null ? orgId.hashCode() : 0);
        result = 31 * result + (effectiveDate != null ? effectiveDate.hashCode() : 0);
        result = 31 * result + (invalidationDate != null ? invalidationDate.hashCode() : 0);
        result = 31 * result + (errCount != null ? errCount.hashCode() : 0);
        result = 31 * result + (locked != null ? locked.hashCode() : 0);
        result = 31 * result + (lockedTime != null ? lockedTime.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (adAccount != null ? adAccount.hashCode() : 0);
        result = 31 * result + (account != null ? account.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (valid != null ? valid.hashCode() : 0);
        return result;
    }
}
