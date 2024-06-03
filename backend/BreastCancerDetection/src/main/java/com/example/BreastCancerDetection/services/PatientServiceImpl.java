package com.example.BreastCancerDetection.services;

import com.example.BreastCancerDetection.models.Patient;
import com.example.BreastCancerDetection.models.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.BreastCancerDetection.repositories.PatientRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class PatientServiceImpl implements PateintService{

    @Autowired
    PatientRepository patientRepository;
    @Autowired
    UserService userService;
    @Autowired
    private final RestTemplate restTemplate;

    public PatientServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<Patient> createPatient(Integer userId) throws Exception {
        // interact with python to get patients
        String pythonUrl = "http://localhost:5000/signup";
        String pythonResponse = restTemplate.getForObject(pythonUrl, String.class);

        // Process the response and construct Patient objects
        List<Patient> patients = processPythonResponse(pythonResponse,userId);
//        List<Patient> patients = new ArrayList<>();
        return patients;
    }

    private List<Patient> processPythonResponse(String pythonResponse,Integer userId) throws Exception {
        // Create ObjectMapper instance to convert response into json object
        ObjectMapper objectMapper = new ObjectMapper();
        // Parse Python response into a JSON object
        JsonNode patientsData = objectMapper.readTree(pythonResponse.toString());

        JsonNode firstNamesNode = patientsData.path("selected_patients").path("firstNames");
        JsonNode lastNamesNode = patientsData.path("selected_patients").path("lastNames");
        JsonNode agesNode = patientsData.path("selected_patients").path("ages");
        JsonNode gendersNode = patientsData.path("selected_patients").path("genders");
        JsonNode labelsNode = patientsData.path("selected_patients").path("labels");
        JsonNode predictionsNode = patientsData.path("selected_patients").path("predictions");

        String[] firstNames = objectMapper.convertValue(firstNamesNode, String[].class);
        String[] lastNames = objectMapper.convertValue(lastNamesNode,String[].class);
        int[] ages = objectMapper.convertValue(agesNode, int[].class);
        String[] genders = objectMapper.convertValue(gendersNode,String[].class);
        int[] labels = objectMapper.convertValue(labelsNode, int[].class);
        int[] predictions = objectMapper.convertValue(predictionsNode,int[].class);

        return generateRandomPatients(firstNames,lastNames,ages,genders,labels,predictions,userId);
    }

    private  List<Patient> generateRandomPatients(String[] firstNames, String[] lastNames, int[] ages,
                                                    String[] genders, int[] labels,int[] predictions,
                                                  Integer userId) throws Exception {
        List<Patient> patients = new ArrayList<>();

        User user = userService.findUserById(userId);

        // Generate random patients
        for (int i = 0; i < 10; i++) {
            // Create patient object and add to list
            Patient patient = new Patient(firstNames[i],lastNames[i],ages[i],
                                            genders[i],predictions[i], labels[i],user);
            patients.add(patient);
        }

        return patients;
    }
    @Override
    public String deletePatient(Integer id, Integer userId) throws Exception {
        Patient patient = getPatientById(id);
        User user = userService.findUserById(userId);

        if(user.getId()!=patient.getUser().getId())
            throw new Exception("You are not allowed to delete other User's patient");
        patientRepository.delete(patient);
        return "patient deleted successfully";
    }

    @Override
    public Patient getPatientById(Integer id) throws Exception {
        Optional<Patient> optionalPatient = patientRepository.findById(id);
        if(optionalPatient.isPresent())
            return optionalPatient.get();
        throw new Exception("Patient not found with id: "+id);
    }

    @Override
    public List<Patient> findPatientsByUserId(Integer userId) {
//        System.out.println(patientRepository.findPatientByUserId(userId));
        return patientRepository.findPatientByUserId(userId);
    }


    @Override
    public String getPatientDiagnosis(Integer id) throws Exception {
        Patient patient = getPatientById(id);
        return (patient.getPredictedDiagnosis()==0)?"Malignant":"Begnin";
    }

    @Override
    public List<Patient> findAllPatients() {
        return patientRepository.findAll();
    }
}
