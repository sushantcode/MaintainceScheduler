package com.MaintainceScheduler.MSProducer.utils;

import com.MaintainceScheduler.MSProducer.model.ApiUsage;
import com.MaintainceScheduler.MSProducer.service.ApiUsageService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class ApiInterceptor implements HandlerInterceptor {
    private static final Logger logger = LogManager.getLogger(ApiInterceptor.class);

    @Autowired
    private ApiUsageService apiUsageService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        String name = request.getServletPath();
        if (!name.equals("/error")) {
            ApiUsage apiUsage = new ApiUsage();
            apiUsage.setRoute(name);
            apiUsageService.postApiUsageRecord(apiUsage);
        }
    }
}
