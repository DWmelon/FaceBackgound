package com.mesclouds.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class ApplicationContextUtils implements ApplicationContextAware {

    private static ApplicationContext context;
    
    public ApplicationContextUtils() {
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
