import { useState } from 'react';

import type { Event } from '../types/event';
import BookingDialog from './BookingDialog';

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-black p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-black">{event.name}</h2>

        <p className="mt-2 text-gray-600">
          {event.description}
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-medium">Date:</span>{' '}
            {new Date(event.date).toLocaleString()}
          </p>

          <p>
            <span className="font-medium">Remaining Seats:</span>{' '}
            {event.remainingSeats}
          </p>

          <p>
            <span className="font-medium">Price:</span> $
            {event.price}
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-5 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>

      <BookingDialog
        event={event}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

export default EventCard;