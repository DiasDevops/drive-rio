import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { AttractionsGrid } from './components/AttractionsGrid';
import { DriversList } from './components/DriversList';
import { DiscountsSection } from './components/DiscountsSection';
import { PlatformChat } from './components/PlatformChat';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeChatPartnerId, setActiveChatPartnerId] = useState<string | undefined>(undefined);
  const [activePromoCode, setActivePromoCode] = useState<string | undefined>(undefined);

  const handleOpenChatWithDriver = (driverId: string, _driverName: string) => {
    setActiveChatPartnerId(driverId);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChatWithPromo = (code: string) => {
    setActivePromoCode(code);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestBookingFromAttraction = (_attractionId: string) => {
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={1}
        openChatWithPartner={(partnerId) => {
          setActiveChatPartnerId(partnerId);
          setActiveTab('chat');
        }}
      />

      {/* Main Content Tabs */}
      <main className="w-full">
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            <HeroHeader
              onNavigateTab={setActiveTab}
              onRequestBooking={handleRequestBookingFromAttraction}
            />
            <AttractionsGrid
              onRequestBooking={handleRequestBookingFromAttraction}
              onSelectCoupon={handleOpenChatWithPromo}
            />
            <DriversList
              onOpenChatWithDriver={handleOpenChatWithDriver}
            />
            <DiscountsSection
              onOpenChatWithPromo={handleOpenChatWithPromo}
            />
            <ContactSection />
          </div>
        )}

        {activeTab === 'attractions' && (
          <div className="animate-fadeIn">
            <AttractionsGrid
              onRequestBooking={handleRequestBookingFromAttraction}
              onSelectCoupon={handleOpenChatWithPromo}
            />
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="animate-fadeIn">
            <DriversList
              onOpenChatWithDriver={handleOpenChatWithDriver}
            />
          </div>
        )}

        {activeTab === 'discounts' && (
          <div className="animate-fadeIn">
            <DiscountsSection
              onOpenChatWithPromo={handleOpenChatWithPromo}
            />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="animate-fadeIn">
            <PlatformChat
              initialPartnerId={activeChatPartnerId}
              initialPromoCode={activePromoCode}
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-fadeIn">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateTab={setActiveTab} />

    </div>
  );
}
