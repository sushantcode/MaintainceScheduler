package com.MaintainceScheduler.MSProducer.userAuthentication;

import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private static final Logger logger = LogManager.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void addNewUser(User user) {
        boolean userExists = userRepository
                .findByUsername(user.getUsername())
                .isPresent();
        logger.info(user);
        if (userExists) {
            throw new IllegalStateException("Username already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(user.getPassword());

        user.setPassword(encodedPassword);

        userRepository.save(user);
    }

    public List<User> findUsers() {
        List<User> userList = userRepository.findAll();
        for (User u : userList) {
            u.setPassword("********");
        }
        return userList;
    }

    public void enableDisableUser(Long id, Boolean isEnabled) {
        if (isEnabled) {
            userRepository.disableUser(id);
        } else {
            userRepository.enableUser(id);
        }
    }
}
