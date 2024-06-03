package com.example.BreastCancerDetection.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Patient
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    private Integer age;
    @ManyToOne
    private User user;
    private String gender;
    private Integer predictedDiagnosis;
    private Integer actualDiagnosis;

    public Patient(String firstName,String lastName, Integer age,
                   String gender, Integer predictedDiagnosis, Integer actualDiagnosis, User user) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.user = user;
        this.gender = gender;
        this.predictedDiagnosis = predictedDiagnosis;
        this.actualDiagnosis = actualDiagnosis;
    }
}

