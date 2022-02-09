package com.MaintainceScheduler.MSProducer.repository;

import com.MaintainceScheduler.MSProducer.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartRepository extends JpaRepository<Part, String> {
}
