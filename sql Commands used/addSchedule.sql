use AlohaRailways;
CREATE TABLE Routes (
    Route_ID INT AUTO_INCREMENT PRIMARY KEY,
    Route VARCHAR(255),
    From_station_ID INT,
    To_station_ID INT
);

CREATE TABLE Schedule (
    Departure_Time TIME,
    Arrival_Time TIME,
    Train_ID INT,
    Route_ID INT,
    FOREIGN KEY (Train_ID) REFERENCES Train(Train_ID),
    FOREIGN KEY (Route_ID) REFERENCES Routes(Route_ID)
);

--procedure which adds both a schedule and a route, this would prevent the creation of routes which arent possible


DROP PROCEDURE IF EXISTS InsertScheduleAndRoute;
DELIMITER $$
CREATE PROCEDURE InsertScheduleAndRoute(
    IN p_Departure_Time TIME,
    IN p_Arrival_Time TIME,
    IN p_Train_ID INT,
    IN p_Route VARCHAR(255),
    IN p_From_station_ID INT,
    IN p_To_station_ID INT
)
BEGIN
    DECLARE v_Route_ID INT;
    DECLARE exit handler for sqlexception
    BEGIN
        -- error occurred, rollback the transaction
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO Routes (Route, From_station_ID, To_station_ID) 
    VALUES (p_Route, p_From_station_ID, p_To_station_ID);

    SET v_Route_ID = LAST_INSERT_ID();

    INSERT INTO Schedule (Departure_Time, Arrival_Time, Train_ID, Route_ID) 
    VALUES (p_Departure_Time, p_Arrival_Time, p_Train_ID, v_Route_ID);

    COMMIT;
END$$
DELIMITER ;