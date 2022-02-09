package com.MaintainceScheduler.MSProducer.userAuthentication;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Data
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@ApiModel
public class UserRegistrationRequest {
    private final String fName;
    private final String lName;
    private final String username;
    private final String email;
    private final String password;
}
