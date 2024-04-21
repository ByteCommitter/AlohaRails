DROP PROCEDURE IF EXISTS DeleteSchedule;
DELIMITER $$
CREATE PROCEDURE DeleteSchedule(
    IN p_Train_ID INT,
    OUT p_Rows_Affected INT
)
BEGIN
    DELETE FROM Schedule WHERE Train_ID = p_Train_ID;
    SET p_Rows_Affected = ROW_COUNT();
END$$
DELIMITER ;
CALL DeleteSchedule(1023, @Rows_Affected);
SELECT @Rows_Affected;