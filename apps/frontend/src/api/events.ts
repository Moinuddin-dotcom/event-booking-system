import type { Event } from '../types/event';
import { api } from './axios';

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get('/events');
  return response.data;
};