import { useForm } from 'react-hook-form';
import { createBooking } from '../api/bookings';
import { useQueryClient } from '@tanstack/react-query';
import type { Event } from '../types/event';
import { toast } from 'sonner';

interface BookingDialogProps {
    event: Event;
    isOpen: boolean;
    onClose: () => void;
}

interface BookingFormData {
    customerName: string;
    customerEmail: string;
    seats: number;
}

function BookingDialog({
    event,
    isOpen,
    onClose,
}: BookingDialogProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookingFormData>();
    const queryClient = useQueryClient();

    if (!isOpen) {
        return null;
    }

    const onSubmit = async (data: BookingFormData) => {
        try {
            await createBooking({
                requestId: crypto.randomUUID(),
                eventId: event.id,
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                seats: data.seats,
            });

            await queryClient.invalidateQueries({
                queryKey: ['events'],
            });

            toast.success('Booking submitted successfully.');

            reset();

            onClose();
        } catch (error) {
            console.error(error);

            toast.error('Booking failed.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-xl">
                <h2 className="mb-5 text-2xl font-bold text-white">
                    Book Event
                </h2>

                <p className="mb-6 text-gray-300">
                    {event.name}
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Name
                        </label>

                        <input
                            type="text"
                            {...register('customerName', {
                                required: 'Name is required',
                            })}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none transition focus:border-blue-500"
                        />

                        {errors.customerName && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.customerName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Email
                        </label>

                        <input
                            type="email"
                            {...register('customerEmail', {
                                required: 'Email is required',
                            })}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none transition focus:border-blue-500"
                        />

                        {errors.customerEmail && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.customerEmail.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Seats
                        </label>

                        <input
                            type="number"
                            min={1}
                            {...register('seats', {
                                required: 'Seats are required',
                                valueAsNumber: true,
                                min: 1,
                            })}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white outline-none transition focus:border-blue-500"
                        />

                        {errors.seats && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.seats.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-700 px-4 py-2 text-white transition hover:bg-gray-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                        >
                            Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookingDialog;