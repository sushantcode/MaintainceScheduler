package com.MaintainceScheduler.MSProducer.repository;

import com.MaintainceScheduler.MSProducer.model.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, String> {
}
