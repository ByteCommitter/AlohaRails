Drop table Station;
CREATE TABLE Station (
    Station_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    No_of_platforms INT,
    Location VARCHAR(255),
    Facilities VARCHAR(255)
);
DROP PROCEDURE IF EXISTS GetStationDetails;
DELIMITER //
CREATE PROCEDURE GetStationDetails(IN station_id INT)
BEGIN
    -- Get the station details
    SELECT Station_ID+100 as Station, No_of_platforms, Location, Facilities 
    FROM Station 
    WHERE Station.Station_ID = station_id;

END //
DELIMITER ;
CALL GetStationDetails(6);

INSERT INTO Station (Station_ID, Name, No_of_platforms, Location, Facilities)
VALUES
(1, 'Westend Junction', 3, 'Honolulu', 'Waiting rooms, restrooms, ticket counters, food court'),
(2, 'Lakeside Retreat', 2, 'Hilo', 'Waiting rooms, restrooms, ticket counters, picnic area'),
(3, 'Palm Beach', 2, 'Kailua', 'Waiting rooms, restrooms, ticket counters, beach access'),
(4, 'Oceanview Station', 4, 'Lahaina', 'Waiting rooms, restrooms, ticket counters, observation deck'),
(5, 'Sunrise Point', 2, 'Haleakala', 'Waiting rooms, restrooms, ticket counters, sunrise viewing area'),
(6, 'Aloha Central', 3, 'Waikiki', 'Waiting rooms, restrooms, ticket counters, food stalls'),
(7, 'Mountain Pass', 2, 'Mauna Kea', 'Waiting rooms, restrooms, ticket counters, hiking trail access');
Select * from routes;
call GetStationDetails(6);