use AlohaRailways;

DROP table employee;

CREATE TABLE Employee (
    Serial_no INT AUTO_INCREMENT PRIMARY KEY,
    First_Name VARCHAR(255) NOT NULL,
    Last_Name VARCHAR(255) NOT NULL,
    Contact_Details VARCHAR(15) NOT NULL UNIQUE,
    Shift INT NOT NULL,
    Designation ENUM('loco pilot', 'Ticket Collector', 'Station Master') NOT NULL,
    Station_ID INT NOT NULL
);

DROP TRIGGER IF EXISTS before_employee_insert;

DELIMITER //
CREATE TRIGGER before_employee_insert
BEFORE INSERT ON Employee
FOR EACH ROW
BEGIN
    DECLARE station_count INT;
    DECLARE shift_count INT;

    SELECT COUNT(DISTINCT Station_ID) INTO station_count FROM Employee WHERE Contact_Details = NEW.Contact_Details;
    IF station_count + 1 > 2 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This employee cannot work in more than 2 stations.';
    END IF;

    SELECT COUNT(DISTINCT Shift) INTO shift_count FROM Employee WHERE Contact_Details = NEW.Contact_Details;
    IF shift_count + (CASE WHEN station_count = 0 THEN 1 ELSE 0 END) > 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This employee cannot work in more than 1 shift.';
    END IF;
END;
//
DELIMITER ;

INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('John', 'Doe', '1234567890', 1, 'Ticket Collector', 1);
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('Jane', 'Doe', '0987654321', 2, 'Ticket Collector', 2);
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('Bob', 'Smith', '1122334455', 3, 'loco pilot', 1);
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('Alice', 'Johnson', '2233445566', 1, 'loco pilot', 2);
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('Charlie', 'Brown', '3344556677', 2, 'Ticket Collector', 1);
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('David', 'Williams', '4455667788', 3, 'Ticket Collector', 2);
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('Eve', 'Davis', '5566778899', 1, 'Station Master', 1);
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('Frank', 'Miller', '6677889900', 2, 'Station Master', 2);
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('Grace', 'Wilson', '7788990011', 3, 'Ticket Collector', 1);
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID) VALUES ('Harry', 'Moore', '8899001122', 1, 'Ticket Collector', 2);
