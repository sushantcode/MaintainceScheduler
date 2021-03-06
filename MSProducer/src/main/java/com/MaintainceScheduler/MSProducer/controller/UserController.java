package com.MaintainceScheduler.MSProducer.controller;

import com.MaintainceScheduler.MSProducer.ApplicationStaticProperties;
import com.MaintainceScheduler.MSProducer.model.*;
import com.MaintainceScheduler.MSProducer.service.MachineService;
import com.MaintainceScheduler.MSProducer.service.MaintenanceService;
import com.MaintainceScheduler.MSProducer.service.PartService;
import com.MaintainceScheduler.MSProducer.utils.MaintenancePDFExporter;
import com.lowagie.text.DocumentException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/" + ApplicationStaticProperties.version + "/user")
public class UserController {
    private static final Logger logger = LogManager.getLogger(UserController.class);

    @Autowired
    private MachineService machineService;

    @Autowired
    private MaintenanceService maintenanceService;

    @Autowired
    private PartService partService;

    @GetMapping
    public String getUser() {
        logger.info("General user is authorised");
        return (
                "<h1>This is user page</h1>" +
                        "<br />" +
                        "<a href=\"http://localhost:8080/logout\">Logout</a>"
        );
    }

    @PostMapping("addNewMachine")
    public ResponseEntity<?> addNewMachine(@RequestBody Machine machine) {
        try {
            machineService.addNewMachine(machine);
            return new ResponseEntity<>("Machine registered", HttpStatus.CREATED);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listMachine")
    public ResponseEntity<?> getMachine() {
        try {
            List<MachineResponse> machineList = machineService.getMachine();
            return new ResponseEntity<>(machineList, HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getMachineById")
    public ResponseEntity<?> getMachineById(@RequestParam String machineId) {
        try {
            MachineResponse machine = machineService.getMachineById(machineId);
            return new ResponseEntity<>(machine, HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("addMachinePart")
    public ResponseEntity<?> addMachinePart(
            @RequestParam String machineId,
            @RequestBody Part part) {
        try {
            machineService.addMachinePart(machineId, part);
            return new ResponseEntity<>("New part added to the machine", HttpStatus.CREATED);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/removeMachinePart")
    public ResponseEntity<?> removeMachinePart(
            @RequestParam String machineId,
            @RequestParam String partId) {
        try {
            machineService.removeMachinePart(machineId, partId);
            return new ResponseEntity<>("Part has been removed from the machine successfully", HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("updateMachine")
    public ResponseEntity<?> updateMachine(@RequestBody Machine machine) {
        try {
            machineService.updateMachine(machine);
            return new ResponseEntity<>("Machine updated successfully", HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("updatePart")
    public ResponseEntity<?> updatePart(@RequestBody Part part) {
        try {
            partService.updatePart(part);
            return new ResponseEntity<>("Machine's part updated successfully", HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("recordNewMaintenance")
    public ResponseEntity<?> recordNewMaintenance(
            @RequestParam String machineId,
            @RequestBody MaintenanceResponse maintenanceResponse) {
        try {
            maintenanceService.recordNewMaintenance(machineId, maintenanceResponse);
            return new ResponseEntity<>("New maintenance recorded successfully", HttpStatus.CREATED);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("updateMaintenance")
    public ResponseEntity<?> updateMaintenance(@RequestBody MaintenanceResponse maintenanceResponse) {
        try {
            maintenanceService.updateMaintenance(maintenanceResponse);
            return new ResponseEntity<>("Maintenance detail updated successfully", HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("addMaintenancePart")
    public ResponseEntity<?> addMaintenancePart(
            @RequestParam String maintenanceId,
            @RequestBody Part part) {
        try {
            maintenanceService.addMaintenancePart(maintenanceId, part);
            return new ResponseEntity<>("New part added to the maintenance", HttpStatus.CREATED);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("addMaintenancePartById")
    public ResponseEntity<?> addMaintenancePartById(
            @RequestParam String maintenanceId,
            @RequestParam String partId) {
        try {
            maintenanceService.addMaintenancePartById(maintenanceId, partId);
            return new ResponseEntity<>("New part added to the maintenance", HttpStatus.CREATED);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/removeMaintenancePart")
    public ResponseEntity<?> removeMaintenancePart(
            @RequestParam String maintenanceId,
            @RequestParam String partId) {
        try {
            maintenanceService.removeMaintenancePart(maintenanceId, partId);
            return new ResponseEntity<>("Part has been removed from the maintenance successfully", HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getMaintenanceRecordByDate")
    public ResponseEntity<?> getMaintenanceRecordByDate(
            @RequestParam String machineId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date date
    ) {
        try {
            Date nextDate = new Date(date.getTime() + (1000 * 60 * 60 * 24));
            logger.info(date);
            logger.info(nextDate);
            List<MaintenanceResponse> maintenanceList = maintenanceService
                                                        .getMaintenanceRecordByDate(machineId, date, nextDate);
            return new ResponseEntity<>(maintenanceList, HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getParts")
    public ResponseEntity<?> getParts() {
        try {
            List<Part> partList = partService.getParts();
            return new ResponseEntity<>(partList, HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/removePart")
    public ResponseEntity<?> removePart(@RequestParam String partId) {
        try {
            partService.removePart(partId);
            return new ResponseEntity<>("Part has been removed successfully", HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/generatePdf")
    public void exportToPDF(
            HttpServletResponse response,
            @RequestParam String machineId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)  Date to
    ) throws DocumentException, IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=maintenance_" + currentDateTime + ".pdf";
        response.setHeader(headerKey, headerValue);
        MachineResponse machine = machineService.getMachineById(machineId);
        List<MaintenanceResponse> maintenanceResponseList = maintenanceService
                                                                .getMaintenanceRecordByDate(machineId, from, to);
        MaintenancePDFExporter exporter = new MaintenancePDFExporter(maintenanceResponseList, machine);
        exporter.export(response, from, to);

    }
}
