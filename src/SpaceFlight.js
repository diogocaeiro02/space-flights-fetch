import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SpaceFlight.css";

function SpaceFlight() {
  const [flights, setFlights] = useState([]);

  // SpaceX launches: https://api.spacexdata.com/v2/launches
  useEffect(() => {
    // Make a GET request to API
    axios
      .get("https://api.spacexdata.com/v2/launches")
      .then((res) => {
        setFlights(res.data);
      })
      .catch((err) => {
        console.log("Error with API: ", err);
      });
  }, []);

  return (
    <ul className="flights-list">
      {flights.map((flight) => (
        <li key={flight.flight_number}>
          <div className="flight-info">
            <img
              src={flight.links.mission_patch_small}
              alt={flight.mission_name}
            />
          </div>
          <div className="flight-data">
            <h2>{flight.mission_name}</h2>
            <p> Flight Number: {flight.flight_number}</p>
            <p> Launch Date: {flight.launch_date_utc}</p>
            <p> Flight Details: {flight.details}</p>
            <p> Launch Year: {flight.launch_year}</p>
            <a href={flight.links.article_link}>Read more about the launch</a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SpaceFlight;
