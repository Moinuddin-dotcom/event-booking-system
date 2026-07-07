import { useQuery } from '@tanstack/react-query';

import { getBookings, type GetBookingsParams } from '../api/bookings';

export function useBookings(params?: GetBookingsParams) {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => getBookings(params),
  });
}