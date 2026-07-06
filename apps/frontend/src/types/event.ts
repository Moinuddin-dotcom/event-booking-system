export interface Event {
  id: number;
  name: string;
  description?: string;
  date: string;
  totalSeats: number;
  remainingSeats: number;
  price: string;
  createdAt: string;
  updatedAt: string;
}