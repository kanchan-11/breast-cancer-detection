import React, { useState, useEffect } from 'react'
import {  Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const PatientData = ({patient}) => {

  console.log("patient data ",patient);
  const [loadingPredict, setLoadingPredict] = useState(false);
  const [loadingEvaluate, setLoadingEvaluate] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [evaluation, setEvaluation] = useState(null);

  const handlePredictClick = () => {
    setLoadingPredict(true);
    setTimeout(() => {
      setPrediction(patient.predictedDiagnosis==1?"Malignant":"Begnin");
      setLoadingPredict(false);
    }, 1800);
  };

  const handleEvaluateClick = () => {
    setLoadingEvaluate(true);
    setTimeout(() => {
      setEvaluation(patient.actualDiagnosis==patient.predictedDiagnosis?"Correct prediction":"Incorrect prediction");
      setLoadingEvaluate(false);
    }, 2000);
  };

  useEffect(() => {
    setPrediction(null);
    setEvaluation(null);
  }, [patient]);
  return (
<div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center p-10 border border-gray-300 border border-gray-300 bg-gray-800 dark:bg-white ">      
<p className="mb-6 text-2xl font-bold text-white">Patient Details</p>
      <div className="bg-gray-100 rounded-md p-6 mb-6">
        <p className="text-lg mb-4"><span className="font-semibold">Patient Id:</span> {patient?.id}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Name:</span> {patient?.firstName} {patient?.lastName}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Gender:</span> {patient?.gender}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Age:</span> {patient?.age}</p>
      </div>
      <div className="flex flex-col space-y-6">
        <Button variant="contained" onClick={handlePredictClick} disabled={loadingPredict}>
          {loadingPredict ? 'Predicting...' : 'Predict'}
        </Button>
        <Button variant="contained" onClick={handleEvaluateClick} disabled={loadingEvaluate}>
          {loadingEvaluate ? 'Evaluating...' : 'Evaluate Prediction'}
        </Button>
      </div>
      {prediction && <p className="mt-8 text-lg text-white">Prediction: {prediction}</p>}
      {evaluation && (
        <div className="mt-8 text-lg flex flex-col items-center text-white">
          <div>{evaluation}</div>
          <div className="text-4xl mt-2 ">
            {evaluation === "Correct prediction" ? (
              <CheckIcon style={{ fontSize: 60, color: 'green' }} />
            ) : (
              <CloseIcon style={{ fontSize: 60, color: 'red' }} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientData