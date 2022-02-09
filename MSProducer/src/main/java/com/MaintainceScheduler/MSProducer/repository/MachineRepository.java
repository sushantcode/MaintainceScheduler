package com.MaintainceScheduler.MSProducer.repository;

import com.MaintainceScheduler.MSProducer.model.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MachineRepository extends JpaRepository<Machine, String> {

}
