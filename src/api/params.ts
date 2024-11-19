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
