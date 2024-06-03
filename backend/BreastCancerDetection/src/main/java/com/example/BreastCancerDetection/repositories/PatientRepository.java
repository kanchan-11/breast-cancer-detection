package com.example.BreastCancerDetection.repositories;

import com.example.BreastCancerDetection.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient,Integer> {

    @Query("SELECT p FROM Patient p WHERE p.user.id=:userId")
    List<Patient> findPatientByUserId(Integer userId);
}
