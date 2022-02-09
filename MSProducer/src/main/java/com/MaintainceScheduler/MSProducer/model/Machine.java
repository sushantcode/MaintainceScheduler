package com.MaintainceScheduler.MSProducer.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Data
@Entity
@Table(name = "machine")
public class Machine implements Serializable {

    @Id
    private String id;
    private String location;
    private String name;
    private String specification;
    @OneToMany(cascade = {
            CascadeType.ALL
    })
    private Map<String, Part> partHashMap = new HashMap<>();
    @OneToMany(cascade = {
            CascadeType.ALL
    })
    private Map<String, Maintenance> maintenanceHashMap = new HashMap<>();

    public Machine() {
        this.id = UUID.randomUUID().toString();
    }
}
