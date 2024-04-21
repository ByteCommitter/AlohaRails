
DROP TRIGGER IF EXISTS check_station_master_before_delete;
DELIMITER //
CREATE TRIGGER check_station_master_before_delete
BEFORE DELETE ON Employee
FOR EACH ROW
BEGIN
   IF OLD.Designation = 'Station Master' AND
      (SELECT COUNT(*) FROM Employee WHERE Station_ID = OLD.Station_ID AND Designation = 'Station Master') <= 1 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Every station must have at least one station master';
   END IF;
END;
//
DELIMITER ;
INSERT INTO Employee (First_Name, Last_Name, Contact_Details, Shift, Designation, Station_ID)
VALUES ('Jerry', 'Thomas', '8901234567', 2, 'Station Master', 1),
       ('Jessica', 'Taylor', '9012345678', 3, 'Station Master', 2),
       ('Jeff', 'Anderson', '0123456789', 1, 'Station Master', 3),
       ('Jennifer', 'Martin', '1234509876', 2, 'Station Master', 4),
       ('Jeremy', 'Thompson', '2345609871', 3, 'Station Master', 5),
       ('Jasmine', 'White', '3456709812', 1, 'Station Master', 6),
       ('Jacob', 'Harris', '4567098123', 2, 'Station Master', 7);
       
Select * from employee;
