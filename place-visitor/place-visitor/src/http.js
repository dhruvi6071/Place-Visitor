export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places");
    const resData = await response.json();

    if (!response.ok) {
      // const error = new Error("Failed to fetch");
      // throw error;
      throw new Error("Failed to fetch");
    }
    return resData.places;
}