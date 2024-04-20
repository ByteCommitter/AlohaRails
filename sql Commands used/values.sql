-- Insert into Train
INSERT INTO Train VALUES (1, 'Train A', 'Running', 'Express');
INSERT INTO Train VALUES (2, 'Train B', 'Running', 'Local');
INSERT INTO Train VALUES (3, 'Train C', 'Not Running', 'Express');
INSERT INTO Train VALUES (4, 'Train D', 'Running', 'Local');

-- Insert into Coaches
INSERT INTO Coaches VALUES (1, 'AC', 60, 1);
INSERT INTO Coaches VALUES (2, 'Non-AC', 70, 1);
INSERT INTO Coaches VALUES (3, 'AC', 60, 2);
INSERT INTO Coaches VALUES (4, 'Non-AC', 70, 2);

-- Insert into Station
INSERT INTO Station VALUES (1, 'Station A', 5, 'City A', 'Waiting Room');
INSERT INTO Station VALUES (2, 'Station B', 3, 'City B', 'Waiting Room, Food Court');
INSERT INTO Station VALUES (3, 'Station C', 4, 'City C', 'Waiting Room');
INSERT INTO Station VALUES (4, 'Station D', 2, 'City D', 'Waiting Room, Food Court');

-- Insert into Routes
INSERT INTO Routes VALUES (1, 'Route A', 1, 2);
INSERT INTO Routes VALUES (2, 'Route B', 2, 3);
INSERT INTO Routes VALUES (3, 'Route C', 3, 4);
INSERT INTO Routes VALUES (4, 'Route D', 4, 1);

-- Insert into Schedule
INSERT INTO Schedule VALUES (TO_TIMESTAMP('2022-01-01 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2022-01-01 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), 1, 1);
INSERT INTO Schedule VALUES (TO_TIMESTAMP('2022-01-02 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2022-01-02 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 2);
INSERT INTO Schedule VALUES (TO_TIMESTAMP('2022-01-03 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2022-01-03 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), 3, 3);
INSERT INTO Schedule VALUES (TO_TIMESTAMP('2022-01-04 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP('2022-01-04 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), 4, 4);

-- Insert into Employee
INSERT INTO Employee VALUES ('John', 'Doe', '1234567890', 'Morning', 'Station Master', 1);
INSERT INTO Employee VALUES ('Jane', 'Doe', '0987654321', 'Evening', 'Ticket Collector', 2);
INSERT INTO Employee VALUES ('Jim', 'Beam', '1122334455', 'Night', 'Station Master', 3);
INSERT INTO Employee VALUES ('Jack', 'Daniels', '5566778899', 'Morning', 'Ticket Collector', 4);