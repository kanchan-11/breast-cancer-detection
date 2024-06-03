package com.example.BreastCancerDetection.controllers;

import com.example.BreastCancerDetection.models.Patient;
import com.example.BreastCancerDetection.models.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.BreastCancerDetection.repositories.PatientRepository;
import com.example.BreastCancerDetection.responses.ApiResponse;
import com.example.BreastCancerDetection.services.PateintService;
import com.example.BreastCancerDetection.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    PateintService pateintService;
    @Autowired
    UserService userService;
    @Autowired
    PatientRepository patientRepository;

    @PostMapping("/user")
    public ResponseEntity<List<Patient>> createPatients(@RequestHeader("Authorization") String jwt) throws Exception {
        User requestingUser = userService.findUserByJwt(jwt);
        List<Patient> patients = pateintService.createPatient(requestingUser.getId());

        patientRepository.saveAll(patients);

        return new ResponseEntity<>(patients, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/user")
    public ResponseEntity<ApiResponse> deletePatient(@PathVariable("id") Integer patientId,
                                                     @RequestHeader("Authorization") String jwt) throws Exception {
        User requestingUser = userService.findUserByJwt(jwt);
        String message = pateintService.deletePatient(patientId,requestingUser.getId());
        ApiResponse response = new ApiResponse(message,true);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> findPatientById(@PathVariable Integer id) throws Exception {
        Patient patient = pateintService.getPatientById(id);
        return new ResponseEntity<>(patient,HttpStatus.ACCEPTED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Patient>> findUsersPatients(@RequestHeader("Authorization") String jwt)
    {
        User requestingUser = userService.findUserByJwt(jwt);
        List<Patient> patients = pateintService.findPatientsByUserId(requestingUser.getId());
        return new ResponseEntity<>(patients,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Patient>> findPatients()
    {
        List<Patient> patients = pateintService.findAllPatients();
        return new ResponseEntity<>(patients,HttpStatus.OK);
    }
}
