package com.MaintainceScheduler.MSProducer.userAuthentication;

import com.MaintainceScheduler.MSProducer.ApplicationStaticProperties;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/" + ApplicationStaticProperties.version + "/login")
public class AuthController {

    private static final Logger logger = LogManager.getLogger(AuthController.class);

    @GetMapping
    public ResponseEntity<?> loggedIn() {
        logger.info("User is logged in");
        return new ResponseEntity<>("User logged in", HttpStatus.OK);
    }
}
