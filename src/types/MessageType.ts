export interface MessageType {
  messageId: number;
  chatId: number;
  sinkId: number;
  destinationId: number;
  body: string;
  createdDateTime: Date;
}
