package com.MaintainceScheduler.MSProducer.service.Implementation;

import com.MaintainceScheduler.MSProducer.model.*;
import com.MaintainceScheduler.MSProducer.repository.MachineRepository;
import com.MaintainceScheduler.MSProducer.repository.MaintenanceRepository;
import com.MaintainceScheduler.MSProducer.repository.PartRepository;
import com.MaintainceScheduler.MSProducer.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MaintenanceServiceImplementation implements MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private MachineRepository machineRepository;

    @Autowired
    private PartRepository partRepository;

    @Override
    public void recordNewMaintenance(String machineId, MaintenanceResponse maintenanceResponse) {
        if (machineRepository.existsById(machineId)) {
            Maintenance maintenance = toMaintenance(maintenanceResponse);
            Machine machine = machineRepository.getById(machineId);
            maintenanceRepository.save(maintenance);
            machine.getMaintenanceHashMap().put(maintenance.getId(), maintenance);
            machineRepository.save(machine);
        }
        else {
            throw new RuntimeException("Machine does not exist.");
        }
    }

    private Maintenance toMaintenance(MaintenanceResponse maintenanceResponse) {
        Map<String, Part> partMap = new HashMap<>();
        List<Part> partList = maintenanceResponse.getPartsReplaced();
        if (!partList.isEmpty()) {
            for (Part p : partList) {
                partMap.put(p.getId(), p);
            }
            Maintenance maintenance = new Maintenance(
                    maintenanceResponse.getUsername(),
                    maintenanceResponse.getMaintenanceDetail(),
                    partMap,
                    maintenanceResponse.getQuantity(),
                    maintenanceResponse.getRemarks()
            );
            return maintenance;
        }
        else {
            Maintenance maintenance = new Maintenance(
                    maintenanceResponse.getUsername(),
                    maintenanceResponse.getMaintenanceDetail(),
                    null,
                    maintenanceResponse.getQuantity(),
                    maintenanceResponse.getRemarks()
            );
            return maintenance;
        }
    }

    @Override
    public void updateMaintenance(MaintenanceResponse maintenanceResponse) {
        String maintenanceId = maintenanceResponse.getId();
        if (maintenanceRepository.existsById(maintenanceId)) {
            Maintenance maintenance = maintenanceRepository.getById(maintenanceId);
            Date date = maintenanceResponse.getDate();
            String maintenanceDetail = maintenanceResponse.getMaintenanceDetail();
            Long quantity = maintenanceResponse.getQuantity();
            String remarks = maintenanceResponse.getRemarks();
            if (quantity != null) {
                maintenance.setQuantity(quantity);
            }
            if (date != null) {
                maintenance.setDate(date);
            }
            if (maintenanceDetail != null) {
                maintenance.setMaintenanceDetail(maintenanceDetail);
            }
            if (remarks != null) {
                maintenance.setRemarks(remarks);
            }
            Set<String> partIdList = maintenance.getPartsReplaced().keySet();
            Map<String, Part> existingParts = maintenance.getPartsReplaced();
            for (Part p : maintenanceResponse.getPartsReplaced()) {
                if (!partIdList.contains(p.getId())) {
                    existingParts.put(p.getId(), p);
                }
                else {
                    Part existingPart = existingParts.get(p.getId());
                    if (!existingPart.getName().equals(p.getName()) ||
                        existingPart.getQuantity() != p.getQuantity() ||
                        !existingPart.getSpecification().equals(p.getSpecification())) {
                        partRepository.save(p);
                    }
                }
            }
            maintenance.setPartsReplaced(existingParts);
            maintenanceRepository.save(maintenance);
        }
        else {
            throw new RuntimeException("Maintenance item does not exist.");
        }
    }

    @Override
    public void addMaintenancePart(String maintenanceId, Part part) {
        if (maintenanceRepository.existsById(maintenanceId)) {
            if (part.getName() == null) {
                throw new RuntimeException("Part's name cannot be empty");
            }
            else {
                Maintenance maintenance = maintenanceRepository.getById(maintenanceId);
                Map<String, Part> partsReplaced = maintenance.getPartsReplaced();
                partsReplaced.put(part.getId(), part);
                maintenance.setPartsReplaced(partsReplaced);
                maintenanceRepository.save(maintenance);
            }
        }
        else {
            throw new RuntimeException("Maintenance item does not exist.");
        }
    }

    @Override
    public void addMaintenancePartById(String maintenanceId, String partId) {
        if (maintenanceRepository.existsById(maintenanceId)) {
            if (!partRepository.existsById(partId)) {
                throw new RuntimeException("Part with the id does not exist.");
            }
            else {
                Maintenance maintenance = maintenanceRepository.getById(maintenanceId);
                Map<String, Part> partsReplaced = maintenance.getPartsReplaced();
                Part part = partRepository.getById(partId);
                partsReplaced.put(partId, part);
                maintenance.setPartsReplaced(partsReplaced);
                maintenanceRepository.save(maintenance);
            }
        }
        else {
            throw new RuntimeException("Maintenance item does not exist.");
        }
    }

    @Override
    public void removeMaintenancePart(String maintenanceId, String partId) {
        if (maintenanceRepository.existsById(maintenanceId)) {
            Maintenance maintenance = maintenanceRepository.getById(maintenanceId);
            Map<String, Part> partsReplaced = maintenance.getPartsReplaced();
            if (partsReplaced.containsKey(partId)) {
                partsReplaced.remove(partId);
                maintenance.setPartsReplaced(partsReplaced);
                maintenanceRepository.save(maintenance);
            }
            else {
                throw new RuntimeException("Maintenance does not contain the part item.");
            }
        }
        else {
            throw new RuntimeException("Maintenance item does not exist.");
        }
    }

    public List<MaintenanceResponse> getMaintenanceRecord(String machineId) {
        if (machineRepository.existsById(machineId)) {
            Machine machine = machineRepository.getById(machineId);
            List<Maintenance> maintenanceList = new ArrayList<>(machine.getMaintenanceHashMap().values());
            maintenanceList.sort(
                    Comparator.comparing(Maintenance::getDate)
            );
            List<MaintenanceResponse> maintenanceResponseList = new ArrayList<>();
            for (Maintenance m : maintenanceList) {
                Map<String, Part> partMap = m.getPartsReplaced();
                List<Part> partList = new ArrayList<>();
                for (Map.Entry mapElement : partMap.entrySet()) {
                    partList.add((Part) mapElement.getValue());
                }
                MaintenanceResponse maintenanceResponse = new MaintenanceResponse(
                        m.getId(),
                        m.getDate(),
                        m.getUsername(),
                        m.getMaintenanceDetail(),
                        partList,
                        m.getQuantity(),
                        m.getRemarks()
                );
                maintenanceResponseList.add(maintenanceResponse);
            }
            return maintenanceResponseList;
        }
        else {
            throw new RuntimeException("Machine does not exist.");
        }
    }

    @Override
    public List<MaintenanceResponse> getMaintenanceRecordByDate(String machineId, Date from, Date to) {
        List<MaintenanceResponse> maintenanceResponseList = getMaintenanceRecord(machineId);
        return maintenanceResponseList
                .stream()
                .filter(
                        m -> m.getDate().after(from) && m.getDate().before(to)
                ).collect(Collectors.toList());
    }
}
