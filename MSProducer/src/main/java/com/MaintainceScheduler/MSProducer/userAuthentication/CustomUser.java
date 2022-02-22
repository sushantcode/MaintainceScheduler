package com.MaintainceScheduler.MSProducer.userAuthentication;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CustomUser {

    private Long id;
    private String fname;
    private String lname;
    private String username;
    private String email;
    private String role;
    private Boolean isLocked;
    private Boolean isEnabled;

    public CustomUser(Long id,
                      String fname,
                      String lname,
                      String username,
                      String email,
                      String role,
                      Boolean isLocked,
                      Boolean isEnabled) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.username = username;
        this.email = email;
        this.role = role;
        this.isLocked = isLocked;
        this.isEnabled = isEnabled;
    }

}
