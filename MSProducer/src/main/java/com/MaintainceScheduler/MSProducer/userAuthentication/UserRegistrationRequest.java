package com.MaintainceScheduler.MSProducer.userAuthentication;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Data
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@ApiModel
public class UserRegistrationRequest {
    private final String fname;
    private final String lname;
    private final String username;
    private final String email;
    private final String password;
}
