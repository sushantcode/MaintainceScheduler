package com.MaintainceScheduler.MSProducer.userAuthentication;

import com.MaintainceScheduler.MSProducer.ApplicationStaticProperties;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/" + ApplicationStaticProperties.version)
public class AuthController {

    private static final Logger logger = LogManager.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public ResponseEntity<?> loggedIn(@RequestParam String username) {
        logger.info("Login requested by: " + username);
        try {
            CustomUser customUser = userService.findUserByUserName(username);
            if (customUser != null) {
                return new ResponseEntity<>(customUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User does not exist.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChange passwordChange) {
        logger.info(passwordChange);
        try {
            userService.changePassword(passwordChange);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
