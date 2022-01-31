package com.MaintainceScheduler.MSProducer.configuration;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MainController {
    private static final Logger logger = LogManager.getLogger(MainController.class);

    @GetMapping
    public ResponseEntity<?> getStores() {
        logger.info("API Request made to check homepage");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
