from flask import Flask, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_cursor():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="AlohaRailways"
    )
    return db, db.cursor()



@app.route('/addtrain',  methods=['GET', 'POST'])
def add_train():
    db, cursor = get_db_cursor()
    # Get train data from the JSON body
    data = request.get_json()
    Train_ID = data['Train_ID']
    Name = data['Name']
    Train_Status = data['Train_Status']
    Type = data['Type']

    

    # Check if Train_ID already exists
    cursor.execute("SELECT * FROM train WHERE Train_ID = %s", (Train_ID,))
    if cursor.fetchone() is not None:
        cursor.close()
        db.close()
        return 'Train ID already exists!', 400

    # Create the SQL query
    add_train_query = ("INSERT INTO train "
                       "(Train_ID, Name, Train_Status, Type) "
                       "VALUES (%s, %s, %s, %s)")

    # Execute the query
    cursor.execute(add_train_query, (Train_ID, Name, Train_Status, Type))
    
    # Commit the changes
    db.commit()

    # Close the cursor and connection
    cursor.close()
    db.close()

    return 'Train added successfully!', 200


@app.route('/addemployee', methods=['GET', 'POST'])
def add_employee():
    db, cursor = get_db_cursor()
    # Get employee data from the JSON body
    data = request.get_json()
    First_Name = data['First_Name']
    Last_Name = data['Last_Name']
    Contact_Details = data['Contact_Details']
    Shift = data['Shift']
    Designation = data['Designation']
    Station_ID = data['Station_ID']

    

    # Create the SQL query
    add_employee_query = ("INSERT INTO employee "
                          "(First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) "
                          "VALUES (%s, %s, %s, %s, %s, %s)")

    # Execute the query
    cursor.execute(add_employee_query, (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID))
    
    # Commit the changes
    db.commit()

    return 'Employee added successfully!', 200



if __name__ == '__main__':
    app.run(debug=True)