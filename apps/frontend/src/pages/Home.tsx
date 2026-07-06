import { useQuery } from '@tanstack/react-query';

import { getEvents } from '../api/events';
import EventCard from '../components/EventCard';

function Home() {
    const {
        data: events,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });

    if (isLoading) {
        return <h2>Loading events...</h2>;
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
        </main>
    );
}

export default Home;