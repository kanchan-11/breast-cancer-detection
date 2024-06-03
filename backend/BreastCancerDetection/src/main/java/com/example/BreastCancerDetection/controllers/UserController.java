package com.example.BreastCancerDetection.controllers;

import com.example.BreastCancerDetection.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.BreastCancerDetection.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.BreastCancerDetection.services.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) throws Exception{

        return new ResponseEntity<>(userService.findUserById(id),HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user,@RequestHeader("Authorization") String jwt) throws Exception {
        User requestingUser = userService.findUserByJwt(jwt);
        return new ResponseEntity<>(userService.updateUser(user,requestingUser.getId()),HttpStatus.ACCEPTED);
    }

    @DeleteMapping
    public String deleteUser(@RequestHeader("Authorization") String jwt) throws Exception {
        User requestingUser = userService.findUserByJwt(jwt);
        Integer id = requestingUser.getId();
        Optional<User> optionalUser = userRepository.findById(id);
        if(!optionalUser.isPresent())
            throw new Exception("User not exists with id: "+id);

        userRepository.delete(optionalUser.get());

        return "User with id "+ id+" deleted successfully";
    }
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteUser(@PathVariable int id) throws Exception
//    {
//        Optional<User> user = userRepository.findById(id);
//        if(!user.isPresent())
//        {
//            throw new Exception("User not exists with the id: "+id);
//        }
//        userRepository.delete(user.get());
//        return new ResponseEntity<>("User deleted successfully with id: "+id,HttpStatus.OK);
//    }

    @GetMapping("/search")
    public List<User> searchUser(@RequestParam("query") String query){
        List<User> users = userRepository.searchUser(query);
        return users;
    }

    @GetMapping("/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);
        user.setPassword(null);
        return user;
    }
}
