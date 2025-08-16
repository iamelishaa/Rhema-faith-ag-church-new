'use client';

import { useEffect } from 'react';

export default function Body({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  useEffect(() => {
    // Remove extension-added attributes after hydration
    const removeExtensionAttributes = () => {
      if (typeof document !== 'undefined') {
        document.body.removeAttribute('cz-shortcut-listen');
      }
    };

    removeExtensionAttributes();
    
    // Also run on window load in case extensions add attributes later
    window.addEventListener('load', removeExtensionAttributes);
    return () => {
      window.removeEventListener('load', removeExtensionAttributes);
    };
  }, []);

  return (
    <body className={className} suppressHydrationWarning>
      {children}
    </body>
  );
}
