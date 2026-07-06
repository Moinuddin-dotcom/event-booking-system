import { api } from './axios';

export interface CreateBookingPayload {
  requestId: string;
  eventId: number;
  customerName: string;
  customerEmail: string;
  seats: number;
}

export const createBooking = async (
  payload: CreateBookingPayload,
) => {
  const response = await api.post('/bookings', payload);

  return response.data;
};