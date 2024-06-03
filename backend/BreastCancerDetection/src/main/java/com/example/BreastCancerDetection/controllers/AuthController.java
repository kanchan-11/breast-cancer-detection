package com.example.BreastCancerDetection.controllers;

import com.example.BreastCancerDetection.config.jwtProvider;
import com.example.BreastCancerDetection.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.BreastCancerDetection.repositories.UserRepository;
import com.example.BreastCancerDetection.request.LoginRequest;
import com.example.BreastCancerDetection.responses.AuthResponse;
import com.example.BreastCancerDetection.services.CustomUserDetailsService;
import com.example.BreastCancerDetection.services.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User user) throws Exception {

        User isExist = userRepository.findByEmail(user.getEmail());
        if(isExist!=null)
        {
            throw new Exception("This email is already being used in another account...");
        }

        User newUser = new User();

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setGender(user.getGender());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setProfilePicture(user.getProfilePicture());

        User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());
        String token = jwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(token,"Signup success");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest){

        Authentication authentication = authenticate(loginRequest.getEmail(),loginRequest.getPassword());
        String token = jwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(token,"Signin success");
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
        if(userDetails==null){
            throw new BadCredentialsException("invalid username...");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("incorrect password...");
        }
        return  new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
