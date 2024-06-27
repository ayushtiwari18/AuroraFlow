import axios from "axios";

const BASE_URL = "https://yt-api.p.rapidapi.com";

const options = {
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
    "x-rapidapi-host": "yt-api.p.rapidapi.com",
  },
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDataFromApi = async (endpoint, params = {}, retries = 3) => {
  try {
    const url = `${BASE_URL}/${endpoint}`;
    const response = await axios.get(url, {
      ...options,
      params: params,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);

      if (error.response.status === 403) {
        console.error(
          "API subscription error. Please check your RapidAPI subscription."
        );
        throw new Error("API subscription error");
      }

      if (error.response.status === 429 && retries > 0) {
        console.log(
          `Rate limited. Retrying in ${2 ** (3 - retries)} seconds...`
        );
        await wait(2 ** (3 - retries) * 1000);
        return fetchDataFromApi(endpoint, params, retries - 1);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    throw error;
  }
};
