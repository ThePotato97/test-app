'use client'
import { ReactNode } from 'react';
import { AuthContextProvider } from './context/AuthContext'

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
