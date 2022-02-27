package com.MaintainceScheduler.MSProducer.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.*;

@Data
@AllArgsConstructor
public class MachineResponse {
    private String id;
    private String location;
    private String name;
    private String specification;
    private List<Part> partList = new ArrayList<>();
}
