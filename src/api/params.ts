export interface getChatParams {
  userId: number;
}

export interface sendMessageParams {
  chatId: number;
  sinkId: number;
  destinationId: number;
  body: string;
}

export interface receiveMessagesParams {
  chatId: number;
  sinceId: number;
}

export interface historicalMessageParams {
  chatId: number;
  pageSize: number;
  pageNumber: number;
}

export interface createApptParams {
  chatId: number;
  initiatorUserId: number;
  acceptorUserId: number;
  appointmentDateTime: string;
}

export interface acceptApptParams {
  appointmentId: number;
}

export interface deleteApptParams {
  appointmentId: number;
  deleteMessage: string;
}

export interface getApptParams {
  userId: number;
}
