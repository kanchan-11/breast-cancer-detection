package com.example.BreastCancerDetection.services;

import com.example.BreastCancerDetection.models.Patient;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface PateintService {

    public List<Patient> createPatient(Integer userId) throws Exception;
    public String deletePatient(Integer id,Integer userId) throws Exception;
    public Patient getPatientById(Integer id) throws Exception;
    public List<Patient> findPatientsByUserId(Integer userId);
    public String getPatientDiagnosis(Integer id) throws Exception;
    public List<Patient>  findAllPatients();
}
