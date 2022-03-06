package com.MaintainceScheduler.MSProducer.model;

import lombok.Data;

import javax.persistence.*;
import java.util.*;

@Data
@Entity
@Table(name = "maintenance")
public class Maintenance {
    @Id
    private String Id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    @Column(nullable = false)
    private String username;
    private String maintenanceDetail;
    @OneToMany(cascade = {
            CascadeType.ALL
    })
    private Map<String, Part> partsReplaced = new HashMap<>();
    private Long quantity = Long.valueOf(1);
    private String remarks;

    public Maintenance() {
        this.Id = UUID.randomUUID().toString();
    }

    public Maintenance(String username, String maintenanceDetail, Map<String, Part> partsReplaced, Long quantity, String remarks) {
        this.Id = UUID.randomUUID().toString();
        this.date = new Date();
        this.username = username;
        this.maintenanceDetail = maintenanceDetail;
        this.partsReplaced = partsReplaced;
        this.quantity = quantity;
        this.remarks = remarks;
    }
}
