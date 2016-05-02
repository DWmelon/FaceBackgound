package com.mesclouds.model;

import java.io.Serializable;

/**
 * 分组类
 * Created by Jeremie on 2015/1/26.
 */
public class Groups implements Serializable {
    //id
    public Integer id;
    //编码
    private String number;
    //分组名
    private String name;

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
}
