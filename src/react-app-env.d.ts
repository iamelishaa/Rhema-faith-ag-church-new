/// <reference types="react-scripts" />

// Add global type declarations for JSX
import { ReactNode } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
