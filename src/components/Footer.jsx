import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-brown-950 text-brown-300 py-16 border-t border-brown-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-black-100">Slow Sips</h3>
                        <p className="max-w-xs text-sm">
                            Artisanal coffee for the mindful drinker. <br />
                            Established 2023.
                        </p>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-lg font-bold text-black-100 mb-4 uppercase tracking-wider text-sm">Opening Hours</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between max-w-[200px]">
                                <span>Mon - Fri</span>
                                <span>7am - 8pm</span>
                            </li>
                            <li className="flex justify-between max-w-[200px]">
                                <span>Saturday</span>
                                <span>8am - 9pm</span>
                            </li>
                            <li className="flex justify-between max-w-[200px]">
                                <span>Sunday</span>
                                <span>8am - 6pm</span>
                            </li>
                        </ul>
                    </div>

                    {/* Location & Social */}
                    <div>
                        <h4 className="text-lg font-bold text-black-100 mb-4 uppercase tracking-wider text-sm">Find Us</h4>
                        <address className="not-italic text-sm mb-6">
                            123 Espresso Lane<br />
                            Brew District, NY 10012
                        </address>
                        <div className="flex space-x-4">
                            <a href="#" className="text-brown-400 hover:text-orange-50 transition-colors">Instagram</a>
                            <a href="#" className="text-brown-400 hover:text-orange-50 transition-colors">Twitter</a>
                            <a href="#" className="text-brown-400 hover:text-orange-50 transition-colors">Facebook</a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-brown-900 flex flex-col md:flex-row justify-between items-center text-xs text-brown-500">
                    <p>&copy; 2025 Slow Sips Coffee Co. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-brown-300">Privacy Policy</a>
                        <a href="#" className="hover:text-brown-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
