from typing import OrderedDict
from flask import Flask, request
import mysql.connector
from flask_cors import CORS
from flask import jsonify
from datetime import timedelta
import logging 

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


@app.route('/deleteschedule', methods=['DELETE'])
def delete_schedule():
    db, cursor = get_db_cursor()
    # Get Train_ID from the JSON body
    data = request.get_json()
    Train_ID = int(data['Train_ID'])  # Convert to integer

    rows_affected = 0
    try:
        # Call the stored procedure
        results = cursor.callproc('DeleteSchedule', [Train_ID, 0])

        # Get the value of the OUT parameter
        if results:
            rows_affected = results[1]

        # Commit the changes
        db.commit()

    except mysql.connector.Error as err:
        raise  # Re-raise the exception if any error occurs

    finally:
        # Close the cursor and connection
        cursor.close()
        db.close()

    if rows_affected == 0:
        return 'No schedule found with the given Train_ID!', 400
    else:
        return 'Schedule deleted successfully!', 200
    


import logging

@app.route('/getschedule', methods=['GET'])
def get_schedule():
    logging.info('Received request for get_schedule')

    db, cursor = get_db_cursor()
    # Get Train_ID from the query parameters
    Train_ID = int(request.args.get('Train_ID'))  # Convert to integer

    try:
        # Call the stored procedure
        logging.info('Calling stored procedure GetSchedule with Train_ID %s', Train_ID)
        results = cursor.callproc('GetSchedule', [Train_ID])

        # Get the results
        logging.info('Getting results from stored procedure')
        schedules = []
        for result in cursor.stored_results():
            schedules = [dict(zip(result.column_names, row)) for row in result.fetchall()]

    except mysql.connector.Error as err:
        logging.error('Error occurred: %s', err)
        raise  # Re-raise the exception if any error occurs

    finally:
        # Close the cursor and connection
        cursor.close()
        db.close()

    if not schedules:
        return 'Train doesn\'t have a schedule!', 400
    else:
        for schedule in schedules:
            if 'Departure_Time' in schedule and isinstance(schedule['Departure_Time'], timedelta):
                # Convert timedelta to a string
                schedule['Departure_Time'] = str(schedule['Departure_Time'])
            if 'Arrival_Time' in schedule and isinstance(schedule['Arrival_Time'], timedelta):
                # Convert timedelta to a string
                schedule['Arrival_Time'] = str(schedule['Arrival_Time'])

            # Create a new ordered dictionary with 'Name' as the first key
            ordered_schedule = OrderedDict([('Name', schedule['Name'])] + [(k, schedule[k]) for k in schedule if k != 'Name'])
            schedules[schedules.index(schedule)] = ordered_schedule

        return jsonify(schedules), 200
    

@app.route('/getstation/<int:Station_ID>', methods=['GET'])
def get_station(Station_ID):
    db, cursor = get_db_cursor()

    try:
        # Call the stored procedure
        cursor.callproc('GetStationDetails', [Station_ID])

        # Get the results
        station = []
        for result in cursor.stored_results():
            station = [dict(zip(result.column_names, row)) for row in result.fetchall()]

    except mysql.connector.Error as err:
        logging.error('Error occurred: %s', err)
        raise  # Re-raise the exception if any error occurs

    finally:
        # Close the cursor and connection
        cursor.close()
        db.close()

    if not station:
        return 'No station found with the given Station_ID!', 400
    else:
        return jsonify(station), 200
    

@app.route('/deleteemployee', methods=['DELETE'])
def delete_employee():
    db, cursor = get_db_cursor()
    # Get Contact_Details from the JSON body
    data = request.get_json()
    Contact_Details = data['Contact_Details']

    try:
        # Create the SQL query
        delete_employee_query = "DELETE FROM Employee WHERE Contact_Details = %s"

        # Execute the query
        cursor.execute(delete_employee_query, (Contact_Details,))

        # Commit the changes
        db.commit()

    except mysql.connector.Error as err:
        if err.errno == 1644:  # Custom MySQL error for station master deletion
            return 'Cannot delete this Station Master as it would leave a station without a Station Master!', 400
        else:
            raise  # Re-raise the exception if it's not a station master deletion error

    finally:
        # Close the cursor and connection
        cursor.close()
        db.close()

    if cursor.rowcount == 0:
        return 'No employee found with the given Contact_Details, or deletion would leave a station without a Station Master!', 400
    else:
        return 'Employee deleted successfully!', 200


if __name__ == '__main__':
    app.run(debug=True)