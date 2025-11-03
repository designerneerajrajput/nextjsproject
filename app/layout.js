'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Humaan Clone - Digital Agency</title>
        <meta name="description" content="A modern digital agency website" />
      
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}