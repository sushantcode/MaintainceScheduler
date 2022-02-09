package com.MaintainceScheduler.MSProducer.service.Implementation;

import com.MaintainceScheduler.MSProducer.model.Part;
import com.MaintainceScheduler.MSProducer.repository.PartRepository;
import com.MaintainceScheduler.MSProducer.service.PartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class PartServiceImplementation implements PartService {

    @Autowired
    private PartRepository partRepository;

    @Override
    public void updatePart(Part updatedPart) {
        String partId = updatedPart.getId();
        if (partRepository.existsById(partId)) {
            Part part = partRepository.getById(partId);
            Long quantity = updatedPart.getQuantity();
            String name = updatedPart.getName();
            String specification = updatedPart.getSpecification();
            if (quantity != null) {
                part.setQuantity(quantity);
            }
            if (name != null) {
                part.setName(name);
            }
            if (specification != null) {
                part.setSpecification(specification);
            }
            partRepository.save(part);
        }
        else {
            throw new RuntimeException("Part does not exist.");
        }
    }

    @Override
    public List<Part> getParts() {
        List<Part> partList = partRepository.findAll();
        partList.sort(
                Comparator.comparing(Part::getName)
        );
        return partRepository.findAll();
    }

    @Override
    public void removePart(String partId) {
        try {
            partRepository.deleteById(partId);
        }
        catch (RuntimeException e) {
            throw e;
        }
    }
}
