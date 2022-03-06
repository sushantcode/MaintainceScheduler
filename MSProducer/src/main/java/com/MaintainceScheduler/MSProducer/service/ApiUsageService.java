package com.MaintainceScheduler.MSProducer.service;

import com.MaintainceScheduler.MSProducer.model.ApiUsage;

import java.util.Date;
import java.util.List;

public interface ApiUsageService {

    void postApiUsageRecord(ApiUsage apiUsage);
    List<ApiUsage> getApiUsageByDate(Date from, Date to);
}
