package com.example.BreastCancerDetection.services;

import com.example.BreastCancerDetection.models.User;

import java.util.List;

public interface UserService {
    public User registerUser(User user);
    public User findUserById(Integer id) throws Exception;
    public User findUserByEmail(String email);
    public User updateUser(User user,Integer id) throws Exception;
    public List<User> searchUser(String query);
    public User findUserByJwt(String jwt);
}
