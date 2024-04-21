DROP PROCEDURE IF EXISTS GetSchedule;
DELIMITER //
CREATE PROCEDURE GetSchedule(IN Train_ID INT)
BEGIN
    SELECT Train.Name, Schedule.Departure_Time, Schedule.Arrival_Time, Schedule.Train_ID, Schedule.Route_ID, Routes.From_station_ID, Routes.To_station_ID
    FROM Schedule
    INNER JOIN Routes ON Schedule.Route_ID = Routes.Route_ID
    INNER JOIN Train ON Schedule.Train_ID = Train.Train_ID
    WHERE Schedule.Train_ID = Train_ID;
END //
DELIMITER ;

desc train;
CALL GetSchedule(1034);