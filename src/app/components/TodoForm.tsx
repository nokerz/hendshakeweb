// src/components/TodoForm.tsx
"use client";

import { useState, FormEvent, useCallback } from 'react';
import { TodoItem } from '@/app/types/todoitem';

interface TodoFormProps {
  onAddTodo: (todo: Omit<TodoItem, 'id'>) => void;
}

/**
 * TodoForm component for adding new items to the todo list
 * Uses controlled form inputs with individual state variables
 */
export default function TodoForm({ onAddTodo }: TodoFormProps) {
  // Form state
  const [activity, setActivity] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [type, setType] = useState<TodoItem['type']>('education');
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);

  // Memoized submit handler to prevent recreation on renders
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    
    // Create and submit new todo
    onAddTodo({
      activity,
      price,
      type,
      bookingRequired,
      accessibility
    });
    
    // Reset form state
    setActivity('');
    setPrice(0);
    setType('education');
    setBookingRequired(false);
    setAccessibility(0.5);
  }, [activity, price, type, bookingRequired, accessibility, onAddTodo]);

  // Memoize input handlers to prevent recreation on renders
  const handleActivityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value);
  }, []);

  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  }, []);

  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as TodoItem['type']);
  }, []);

  const handleBookingChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingRequired(e.target.checked);
  }, []);

  const handleAccessibilityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessibility(Number(e.target.value));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-md">
      <h2 className="text-xl font-bold mb-4">Add New Item</h2>
      
      {/* Activity input */}
      <div className="mb-3">
        <label className="block mb-1">Activity</label>
        <input
          type="text"
          value={activity}
          onChange={handleActivityChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      
      {/* Price input */}
      <div className="mb-3">
        <label className="block mb-1">Price</label>
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          required
          min="0"
          step="0.01"
          className="w-full p-2 border rounded"
        />
      </div>
      
      {/* Type selection */}
      <div className="mb-3">
        <label className="block mb-1">Type</label>
        <select
          value={type}
          onChange={handleTypeChange}
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
      
      {/* Booking required checkbox */}
      <div className="mb-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={bookingRequired}
            onChange={handleBookingChange}
            className="mr-2"
          />
          Booking Required
        </label>
      </div>
      
      {/* Accessibility slider */}
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
          onChange={handleAccessibilityChange}
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