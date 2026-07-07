import { useQuery } from '@tanstack/react-query';

import { getEvents } from '../api/events';
import EventCard from '../components/EventCard';
import { useBookings } from '../hooks/useBookings';
import BookingsTable from '../components/BookingsTable';

function Home() {
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
    } = useBookings();

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

            {bookingsLoading ? (
                <p className="text-white">Loading bookings...</p>
            ) : (
                <BookingsTable bookings={bookings.data} />
            )}
        </main>
    );
}

export default Home;