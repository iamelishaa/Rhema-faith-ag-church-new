'use client';

import { useEffect } from 'react';

export function FixHydration() {
  useEffect(() => {
    // Remove cz-shortcut-listen attribute that causes hydration mismatch
    document.body.removeAttribute('cz-shortcut-listen');
  }, []);

  return null;
}
