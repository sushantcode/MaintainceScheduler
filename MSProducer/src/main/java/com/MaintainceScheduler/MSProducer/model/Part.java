package com.MaintainceScheduler.MSProducer.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Data
@Entity
@Table(name = "part")
public class Part implements Serializable {
    @Id
    private String id;
    private String name;
    private Long quantity = Long.valueOf(1);
    private String specification;

    public Part() {
        this.id = UUID.randomUUID().toString();
    }
}
