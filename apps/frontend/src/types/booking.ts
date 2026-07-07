export interface Booking {
  id: number;
  bookingReference: string;
  customerName: string;
  customerEmail: string;
  seats: number;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';

  event: {
    id: number;
    name: string;
  };
}

export interface BookingsResponse {
  data: Booking[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}