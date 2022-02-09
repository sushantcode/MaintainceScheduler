package com.MaintainceScheduler.MSProducer.service;

import com.MaintainceScheduler.MSProducer.model.Part;

import java.util.List;

public interface PartService {

    void updatePart(Part updatedPart);
    List<Part> getParts();
    void removePart(String partId);
}
