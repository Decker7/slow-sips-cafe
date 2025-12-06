import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
                    alt="Coffee Shop Ambiance"
                    className="w-full h-full object-cover scale-105 animate-subtle-zoom" // Add a subtle zoom animation if we define it, or just static
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brown-900/80 via-brown-900/60 to-brown-900/90"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16">
                <span className="inline-block py-1 px-3 rounded-full bg-brown-800/50 border border-brown-600 text-brown-200 text-sm font-medium mb-6 uppercase tracking-widest backdrop-blur-sm">
                    Welcome to Slow Sips
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-orange-50 mb-8 tracking-tight drop-shadow-2xl leading-tight">
                    Savor the <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brown-200 to-orange-100">Moment</span>
                </h1>
                <p className="mt-4 text-xl sm:text-2xl text-brown-100 max-w-2xl mx-auto font-light mb-12 leading-relaxed opacity-90">
                    Artisanal coffee brewed with patience. An atmosphere designed for peace.
                    Taste the difference time makes.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <a
                        href="#menu"
                        className="group relative px-8 py-4 bg-brown-100 text-brown-900 rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:bg-white shadow-[0_0_20px_rgba(141,110,99,0.3)] hover:shadow-[0_0_30px_rgba(141,110,99,0.5)] overflow-hidden"
                    >
                        <span className="relative z-10">View Our Menu</span>
                    </a>
                    <a
                        href="#about"
                        className="px-8 py-4 bg-transparent border border-brown-400 text-brown-100 hover:bg-brown-800/50 hover:text-white hover:border-brown-200 rounded-full font-semibold text-lg transition-all backdrop-blur-sm"
                    >
                        Our Story
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
