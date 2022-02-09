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
    private String maintenanceDetail;
    @OneToMany(cascade = {
            CascadeType.ALL
    })
    private Map<String, Part> partsReplaced = new HashMap<>();
    private Long quantity;
    private String remarks;

    public Maintenance() {
        this.Id = UUID.randomUUID().toString();
    }
}
