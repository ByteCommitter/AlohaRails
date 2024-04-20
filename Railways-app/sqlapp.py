from flask import Flask, request
import cx_Oracle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/addtrain',  methods=['GET', 'POST'])
def add_train():
    try:
        # Connect to the Oracle database
        dsn_tns = cx_Oracle.makedsn('localhost', '1521', service_name='xe') # replace with your Oracle DB details
        db = cx_Oracle.connect(user='sys', password='root', dsn=dsn_tns)
    except cx_Oracle.DatabaseError as e:
        error, = e.args
        if error.code == 12541:
            return 'Database connection error: TNS:no listener. Please check your Oracle database configuration.', 500
        else:
            return 'Database connection error: {}'.format(error.message), 500

    # Get train data from the JSON body
    data = request.get_json()
    Train_ID = data['Train_ID']
    Name = data['Name']
    Train_Status = data['Train_Status']
    Type = data['Type']

    # Create a cursor
    cursor = db.cursor()

    # Check if Train_ID already exists
    cursor.execute("SELECT * FROM train WHERE Train_ID = :id", id=Train_ID)
    if cursor.fetchone() is not None:
        cursor.close()
        db.close()
        return 'Train ID already exists!', 400

    # Create the SQL query
    add_train_query = ("INSERT INTO train "
                       "(Train_ID, Name, Train_Status, Type) "
                       "VALUES (:id, :name, :status, :type)")

    # Execute the query
    cursor.execute(add_train_query, id=Train_ID, name=Name, status=Train_Status, type=Type)
    
    # Commit the changes
    db.commit()

    # Close the cursor and connection
    cursor.close()
    db.close()

    return 'Train added successfully!', 200


if __name__ == '__main__':
    app.run(debug=True)