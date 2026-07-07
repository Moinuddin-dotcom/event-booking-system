import type { Booking } from '../types/booking';

interface BookingsTableProps {
  bookings: Booking[];
}

function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <div className="mt-10 overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-white">
              Booking Ref
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-white">
              Event
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-white">
              Customer
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-white">
              Seats
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-white">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700 bg-black">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-4 py-3 text-sm text-white">
                {booking.bookingReference.slice(0, 8)}...
              </td>

              <td className="px-4 py-3 text-sm text-white">
                {booking.event.name}
              </td>

              <td className="px-4 py-3 text-sm text-white">
                {booking.customerName}
              </td>

              <td className="px-4 py-3 text-sm text-white">
                {booking.seats}
              </td>

              <td className="px-4 py-3 text-sm">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    booking.status === 'CONFIRMED'
                      ? 'bg-green-600 text-white'
                      : booking.status === 'FAILED'
                      ? 'bg-red-600 text-white'
                      : 'bg-yellow-500 text-black'
                  }`}
                >
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingsTable;