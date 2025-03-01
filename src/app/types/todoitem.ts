// src/types/todo.ts
export interface TodoItem {
    id: string;
    activity: string;
    price: number;
    type: 'education' | 'recreational' | 'social' | 'diy' | 'charity' | 'cooking' | 'relaxation' | 'music' | 'busywork';
    bookingRequired: boolean;
    accessibility: number;
  }