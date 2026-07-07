import { useQuery } from '@tanstack/react-query';

import { getEvents } from '../api/events';
import EventCard from '../components/EventCard';
import { useBookings } from '../hooks/useBookings';
import BookingsTable from '../components/BookingsTable';
import { useState } from 'react';

function Home() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('');
    const [eventId, setEventId] = useState('');
    const {
        data: events,
        isLoading: eventsLoading,
        error,
    } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });

    const {
        data: bookings,
        isLoading: bookingsLoading,
    } = useBookings({
        page,
        limit: 5,
        status: status || undefined,
        eventId: eventId ? Number(eventId) : undefined,
    });

    if (eventsLoading) {
        return <h2>Loading events...</h2>;
    }
    if (bookingsLoading) {
        return <h2>Loading bookings...</h2>;
    }

    if (error) {
        return <h2>Failed to load events.</h2>;
    }

    return (
        <main className="mx-auto max-w-5xl p-6">

            <h1 className="mb-8 text-center text-4xl font-bold">
                Event Booking System
            </h1>

            <div className="grid gap-6 md:grid-cols-2">
                {events?.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>

            <h2 className="my-10 mb-4 text-2xl font-bold text-white">
                Bookings
            </h2>

            <div className="mb-6 flex flex-wrap gap-4">
                <select
                    value={eventId}
                    onChange={(e) => {
                        setPage(1);
                        setEventId(e.target.value);
                    }}
                    className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white"
                >
                    <option value="">All Events</option>

                    {events?.map((event) => (
                        <option key={event.id} value={event.id}>
                            {event.name}
                        </option>
                    ))}
                </select>

                <select
                    value={status}
                    onChange={(e) => {
                        setPage(1);
                        setStatus(e.target.value);
                    }}
                    className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-white"
                >
                    <option value="">All Status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="FAILED">FAILED</option>
                </select>
            </div>

            {bookingsLoading ? (
                <p className="text-white">Loading bookings...</p>
            ) : (
                <BookingsTable bookings={bookings.data} />
            )}

            {bookings && (
                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="rounded bg-gray-700 px-4 py-2 text-white disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-white">
                        Page {bookings.meta.page} of {bookings.meta.totalPages}
                    </span>

                    <button
                        disabled={page === bookings.meta.totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="rounded bg-gray-700 px-4 py-2 text-white disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </main>
    );
}

export default Home;