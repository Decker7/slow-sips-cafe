import React, { useState, useRef, useEffect } from 'react';
import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are a helpful and friendly AI assistant for "Slow Sips", a premium artisanal cafe.
Your tone should be warm, relaxing, and inviting, matching the cafe's brown-themed, cozy aesthetic.

Key Cafe Details:
- Name: Slow Sips
- Atmosphere: Calm, peaceful, time slows down here. Good for working or relaxing.
- Menu Highlights:
  - Signature Velvet Latte ($5.50): Rich espresso, steamed milk, organic vanilla bean.
  - Cold Brew Reserve ($4.75): Slow-steeped 18 hours, artisanal clear ice.
  - Almond Croissant ($4.25): Flaky, sweet almond paste.
  - Matcha Green Tea Cake ($6.00): Ceremonial grade matcha.
- Location: 123 Espresso Lane, Brew District, NY 10012.
- Opening Hours: Mon-Fri 7am-8pm, Sat 8am-9pm, Sun 8am-6pm.

Goal: Answer customer questions about the menu, hours, or vibe accurately. Keep answers concise (under 3 sentences) unless asked for more details.
`;

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m the Slow Sips virtual assistant. How can I help you savor the moment today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const token = import.meta.env.VITE_HF_TOKEN;

            if (!token) {
                throw new Error("Missing API Token");
            }

            // Build conversation for chat completion
            const conversation = [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages.map(m => ({ role: m.role, content: m.content })),
                { role: "user", content: input }
            ];

            // Using HuggingFace Router with Llama 3.2
            const response = await fetch(
                "https://router.huggingface.co/v1/chat/completions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        model: "meta-llama/Llama-3.2-1B-Instruct",
                        messages: conversation,
                        max_tokens: 150,
                        temperature: 0.7,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            const result = await response.json();

            const aiMessage = {
                role: 'assistant',
                content: result.choices[0]?.message?.content?.trim() || "I'm here to help! Could you please rephrase that?"
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat error details:", error);

            let errorMessage = "I'm having a little trouble connecting right now. Please try again later.";

            if (error.message === "Missing API Token") {
                errorMessage = "Setup Error: VITE_HF_TOKEN is missing in the .env file.";
            } else if (error.message) {
                // Show specific error for debugging
                errorMessage = `Connection Error: ${error.message}`;
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: errorMessage
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div
                className={`bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-brown-200 pointer-events-auto transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
            >
                {/* Header */}
                <div className="bg-brown-900 p-4 flex justify-between items-center text-orange-50">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <h3 className="font-serif font-bold">Slow Sips Assistant</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-brown-50">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                    ? 'bg-brown-800 text-white rounded-br-none'
                                    : 'bg-white text-brown-900 border border-brown-100 shadow-sm rounded-bl-none'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white rounded-2xl px-4 py-2 border border-brown-100 shadow-sm rounded-bl-none">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-brown-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-brown-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-brown-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 bg-white border-t border-brown-100 flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about our coffee..."
                        className="flex-1 bg-brown-50 border border-brown-200 rounded-full px-4 py-2 text-sm text-brown-900 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-brown-800 text-white p-2 rounded-full hover:bg-brown-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-brown-900 text-orange-50 p-4 rounded-full shadow-lg hover:bg-brown-800 transition-transform transform hover:scale-110 pointer-events-auto"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default ChatBox;
