package com.MaintainceScheduler.MSProducer.model;

import lombok.Data;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "ApiUsage")
public class ApiUsage {
    @Id
    private String Id;
    private String route;
    private String username;
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    public ApiUsage() {
        this.Id = UUID.randomUUID().toString();
        this.username = SecurityContextHolder.getContext().getAuthentication().getName();
        this.date = new Date();
    }
}
