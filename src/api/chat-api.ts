import axios from "axios";
import { ChatType } from "../types/ChatType";
import {
  getChatParams,
  historicalMessageParams,
  receiveMessagesParams,
  sendMessageParams,
} from "./params";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const interviewee = process.env.REACT_APP_INTERVIEWEE_ID;

export const getChatsAPI = async ({ userId }: getChatParams) => {
  try {
    const response = await axios.get(
      `${backendUrl}/chat/get-chats?userId=${userId}`
    );
    return response.data as ChatType[];
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const sendMessageAPI = async (req: sendMessageParams) => {
  try {
    const response = await axios.post(`${backendUrl}/chat/send-message`, req);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const receiveMessagesAPI = async ({
  chatId,
  sinceId,
}: receiveMessagesParams) => {
  try {
    const response = await axios.get(
      `${backendUrl}/chat/receive-messages?chatId=${chatId}&sinceId=${sinceId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const historicalMessagesAPI = async ({
  chatId,
  pageSize,
  pageNumber,
}: historicalMessageParams) => {
  try {
    const response = await axios.get(
      `${backendUrl}/chat/historical-messages?chatId=${chatId}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
