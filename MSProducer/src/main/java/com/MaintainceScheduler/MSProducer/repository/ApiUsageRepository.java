package com.MaintainceScheduler.MSProducer.repository;

import com.MaintainceScheduler.MSProducer.model.ApiUsage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ApiUsageRepository extends JpaRepository<ApiUsage, String> {
    List<ApiUsage> findApiUsagesByDateAfterAndDateBefore(Date from, Date to);
}
