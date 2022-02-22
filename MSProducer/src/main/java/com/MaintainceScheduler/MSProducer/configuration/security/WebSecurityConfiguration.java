package com.MaintainceScheduler.MSProducer.configuration.security;

import com.MaintainceScheduler.MSProducer.ApplicationStaticProperties;
import com.MaintainceScheduler.MSProducer.userAuthentication.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private UserService userService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/api/" + ApplicationStaticProperties.version + "/admin/**").hasAuthority("ADMIN")
                .antMatchers("/api/" + ApplicationStaticProperties.version + "/login").authenticated()
                .antMatchers("/api/" + ApplicationStaticProperties.version + "/getProfile").authenticated()
                .antMatchers("/api/" + ApplicationStaticProperties.version + "/changePassword").authenticated()
                .antMatchers("/api/" + ApplicationStaticProperties.version + "/user/**").authenticated()
                .antMatchers("/").permitAll()
                .anyRequest().authenticated()
                .and()
                //.formLogin();
                .httpBasic();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(userService);
        return provider;
    }
}
