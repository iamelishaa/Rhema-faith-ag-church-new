/// <reference types="react-scripts" />

// Add any global type declarations here
interface Window {
  // Redux DevTools extension
  __REDUX_DEVTOOLS_EXTENSION__?: () => void;
  // Initial state for client-side hydration
  __INITIAL_STATE__?: Record<string, unknown>;
}
