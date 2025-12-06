import React, { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-brown-900/95 backdrop-blur-sm fixed w-full z-50 border-b border-brown-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                            <span className="text-2xl font-serif font-bold text-orange-50 tracking-wider">
                                Slow Sips
                            </span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#home" className="text-brown-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors hover:bg-brown-800/50">Home</a>
                            <a href="#menu" className="text-brown-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors hover:bg-brown-800/50">Menu</a>
                            <a href="#about" className="text-brown-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors hover:bg-brown-800/50">About</a>
                            <a href="#contact" className="text-brown-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition-colors hover:bg-brown-800/50">Contact</a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-brown-800 inline-flex items-center justify-center p-2 rounded-md text-brown-200 hover:text-white hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brown-800 focus:ring-white transition-colors"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-brown-900 border-t border-brown-800">
                    <a href="#home" onClick={() => setIsOpen(false)} className="text-brown-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-brown-800">Home</a>
                    <a href="#menu" onClick={() => setIsOpen(false)} className="text-brown-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-brown-800">Menu</a>
                    <a href="#about" onClick={() => setIsOpen(false)} className="text-brown-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-brown-800">About</a>
                    <a href="#contact" onClick={() => setIsOpen(false)} className="text-brown-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-brown-800">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Header;
