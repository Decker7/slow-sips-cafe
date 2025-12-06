import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuHighlights from './components/MenuHighlights';
import About from './components/About';
import Footer from './components/Footer';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div className="bg-brown-50 min-h-screen">
      <Header />
      <main>
        <Hero />
        <MenuHighlights />
        <About />
      </main>
      <Footer />
      <ChatBox />
    </div>
  );
}

export default App;
