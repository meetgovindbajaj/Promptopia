'use client';
import { SessionProvider } from 'next-auth/react';
const Provider = ({ children, session }) => {
  return (
    <SessionProvider refetchInterval={300} refetchOnWindowFocus={false} session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;
