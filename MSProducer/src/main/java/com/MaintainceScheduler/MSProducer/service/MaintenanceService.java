package com.MaintainceScheduler.MSProducer.service;

import com.MaintainceScheduler.MSProducer.model.Maintenance;
import com.MaintainceScheduler.MSProducer.model.MaintenanceResponse;
import com.MaintainceScheduler.MSProducer.model.Part;

import java.util.Date;
import java.util.List;

public interface MaintenanceService {

    void recordNewMaintenance(String machineId, MaintenanceResponse maintenanceResponse);
    void updateMaintenance(MaintenanceResponse maintenanceResponse);
    void addMaintenancePart(String maintenanceId, Part part);
    void addMaintenancePartById(String maintenanceId, String partId);
    void removeMaintenancePart(String maintenanceId, String partId);
    List<MaintenanceResponse> getMaintenanceRecordByDate(String machineId, Date from, Date to);

}
