// src/types/todo.ts

/**
 * Represents a single todo item in the application
 * Contains all properties required by the assessment specification
 */
export interface TodoItem {
  /** Unique identifier for the todo item */
  id: string;
  
  /** The activity name/description */
  activity: string;
  
  /** Price value (numeric) */
  price: number;
  
  /** Category type selected from predefined options */
  type: TodoItemType;
  
  /** Whether booking is required for this activity */
  bookingRequired: boolean;
  
  /** Accessibility score from 0.0 to 1.0 */
  accessibility: number;
}

/**
 * Valid type categories for todo items
 * Extracted as a separate type to improve reusability
 */
export type TodoItemType = 
  | 'education'
  | 'recreational' 
  | 'social' 
  | 'diy' 
  | 'charity' 
  | 'cooking' 
  | 'relaxation' 
  | 'music' 
  | 'busywork';