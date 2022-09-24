package com.example.mockproject.config;

import com.example.mockproject.filter.CustomAuthorizationFilter;
import com.example.mockproject.jwt.JwtTokenFilter;
import com.example.mockproject.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class WebSecurityConfig {

    private UserRepository userRepository;
    private JwtTokenFilter jwtTokenFilter;

    public WebSecurityConfig(UserRepository userRepository, JwtTokenFilter jwtTokenFilter) {
        this.userRepository = userRepository;
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepository.findByUsername(username);
            }
        };
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            httpSecurity.authorizeRequests().antMatchers(HttpMethod.POST, "/admin/**").hasAnyAuthority("ADMIN");
            httpSecurity.authorizeRequests().antMatchers(HttpMethod.PUT, "/admin/**").hasAnyAuthority("ADMIN");
            httpSecurity.authorizeRequests().antMatchers(HttpMethod.DELETE, "/admin/**").hasAnyAuthority("ADMIN");
            httpSecurity.authorizeRequests().antMatchers(HttpMethod.POST, "/recommends").permitAll();
            httpSecurity.authorizeRequests().antMatchers(HttpMethod.POST, "/recommends/**").hasAnyAuthority("ADMIN", "USER");
            httpSecurity.authorizeRequests().antMatchers(HttpMethod.GET, "/recommends/users/**").hasAnyAuthority("ADMIN", "USER");
            httpSecurity.authorizeRequests().antMatchers(HttpMethod.POST, "/recommends").permitAll();
            httpSecurity.authorizeRequests().antMatchers(HttpMethod.GET,"/carts/**").hasAnyAuthority("USER", "ADMIN");
        httpSecurity.authorizeRequests().antMatchers(HttpMethod.POST,"/carts/**").hasAnyAuthority("USER", "ADMIN");
        httpSecurity.authorizeRequests().antMatchers(HttpMethod.PUT,"/carts/**").hasAnyAuthority("USER", "ADMIN");
        httpSecurity.authorizeRequests().antMatchers(HttpMethod.POST,"/orders/users/**").hasAnyAuthority("USER", "ADMIN");
//        httpSecurity.authorizeRequests().antMatchers(HttpMethod.PATCH, "/admin/**").hasAnyAuthority("ADMIN");
            httpSecurity.authorizeRequests().anyRequest().permitAll();
        httpSecurity.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}
