// src/components/TodoForm.tsx
"use client";

import { useState, FormEvent } from 'react';
import { TodoItem } from '@/app/types/todoitem';

interface TodoFormProps {
  onAddTodo: (todo: Omit<TodoItem, 'id'>) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [activity, setActivity] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [type, setType] = useState<TodoItem['type']>('education');
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Create new todo without ID (will be added in parent component)
    const newTodo = {
      activity,
      price,
      type,
      bookingRequired,
      accessibility
    };
    
    onAddTodo(newTodo);
    
    // Reset form
    setActivity('');
    setPrice(0);
    setType('education');
    setBookingRequired(false);
    setAccessibility(0.5);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-md">
      <h2 className="text-xl font-bold mb-4">Add New Item</h2>
      
      <div className="mb-3">
        <label className="block mb-1">Activity</label>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-3">
        <label className="block mb-1">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          min="0"
          step="0.01"
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-3">
        <label className="block mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TodoItem['type'])}
          className="w-full p-2 border rounded"
        >
          <option value="education">Education</option>
          <option value="recreational">Recreational</option>
          <option value="social">Social</option>
          <option value="diy">DIY</option>
          <option value="charity">Charity</option>
          <option value="cooking">Cooking</option>
          <option value="relaxation">Relaxation</option>
          <option value="music">Music</option>
          <option value="busywork">Busywork</option>
        </select>
      </div>
      
      <div className="mb-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={bookingRequired}
            onChange={(e) => setBookingRequired(e.target.checked)}
            className="mr-2"
          />
          Booking Required
        </label>
      </div>
      
      <div className="mb-4">
        <label className="block mb-1">
          Accessibility ({accessibility.toFixed(1)})
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={accessibility}
          onChange={(e) => setAccessibility(Number(e.target.value))}
          className="w-full"
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add to List
      </button>
    </form>
  );
}