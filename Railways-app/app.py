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

@app.route('/addtrain',  methods=['POST'])
def add_train():
    db, cursor = get_db_cursor()
    # Get train data from the JSON body
    data = request.get_json()
    Train_ID = data['Train_ID']
    Name = data['Name']
    Train_Status = data['Train_Status']
    Type = data['Type']
    No_AC = int(data['No_AC'])  # Convert to integer
    No_NAC = int(data['No_NAC'])  # Convert to integer

    # Hardcode Coach_Type to 'AC'
    Coach_Type = 'AC'

    # Check if train capacity is exceeded
    if No_AC + No_NAC > 20:
        return 'Train capacity exceeded!', 400

    try:
        # Call the stored procedure
        cursor.callproc('InsertTrainAndCoaches', [Train_ID, Name, Train_Status, Type, Coach_Type, No_AC, No_NAC])

        # Commit the changes
        db.commit()

    except mysql.connector.Error as err:
        if err.errno == 1062:  # Duplicate entry error
            return 'Train Number already in Use!', 400
        elif err.errno == 1644:  # Custom MySQL error for capacity exceeded
            return 'Train capacity exceeded!', 400
        else:
            raise  # Re-raise the exception if it's not a duplicate entry error or a capacity exceeded error

    finally:
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


@app.route('/addschedule', methods=['POST'])
def add_schedule():
    db, cursor = get_db_cursor()
    # Get schedule data from the JSON body
    data = request.get_json()
    Departure_Time = data['Departure_Time']
    Arrival_Time = data['Arrival_Time']
    Train_ID = int(data['Train_ID'])  # Convert to integer
    Route = data['Route']
    From_station_ID = int(data['From_station_ID'])  # Convert to integer
    To_station_ID = int(data['To_station_ID'])  # Convert to integer

    try:
        # Call the stored procedure
        cursor.callproc('InsertScheduleAndRoute', [Departure_Time, Arrival_Time, Train_ID, Route, From_station_ID, To_station_ID])

        # Commit the changes
        db.commit()

    except mysql.connector.Error as err:
        if err.errno == 1062:  # Duplicate entry error
            return 'Schedule already exists!', 400
        elif err.errno == 1452:  # Foreign key constraint fails error
            return 'Invalid Train ID! Please Try again', 400
        else:
            raise  # Re-raise the exception if it's not a duplicate entry error or a foreign key constraint fails error

    finally:
        # Close the cursor and connection
        cursor.close()
        db.close()

    return 'Schedule added successfully!', 200


if __name__ == '__main__':
    app.run(debug=True)