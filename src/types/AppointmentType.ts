export interface AppointmentType {
  appointmentId: number;
  chatId: number;
  initiatorUserId: number;
  acceptorUserId: number;
  state?: number;
  deleteMessage?: string | null;
  appointmentDateTime: number | string;
  initiateDateTime?: number;
  acceptDateTime?: number;
  deleteDateTime?: number | null;
}
