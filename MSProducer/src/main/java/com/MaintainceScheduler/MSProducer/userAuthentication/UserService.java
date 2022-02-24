package com.MaintainceScheduler.MSProducer.userAuthentication;

import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public CustomUser findUserByUserName(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user != null) {
            CustomUser customUser = new CustomUser(
                    user.get().getId(),
                    user.get().getFname(),
                    user.get().getLname(),
                    user.get().getUsername(),
                    user.get().getEmail(),
                    user.get().getRole(),
                    user.get().getIsLocked(),
                    user.get().getIsEnabled()
            );
            return customUser;
        } else {
            return null;
        }
    }

    public void changePassword(PasswordChange passwordChange) {
        Optional<User> user = userRepository.findByUsername(passwordChange.getUsername());
        if (user == null) {
            throw new RuntimeException("Username does not exist.");
        } else {
            boolean isMatch = bCryptPasswordEncoder
                    .matches(passwordChange.getOldPassword(), user.get().getPassword());
            if (isMatch) {
                String encodedPassword = bCryptPasswordEncoder
                        .encode(passwordChange.getNewPassword());
                user.get().setPassword(encodedPassword);
                userRepository.save(user.get());
            }
            else {
                throw new RuntimeException("Invalid old password");
            }
        }
    }

    public void resetPassword(Long id, String password) {
        Optional<User> user = userRepository.findById(id);
        if (user == null) {
            throw new RuntimeException("Username does not exist.");
        } else {
            String encodedPassword = bCryptPasswordEncoder
                    .encode(password);
            user.get().setPassword(encodedPassword);
            userRepository.save(user.get());
        }
    }

    public void enableDisableUser(Long id, Boolean isEnabled) {
        if (isEnabled) {
            userRepository.disableUser(id);
        } else {
            userRepository.enableUser(id);
        }
    }
}
