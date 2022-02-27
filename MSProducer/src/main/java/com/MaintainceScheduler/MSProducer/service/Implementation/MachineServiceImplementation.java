package com.MaintainceScheduler.MSProducer.service.Implementation;

import com.MaintainceScheduler.MSProducer.model.Machine;
import com.MaintainceScheduler.MSProducer.model.MachineResponse;
import com.MaintainceScheduler.MSProducer.model.Part;
import com.MaintainceScheduler.MSProducer.repository.MachineRepository;
import com.MaintainceScheduler.MSProducer.repository.PartRepository;
import com.MaintainceScheduler.MSProducer.service.MachineService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MachineServiceImplementation implements MachineService {

    private static final Logger logger = LogManager.getLogger(MachineServiceImplementation.class);

    @Autowired
    private MachineRepository machineRepository;

    @Autowired
    private PartRepository partRepository;

    @Override
    public void addNewMachine(Machine machine) {
        if (machine.getName() != null) {
            machineRepository.save(machine);
        }
        else {
            throw new RuntimeException("Machine name cannot be empty");
        }
    }

    @Override
    public List<MachineResponse> getMachine() {
        List<Machine> machines = machineRepository.findAll();
        List<MachineResponse> machineList = new ArrayList<>();
        for (Machine machine : machines) {
            Map<String, Part> partHashMap = machine.getPartHashMap();
            List<Part> partList = new ArrayList<>();
            for (Map.Entry mapElement : partHashMap.entrySet()) {
                partList.add((Part) mapElement.getValue());
            }
            MachineResponse machineResponse = new MachineResponse(
                    machine.getId(),
                    machine.getLocation(),
                    machine.getName(),
                    machine.getSpecification(),
                    partList
            );
            machineList.add(machineResponse);
        }
        machineList.sort(
                Comparator.comparing(MachineResponse::getName)
        );
        return machineList;
    }

    @Override
    public void addMachinePart(String machineId, Part part) {
        if (part.getName() != null) {
            if (machineRepository.existsById(machineId)) {
                Machine machine = machineRepository.getById(machineId);
                partRepository.save(part);
                machine.getPartHashMap().put(part.getId(), part);
                machineRepository.save(machine);
            }
            else {
                throw new RuntimeException("Machine does not exist.");
            }
        }
        else {
            throw new RuntimeException("Part's name cannot be empty");
        }
    }

    @Override
    public void removeMachine(String machineId) {
        try {
            machineRepository.deleteById(machineId);
        }
        catch (RuntimeException e) {
            throw e;
        }
    }

    @Override
    public void removeMachinePart(String machineId, String partId) {
        if (machineRepository.existsById(machineId)) {
            Machine machine = machineRepository.getById(machineId);
            Map<String, Part> partHashMap = machine.getPartHashMap();
            if (partHashMap.containsKey(partId)) {
                partHashMap.remove(partId);
                machine.setPartHashMap(partHashMap);
                machineRepository.save(machine);
            }
            else {
                throw new RuntimeException("Machine does not contain the part.");
            }
        }
        else {
            throw new RuntimeException("Machine does not exist.");
        }
    }

    @Override
    public void updateMachine(Machine updateMachine) {
        String machineId = updateMachine.getId();
        if (machineRepository.existsById(machineId)) {
            Machine machine = machineRepository.getById(machineId);
            String location = updateMachine.getLocation();
            String name = updateMachine.getName();
            String specification = updateMachine.getSpecification();
            if (location != null) {
                machine.setLocation(location);
            }
            if (name != null) {
                machine.setName(name);
            }
            if (specification != null) {
                machine.setSpecification(specification);
            }
            machineRepository.save(machine);
        }
        else {
            throw new RuntimeException("Machine does not exist.");
        }
    }

}
