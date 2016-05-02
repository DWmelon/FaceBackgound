package com.mesclouds.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class ServletContextUtils implements ApplicationContextAware {

    private static ApplicationContext context;
    
    public ServletContextUtils() {
    }

    @Override
    public void setApplicationContext(ApplicationContext ctx)
            throws BeansException {
        context = ctx;
    }

    public static ApplicationContext getContext(){
        return context;
    }
}
