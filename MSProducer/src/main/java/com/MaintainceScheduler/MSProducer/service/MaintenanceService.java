package com.MaintainceScheduler.MSProducer.service;

import com.MaintainceScheduler.MSProducer.model.Maintenance;
import com.MaintainceScheduler.MSProducer.model.Part;

import java.util.List;

public interface MaintenanceService {

    void recordNewMaintenance(String machineId, Maintenance maintenance);
    void updateMaintenance(Maintenance updatedMaintenance);
    void addMaintenancePart(String maintenanceId, Part part);
    void addMaintenancePartById(String maintenanceId, String partId);
    void removeMaintenancePart(String maintenanceId, String partId);
    List<Maintenance> getMaintenanceRecord(String machineId);

}
