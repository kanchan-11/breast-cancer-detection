package com.example.BreastCancerDetection.services;

import com.example.BreastCancerDetection.config.jwtProvider;
import com.example.BreastCancerDetection.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.BreastCancerDetection.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;
    @Override
    public User registerUser(User user) {
        User newUser = new User();

        newUser.setId(user.getId());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setGender(user.getGender());
        newUser.setPassword(user.getPassword());
        newUser.setProfilePicture(user.getProfilePicture());

        User savedUser = userRepository.save(newUser);
        return savedUser;
    }

    @Override
    public User findUserById(Integer id) throws Exception {
        Optional<User> optionalUser =  userRepository.findById(id);

        if(optionalUser.isPresent())
            return optionalUser.get();

        throw new Exception("User not exists with id: "+id);
    }

    @Override
    public User findUserByEmail(String email) {

        User user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public User updateUser(User user, Integer id) throws Exception {
        Optional<User> optionalUser= userRepository.findById(id);

        if(!optionalUser.isPresent())
            throw new Exception("User not exists with id: "+id);

        User oldUser = optionalUser.get();
        if(user.getFirstName()!=null)
            oldUser.setFirstName(user.getFirstName());
        if(user.getLastName()!=null)
            oldUser.setLastName(user.getLastName());
        if(user.getEmail()!=null)
            oldUser.setEmail(user.getEmail());
        if(user.getPassword()!=null)
            oldUser.setPassword(user.getPassword());
        if(user.getGender()!=null)
            oldUser.setGender(user.getGender());
        if(user.getProfilePicture()!=null)
            oldUser.setProfilePicture(user.getProfilePicture());

        User updatedUser = userRepository.save(oldUser);
        return updatedUser;
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);
        return user;
    }
}
