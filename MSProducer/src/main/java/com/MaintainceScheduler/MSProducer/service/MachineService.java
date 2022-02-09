package com.MaintainceScheduler.MSProducer.service;

import com.MaintainceScheduler.MSProducer.model.Machine;
import com.MaintainceScheduler.MSProducer.model.Part;

import java.util.List;

public interface MachineService {

    void addNewMachine(Machine machine);
    List<Machine> getMachine();
    void addMachinePart(String machineId, Part part);
    void removeMachine(String machineId);
    void removeMachinePart(String machineId, String partId);
    void updateMachine(Machine updateMachine);
}
