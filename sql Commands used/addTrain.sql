--this sql file adds train and coaches to the database...

--ignore error if it shows up
use AlohaRailways;


CREATE TABLE Train (
    Train_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Status VARCHAR(255),
    Type ENUM('Diesel', 'Electric')
);

CREATE TABLE Coaches (
    Coach_ID INT AUTO_INCREMENT PRIMARY KEY,
    Coach_Type ENUM('AC', 'Non-AC'),
    No_AC INT CHECK (No_AC BETWEEN 0 AND 15),
    No_NAC INT CHECK (No_NAC BETWEEN 0 AND 20),
    Train_ID INT,
    FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID)
);


DROP TRIGGER IF EXISTS check_coach_capacity;
DELIMITER //
CREATE PROCEDURE InsertTrainAndCoaches(IN p_Train_ID INT, IN p_Name VARCHAR(255), IN p_Status VARCHAR(255), IN p_Type ENUM('Diesel', 'Electric'), IN p_Coach_Type ENUM('AC', 'Non-AC'), IN p_No_AC INT, IN p_No_NAC INT)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    -- Rollback the transaction on error
    ROLLBACK;
  END;

  -- Start a new transaction
  START TRANSACTION;

  -- Insert the new train
  INSERT INTO Train (Train_ID, Name, Status, Type) VALUES (p_Train_ID, p_Name, p_Status, p_Type);

  -- Insert the coaches
  INSERT INTO Coaches (Coach_Type, No_AC, No_NAC, Train_ID) VALUES (p_Coach_Type, p_No_AC, p_No_NAC, p_Train_ID);

  -- Check the capacity
  IF p_Type = 'Diesel' AND (10 * p_No_AC + 5 * p_No_NAC > 100) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Capacity exceeded for Diesel train';
  ELSEIF p_Type = 'Electric' AND (10 * p_No_AC + 5 * p_No_NAC > 150) THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Capacity exceeded for Electric train';
  END IF;

  -- Commit the transaction
  COMMIT;
END;//
DELIMITER ;


--CALL InsertTrainAndCoaches(1, 'Train 1', 'Running', 'Diesel', 'AC', 11, 0); -- This should fail
--CALL InsertTrainAndCoaches(2, 'Train 2', 'Running', 'Electric', 'AC', 16, 0); -- This should fail
--CALL InsertTrainAndCoaches(3, 'Train 3', 'Running', 'Diesel', 'AC', 10, 0); -- This should succeed
--CALL InsertTrainAndCoaches(4, 'Train 4', 'Running', 'Electric', 'AC', 15, 0); -- This should succeed

--Test Cases are functional...

CALL InsertTrainAndCoaches(1, 'Aloha Express', 'Running', 'Diesel', 'AC', 5, 5);
CALL InsertTrainAndCoaches(2, 'Hawaii Island Hopper', 'Running', 'Electric', 'AC', 7, 8);
CALL InsertTrainAndCoaches(3, 'Pacific Surfliner', 'Running', 'Diesel', 'Non-AC', 4, 6);
CALL InsertTrainAndCoaches(4, 'Maui Coastal Cruiser', 'Running', 'Electric', 'Non-AC', 6, 9);
CALL InsertTrainAndCoaches(5, 'Honolulu Hustler', 'Running', 'Diesel', 'AC', 8, 2);
CALL InsertTrainAndCoaches(6, 'Kauai Cliffhanger', 'Running', 'Electric', 'AC', 10, 5);