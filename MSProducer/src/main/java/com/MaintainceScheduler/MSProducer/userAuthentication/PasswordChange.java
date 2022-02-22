package com.MaintainceScheduler.MSProducer.userAuthentication;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PasswordChange {

    private String username;
    private String oldPassword;
    private String newPassword;
}
