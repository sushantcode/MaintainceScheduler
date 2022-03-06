package com.MaintainceScheduler.MSProducer.controller;

import com.MaintainceScheduler.MSProducer.ApplicationStaticProperties;
import com.MaintainceScheduler.MSProducer.model.ApiUsage;
import com.MaintainceScheduler.MSProducer.service.ApiUsageService;
import com.MaintainceScheduler.MSProducer.userAuthentication.CustomUser;
import com.MaintainceScheduler.MSProducer.userAuthentication.User;
import com.MaintainceScheduler.MSProducer.userAuthentication.UserRegistrationRequest;
import com.MaintainceScheduler.MSProducer.userAuthentication.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/" + ApplicationStaticProperties.version + "/admin")
public class AdminController {
    private static final Logger logger = LogManager.getLogger(AdminController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private ApiUsageService apiUsageService;

    @GetMapping
    public String getAdmin() {
        logger.info("Admin user is authorised");
        return (
                "<h1>This is admin page</h1>" +
                        "<br />" +
                        "<a href=\"http://localhost:8080/logout\">Logout</a>"
        );
    }

    @PostMapping("/registerNewUser")
    public ResponseEntity<?> registerNewUser(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        logger.info("New user registration is requested.");
        if (userRegistrationRequest == null) {
            return new ResponseEntity<>("User details are empty", HttpStatus.BAD_REQUEST);
        }
        if (userRegistrationRequest.getUsername() == null) {
            return new ResponseEntity<>("Username cannot be empty", HttpStatus.BAD_REQUEST);
        }
        if (userRegistrationRequest.getPassword() == null) {
            return new ResponseEntity<>("Password cannot be empty", HttpStatus.BAD_REQUEST);
        }
        if (userRegistrationRequest.getFname() == null) {
            return new ResponseEntity<>("First name cannot be empty", HttpStatus.BAD_REQUEST);
        }
        if (userRegistrationRequest.getLname() == null) {
            return new ResponseEntity<>("Last name cannot be empty", HttpStatus.BAD_REQUEST);
        }
        User user = new User(
                userRegistrationRequest.getFname(),
                userRegistrationRequest.getLname(),
                userRegistrationRequest.getUsername(),
                userRegistrationRequest.getEmail(),
                userRegistrationRequest.getPassword(),
                "USER"
            );
        try {
            userService.addNewUser(user);
            return new ResponseEntity<>("Successfully added new user", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listUsers")
    public ResponseEntity<?> getUsers() {
        logger.info("Admin requested list of users");
        try {
            List<User> userList = userService.findUsers();
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateStatus")
    public ResponseEntity<?> updateStatus(@RequestParam Long id, @RequestParam Boolean isEnabled) {
        logger.info("Admin requested update user status for id: " + id.toString());
        if (isEnabled == null) {
            return new ResponseEntity<>("Current status must be passed", HttpStatus.BAD_REQUEST);
        }
        try {
            userService.enableDisableUser(id, isEnabled);
            return new ResponseEntity<>("User status updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/resetPassword")
    public ResponseEntity<?> updateStatus(@RequestParam Long id, @RequestBody String password) {
        logger.info("Admin requested to reset password for id: " + id.toString());
        if (password == null) {
            return new ResponseEntity<>("Must pass new password in body", HttpStatus.BAD_REQUEST);
        }
        try {
            userService.resetPassword(id, password);
            return new ResponseEntity<>("User password reset successful", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAppActivities")
    public ResponseEntity<?> getAppActivities(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)  Date to
    ) {
        logger.info("Admin requested the app usages");
        try {
            List<ApiUsage> apiUsageList = apiUsageService.getApiUsageByDate(from, to);
            return new ResponseEntity<>(apiUsageList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
