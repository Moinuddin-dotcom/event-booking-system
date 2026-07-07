import { api } from './axios';

export interface GetBookingsParams {
  page?: number;
  limit?: number;
  status?: string;
  eventId?: number;
}

export async function getBookings(params?: GetBookingsParams) {
  const response = await api.get('/bookings', {
    params,
  });

  return response.data;
}

export async function createBooking(data: {
  requestId: string;
  eventId: number;
  customerName: string;
  customerEmail: string;
  seats: number;
}) {
  const response = await api.post('/bookings', data);

  return response.data;
}