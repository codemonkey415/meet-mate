import axios from "axios";
import { AppointmentType } from "../types/AppointmentType";
import {
  acceptApptParams,
  createApptParams,
  deleteApptParams,
  getApptParams,
} from "./params";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const fetchAppts = async ({ userId }: getApptParams) => {
  try {
    const response = await axios.get(
      `${backendUrl}/appointment/get-all?userId=${userId}`
    );
    return response.data as AppointmentType[];
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const createAppt = async (req: createApptParams) => {
  try {
    const response = await axios.post(`${backendUrl}/appointment/create`, req);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const acceptAppt = async ({ appointmentId }: acceptApptParams) => {
  try {
    const response = await axios.put(
      `${backendUrl}/appointment/accept?appointmentId=${appointmentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const deleteAppt = async (req: deleteApptParams) => {
  try {
    const response = await axios.delete(`${backendUrl}/appointment/delete`, {
      data: req,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
