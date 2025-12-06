import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-brown-900 text-brown-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative mb-12 lg:mb-0">
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-brown-700/30 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-orange-900/30 rounded-full blur-3xl opacity-50"></div>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Cafe Interior"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-orange-50 mb-6">Where Time Slows Down</h2>
                        <div className="space-y-6 text-brown-200 text-lg leading-relaxed font-light">
                            <p>
                                Founded in 2023, Slow Sips was born from a simple desire: to reclaim the moment.
                                In a world that rushes, we choose to pause. We believe coffee isn't just fuel—it's a ritual.
                            </p>
                            <p>
                                Our beans are ethically sourced from small-lot farmers who share our dedication to quality.
                                Every roast is carefully profiled to highlight its unique character, and every cup is
                                brewed with precision.
                            </p>
                            <p>
                                Whether you're here to work, to meet a friend, or simply to be alone with your thoughts,
                                our space is yours. Breathe deep. Sip slow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
