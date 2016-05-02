package com.mesclouds.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.ParameterizedBeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import java.beans.Transient;
import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 基础DAO(爱用不用)
 * 版权所有
 * Created by Jeremie on 2015/1/26.
 */
@Repository
public class BaseDao<T> implements Serializable {
    @Autowired
    protected JdbcTemplate jdbcTemplate;

    private Class<T> persistentClass;

    protected Class<T> getCurClass() {
        if (persistentClass == null) {
            this.persistentClass = (Class<T>) ((ParameterizedType) getClass()
                    .getGenericSuperclass()).getActualTypeArguments()[0];
        }
        return persistentClass;
    }

    public T get(int id) {
        String sql = "select * from " + getCurClass().getSimpleName().toLowerCase() + " where id = ?";
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        T t = null;
        try {
            t = (T) this.jdbcTemplate.queryForObject(sql, rm, new Object[]{id});
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return t;
    }

    public T findUniqueResult(Map<String, Object> params) {
        String sql = "select * from " + getCurClass().getSimpleName().toLowerCase() + " where ";
        String keys = "";
        List<Object> objects = new ArrayList<Object>();
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            keys += entry.getKey() + " = ? and ";
            objects.add(entry.getValue());
        }
        keys = keys.substring(0, keys.length() - 4);
        sql += keys;
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        T t = null;
        try {
            t = (T) this.jdbcTemplate.queryForObject(sql, rm, objects.toArray());
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return t;
    }


    public List<T> find() {
        String sql = "select * from " + getCurClass().getSimpleName().toLowerCase();
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<T> list = null;
        try {
            list = (List<T>) this.jdbcTemplate.query(sql, rm);
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    public List<T> findByFuzzy(String key, Object value) {
        String sql = "select * from " + getCurClass().getSimpleName().toLowerCase() + " where " + key + " like '%" + value + "%'";
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<T> list = null;
        try {
            list = (List<T>) this.jdbcTemplate.query(sql, rm);
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    public List<T> find(Map<String, Object> params) {
        String sql = "select * from " + getCurClass().getSimpleName().toLowerCase() + " where ";
        List<Object> objects = new ArrayList<Object>();
        String keys = "";
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            keys += entry.getKey() + " = ? and ";
            objects.add(entry.getValue());
        }
        keys = keys.substring(0, keys.length() - 4);
        sql += keys;
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<T> list = null;
        try {
            list = (List<T>) this.jdbcTemplate.query(sql, rm, objects.toArray());
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    public List<T> findWithLimit(int startRow, int pageSize) {
        String sql = "select * from " + getCurClass().getSimpleName().toLowerCase() + " limit " + startRow + "," + pageSize;
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<T> list = null;
        try {
            list = (List<T>) this.jdbcTemplate.query(sql, rm);
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    public List<T> findWithLimit(Map<String, Object> params, int startRow, int pageSize) {
        String sql = "select * from " + getCurClass().getSimpleName().toLowerCase() + " where ";
        List<Object> objects = new ArrayList<Object>();
        String keys = "";
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            keys += entry.getKey() + " = ? and ";
            objects.add(entry.getValue());
        }
        keys = keys.substring(0, keys.length() - 4);
        sql += keys;
        sql += " limit " + startRow + "," + pageSize;
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<T> list = null;
        try {
            list = (List<T>) this.jdbcTemplate.query(sql, rm, objects.toArray());
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    public List<T> execute(String sql, Object... args) {
        List<Object> objects = new ArrayList<Object>();
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<T> list = null;
        try {
            list = (List<T>) this.jdbcTemplate.query(sql, rm, args);
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    public List<T> execute(String sql) {
        List<Object> objects = new ArrayList<Object>();
        RowMapper rm = ParameterizedBeanPropertyRowMapper.newInstance(getCurClass());
        List<T> list = null;
        try {
            list = (List<T>) this.jdbcTemplate.query(sql, rm);
        } catch (Exception e) {
            System.err.println("Exception:读取数据失败");
        }
        return list;
    }

    public int save(T t) {
        String sql = "";
        List<Object> list = new ArrayList<Object>();
        try {
            Class clazz = t.getClass();
            Field[] fields = clazz.getDeclaredFields();
            sql = "insert into " + t.getClass().getSimpleName().toLowerCase() + " (";
            for (Field field : fields) {
                if ("id".equals(field.getName()))
                    continue;
                String methodStr = "get" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
                Method method = clazz.getMethod(methodStr);
                if (!this.checkMethodTransient(method)) {
                    sql = sql + this.getDataBaseField(field.getName()) + ",";
                    Object o = method.invoke(t);
                    list.add(o);
                }
            }
            sql = sql.substring(0, sql.length() - 1) + ") ";
            sql = sql + "values(";
            int temp = fields.length - 1;
            while (temp > 0) {
                sql = sql + "?,";
                temp--;
            }
            sql = sql.substring(0, sql.length() - 1) + ") ";
        } catch (IllegalAccessException  e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return jdbcTemplate.update(sql, list.toArray());
    }

    public <T> int updateById(T object) {
        String sql = "";
        ArrayList<Object> list = new ArrayList<Object>();
        Object id = null;
        try {
            Class clazz = object.getClass();
            Field[] fields = clazz.getDeclaredFields();
            sql = "update " + object.getClass().getSimpleName().toLowerCase() + " set ";
            for (Field field : fields) {
                if (!field.getName().equals("id")) {
                    String methodStr = "get" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
                    Method method = clazz.getMethod(methodStr);
                    if (!this.checkMethodTransient(method)) {
                        sql = sql + this.getDataBaseField(field.getName()) + " = ? ,";
                        Object o = method.invoke(object);
                        list.add(o);
                    }
                } else {
                    String methodStr = "get" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
                    Method method = clazz.getMethod(methodStr);
                    id = method.invoke(object);
                }
            }
            sql = sql.substring(0, sql.length() - 1) + " ";
            sql = sql + "where id = ?";
            list.add(id);
        } catch (InvocationTargetException  e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return jdbcTemplate.update(sql, list.toArray());
    }

    public <E> int deleteById(E id) {
        String sql = "delete from " + getCurClass().getSimpleName().toLowerCase() + " where id = ? ";
        return jdbcTemplate.update(sql, id);
    }


    private String getDataBaseField(String field) {
        List record = new ArrayList();
        for (int i = 0; i < field.length(); i++) {
            char tmp = field.charAt(i);
            if ((tmp <= 'Z') && (tmp >= 'A'))
                record.add(i);//记录每个大写字母的位置
        }
        field = field.toLowerCase();
        char[] charofstr = field.toCharArray();
        String[] t = new String[record.size()];
        for (int i = 0; i < record.size(); i++)
            t[i] = "_" + charofstr[(Integer) record.get(i)];//加“_”
        String result = "";
        int flag = 0;
        for (int i = 0; i < field.length(); i++) {
            if ((flag < record.size()) && (i == (Integer) record.get(flag))) {
                result += t[flag];
                flag++;
            } else
                result += charofstr[i];
        }
        return result;
    }

    private boolean checkMethodTransient(Method method) {
        Annotation[] annotations = method.getDeclaredAnnotations();
        for (Annotation annotation : annotations)
            if (annotation.annotationType() == Transient.class)
                return true;
        return false;
    }

}
