import numpy as np #for making numpy arrays
import pandas as pd # for making pandas dataframe as structured tables as data set is in the form of csv files
import sklearn.datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

#loading the data from sklearn
# it is in the form of numpy array with key value pairs like a dictionary like data is a key target is a key feature names is a key
breast_cancer_dataset = sklearn.datasets.load_breast_cancer()
# print(breast_cancer_dataset)

#loading the data to pandas dataframe
data_frame=pd.DataFrame(breast_cancer_dataset.data,columns = breast_cancer_dataset.feature_names)

# data_frame.head() # print first 5 rows of data_frame

#adding the target column to the data frame
data_frame['diagnosis'] = breast_cancer_dataset.target

# printing last 5 rows of the data frame
# data_frame.tail()

#print number of columns and rows in a dataframe
# data_frame.shape # it returns tuple 569 rows and 31 columns

#getting some information about data frame
# data_frame.info()

#checking for missing values
# data_frame.isnull().sum()

#statistical measures about the dataset
# data_frame.describe()

#checking the distribution of target variable
# data_frame['diagnosis'].value_counts()

#group this dataset based on the 'diagnosis'
# data_frame.groupby('diagnosis').mean() #see dangerous values in both cases

#seperating the features and target
X=data_frame.drop(columns='diagnosis',axis=1) #dropping a column so axis=1 for row asix=0
Y=data_frame['diagnosis']
num_input_parameters = X.shape[1]
# print("Number of input parameters:", num_input_parameters)

# print(X)

# print(Y)

#Splitting data into training and testing data
X_train,X_test,Y_train,Y_test = train_test_split(X,Y,test_size=0.2,random_state=2)

# print(X.shape,X_train.shape,X_test.shape)

#logistic regression
model = LogisticRegression()

#training the logistic regression model using training data
model.fit(X_train,Y_train) #tries to find relation between x values and y

#accuracy score on training data
x_train_prediction  = model.predict(X_train)
training_data_accuracy = accuracy_score(Y_train,x_train_prediction)
# print("Accuracy on training data: ",training_data_accuracy)

#accuracy score on test data
x_test_prediction  = model.predict(X_test)
testing_data_accuracy = accuracy_score(Y_test,x_test_prediction)
# print("Accuracy on testing data: ",testing_data_accuracy)

# Assuming X_test is your DataFrame or Series
indexes_in_X_test = X_test.index

# print("Total indexes in X_test:", len(indexes_in_X_test))

# Ask the user to input a position
user_position_input = input("Enter a position (from 0 to {}): ".format(len(indexes_in_X_test) - 1))

# Check if the user input is a valid position
if user_position_input.isdigit():
    user_position = int(user_position_input)
    if 0 <= user_position < len(indexes_in_X_test):
        user_index = indexes_in_X_test[user_position]
        print("Actual index:",user_index)
    else:
        print("Invalid position. Please enter a position within the range.")
else:
    print("Invalid input. Please enter a valid numeric position.")


# Selecting a random index from X_test
random_index = X_test.sample().index[0]
random_index= user_index
# Extracting the value from X_test at the random index
random_sample_X = X_test.loc[random_index]

#reshpe the numpy array  as we are predicting  for one datapoint
random_sample_reshape=random_sample_X.values.reshape(1,-1)

# Extracting the corresponding value from Y_test at the same index
corresponding_Y = Y_test.loc[random_index]

#model making prediction on the sleected sample test case
prediction  = model.predict(random_sample_reshape)
if(prediction==1):
  print("Benign")
else:
  print("Malignant")

    #comparing predicted value and actual diagnosis
if(prediction==corresponding_Y):
  print("Correct diagnosis prediction")
else:
  print("Incorrect diagnosis prediction")

import joblib

# Assuming 'model' is your trained scikit-learn model
joblib.dump(model, 'trained_model.joblib')

# Load the serialized model
loaded_model = joblib.load('trained_model.joblib')

# Check model attributes
# print("Model attributes:", dir(loaded_model))

predictions = loaded_model.predict(X_test)

# Print predictions
# print("Predictions:", predictions)

import random
from flask import Flask
from flask import jsonify
app = Flask(__name__)

@app.route('/signup', methods=['GET'])
def signup():
    with app.app_context():
        # Randomly select patients for the user
        num_patients_to_allocate = 10 
        patient_indices = np.random.choice(len(X_test), num_patients_to_allocate, replace=False)

        # List of common first names
        firstNames = ["Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Evelyn", "Abigail", "Harper", "Emily", "Elizabeth", "Avery", "Sofia", "Ella", "Madison", "Scarlett", "Grace", "Chloe"]

        # List of common last names
        lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson"]

        # List of ages (between 10 and 80)
        ages = [random.randint(10, 80) for _ in range(20)]

        # Shuffle the lists to randomize order
        random.shuffle(firstNames)
        random.shuffle(lastNames)
        random.shuffle(ages)

        selected_patients = {
            'firstNames': random.sample(firstNames, 10),
            'lastNames': random.sample(lastNames, 10),
            'ages': random.sample(ages, 10),
            'genders': ['Female'] * 20,
            'labels': Y_test.iloc[patient_indices].values.tolist()
        }
        
        # Make predictions using the loaded model
        predictions = model.predict(X_test.iloc[patient_indices])
        
        # Append predictions to the response data
        selected_patients['predictions'] = predictions.tolist()
        
        # Here, you would typically associate the selected patients with the newly created user
        # You can store this association in your database

        return jsonify({'message': 'User signed up successfully', 'selected_patients': selected_patients}), 201


# type(signup()[0])
response, status_code = signup()  # Assuming signup() returns a tuple with a Flask response object and a status code
response_content = response.get_data(as_text=True)  # Get the response content as text
print(response_content)
print("Status Code:", status_code)

if __name__ == "__main__":
    app.run(debug=True,port=5000)
