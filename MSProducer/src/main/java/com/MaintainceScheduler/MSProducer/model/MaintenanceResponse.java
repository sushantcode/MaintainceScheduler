package com.MaintainceScheduler.MSProducer.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class MaintenanceResponse {
    private String Id;
    private Date date;
    private String maintenanceDetail;
    private List<Part> partsReplaced = new ArrayList<>();
    private Long quantity;
    private String remarks;
}
