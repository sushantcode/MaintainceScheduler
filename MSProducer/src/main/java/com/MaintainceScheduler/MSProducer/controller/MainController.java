package com.MaintainceScheduler.MSProducer.controller;

import com.MaintainceScheduler.MSProducer.userAuthentication.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    private static final Logger logger = LogManager.getLogger(MainController.class);

    @GetMapping
    public ResponseEntity<?> getHome() {
        logger.info("API Request made to check homepage");
        return new ResponseEntity<>("This is HomePage", HttpStatus.OK);
    }
}
