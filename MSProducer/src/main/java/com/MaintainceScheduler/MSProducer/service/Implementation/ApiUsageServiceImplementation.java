package com.MaintainceScheduler.MSProducer.service.Implementation;

import com.MaintainceScheduler.MSProducer.model.ApiUsage;
import com.MaintainceScheduler.MSProducer.repository.ApiUsageRepository;
import com.MaintainceScheduler.MSProducer.service.ApiUsageService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ApiUsageServiceImplementation implements ApiUsageService {
    private static final Logger logger = LogManager.getLogger(ApiUsageServiceImplementation.class);

    @Autowired
    private ApiUsageRepository apiUsageRepository;

    @Override
    public void postApiUsageRecord(ApiUsage apiUsage) {
        try {
            apiUsageRepository.save(apiUsage);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<ApiUsage> getApiUsageByDate(Date from, Date to) {
        try {
            List<ApiUsage> apiUsageList = apiUsageRepository.findApiUsagesByDateAfterAndDateBefore(from, to);
            return apiUsageList;
        }
        catch (Exception e) {
            throw e;
        }
    }
}
