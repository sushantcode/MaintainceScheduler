package com.MaintainceScheduler.MSProducer.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "part")
public class Part implements Serializable {
    @Id
    private String id;
    private String name;
    private Long quantity;
    private String specification;

    public Part() {
        this.id = UUID.randomUUID().toString();
    }
}
