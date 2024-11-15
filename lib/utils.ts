import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * High-performance unique ID generator optimized for speed
 * Generates ~64 bits of entropy
 */

const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LENGTH = 16;
let lastTime = 0;
let counter = 0;

export const generateId = (): string => {
  const now = Date.now();

  // Fast path: increment counter if in same millisecond
  if (now === lastTime) {
    counter++;
  } else {
    // Reset counter when millisecond changes
    lastTime = now;
    counter = 0;
  }

  // Pre-allocate result array for better performance
  const result = new Array(LENGTH);

  // Combine timestamp and counter
  const value = now + counter;

  // Direct char lookup and array filling is faster than string operations
  for (let i = 0; i < LENGTH; i++) {
    result[i] = CHARS[((value >> (i * 6)) + Math.random() * 62) & 0x3f];
  }

  return result.join('');
};

// Usage:
// const id = generateId();  // Example: "8fK9mL4nP2xR7"
