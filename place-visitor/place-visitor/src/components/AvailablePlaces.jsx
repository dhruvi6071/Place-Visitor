import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import {fetchAvailablePlaces} from '../http.js';
// In React use of localStorage to store and retrieve data in the browser. Use of localStorage.getItem() to retrieve stored data:

// async await is not implemented for react components.

// const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  // fetch is provided directly by browser and it is used to send http request on site.
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
       const places = await fetchAvailablePlaces();
        // to get current location of the user.
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

        //success : 200 code   failure : 400, 500
      } catch (error) {
        setError({
          message:
            error.message || "Could not find places please try again later",
        });
      }

      
    }

    //   fetch("http://localhost:3000/places")
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((resData) => {
    //       setAvailablePlaces(resData.places);
    //     });

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }
  //  for above code we need to use useEffect in order to avoid the conflict of infinite loop which can be generated.
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
