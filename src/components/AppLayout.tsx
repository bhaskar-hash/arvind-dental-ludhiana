'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import BookingModal from './BookingModal';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('open-booking-modal', handleOpenModal);
    return () => window.removeEventListener('open-booking-modal', handleOpenModal);
  }, []);

  return (
    <>
      <Navbar onBookClick={() => setIsModalOpen(true)} />
      <main className="flex-grow pt-[76px]">{children}</main>
      <Footer />
      <WhatsAppButton />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

