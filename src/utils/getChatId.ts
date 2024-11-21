import { ChatType } from "../types/ChatType";

export const getChatIdFromChats = async ({
  chats,
  user1Id,
  user2Id,
}: {
  chats: ChatType[];
  user1Id: number;
  user2Id: number;
}) => {
  return chats.find(
    (chat) => chat.user1Id === user1Id && chat.user2Id === user2Id
  )?.chatId;
};
