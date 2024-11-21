import axios from "axios";
import { UserType } from "../types/UserType";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Function to get users from the backend
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${backendUrl}/users/get-all`);
    return response.data as UserType[];
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
