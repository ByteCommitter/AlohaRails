
CREATE TABLE Routes (
    Route_ID INT PRIMARY KEY,
    Route VARCHAR(255),
    From_station_ID INT,
    To_station_ID INT
);
Drop trigger if exists check_route_before_insert;
DELIMITER $$
CREATE TRIGGER check_route_before_insert
BEFORE INSERT ON Routes
FOR EACH ROW
BEGIN
    DECLARE track VARCHAR(2);
    DECLARE next_track VARCHAR(2);
    DECLARE i INT;
    DECLARE valid_route BOOLEAN DEFAULT TRUE;

    SET i = 1;

    WHILE i < CHAR_LENGTH(NEW.Route) DO
        SET track = SUBSTRING(NEW.Route, i, 2);
        SET next_track = SUBSTRING(NEW.Route, i + 2, 2);

        IF FIND_IN_SET(track, '37,73,76,67,46,64,14,41,45,54,52,25') = 0 OR 
           (next_track != '' AND FIND_IN_SET(CONCAT(RIGHT(track, 1), LEFT(next_track, 1)), '37,73,76,67,46,64,14,41,45,54') = 0) THEN
            SET valid_route = FALSE;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid route';
        END IF;

        SET i = i + 2;
    END WHILE;
END$$
DELIMITER ;