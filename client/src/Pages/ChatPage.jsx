import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import LangflowClient from '../services/langflowService';
import { AnalysisVisualizer } from '../components/analysis-visualizer';
import LoadingState from '../components/loadingState';

const ChatPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [loadingState, setLoadingState] = useState(null);
    const [currentLoadingMessage, setCurrentLoadingMessage] = useState(0);

    const loadingMessages = [
        "Analyzing your request...",
        "Collecting social media data...",
        "Processing engagement metrics...",
        "Generating insights...",
        "Preparing your analysis...",
        "Almost there...",
    ];

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        let interval;
        if (isLoading) {
            interval = setInterval(() => {
                setCurrentLoadingMessage((prev) => 
                    prev === loadingMessages.length - 1 ? 0 : prev + 1
                );
            }, 5000); // Change message every 2 seconds
        }
        return () => clearInterval(interval);
    }, [isLoading, loadingMessages.length]);

    const runLangflow = async () => {
        const flowIdOrName = import.meta.env.VITE_FLOWIDORNAME;
        const langflowId = import.meta.env.VITE_LANGFLOWID;
        const applicationToken = import.meta.env.VITE_LANGFLOW_TOKEN;
        
        const tweaks = {
            "ChatInput-7Sd79": {},
            "ParseData-28GbZ": {},
            "Prompt-viJiv": {},
            "SplitText-0GTRM": {},
            "ChatOutput-luUBP": {},
            "AstraDB-UVnCB": {},
            "AstraDB-hS23C": {},
            "File-rRqLW": {},
            "NVIDIAEmbeddingsComponent-6MWbK": {},
            "NVIDIAModelComponent-5fQ9O": {},
            "NVIDIAEmbeddingsComponent-YXIze": {}
        };

        const langflowClient = new LangflowClient(
            'https://arch-angels-iserver.vercel.app/api/langflow',
            applicationToken
        );

        setIsLoading(true);
        setError(null);
        
        try {
            // Simulate different loading states
            setLoadingState('collecting');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setLoadingState('analyzing');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setLoadingState('processing');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setLoadingState('generating');
            
            const response = await langflowClient.runFlow(
                flowIdOrName,
                langflowId,
                inputValue,
                'chat',
                'chat',
                tweaks,
                false,
                (data) => console.log('Update:', data),
                (message) => console.log('Stream Closed:', message),
                (error) => {
                    console.error('Stream Error:', error);
                    setError('Stream error occurred');
                }
            );

            if (response && response.outputs && response.outputs[0]) {
                const messageText = response.outputs[0].outputs[0].messages[0].message;
                setOutputValue(messageText);
            } else {
                setError('No output received from the server');
            }
        } catch (error) {
            console.error('Error running flow:', error);
            setError(error.message || 'An error occurred while processing your request');
        } finally {
            setLoadingState(null);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 py-8 relative overflow-hidden">
            {/* Enhanced Grid Pattern with Parallax Effect */}
            <div 
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"
                style={{ 
                    maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                    transform: 'translateZ(0)',
                }}
            />

            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `floatParticle ${5 + Math.random() * 5}s linear infinite ${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Animated Glow Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
            </div>

            <div className={`container mx-auto px-4 max-w-5xl relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20">
                    {/* Enhanced Header */}
                    <div className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 border-b border-white/10 p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 animate-gradient">
                                Social Media Analysis Chat
                            </h1>
                            <p className="text-blue-300/80">
                                Get AI-powered insights for your social media strategy
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-violet-600/5 animate-gradient" />
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Enhanced Input Section */}
                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-white/90">
                                Ask a Question
                            </label>
                            <textarea
                                className="w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-white/40 resize-none transition-all duration-300 hover:border-white/20"
                                placeholder="What's your social media question?"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                rows={5}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Enhanced Button */}
                        <div>
                            <button
                                className={`group w-full py-3 rounded-xl text-white text-lg font-medium shadow-lg transition-all duration-300 relative overflow-hidden ${
                                    isLoading
                                        ? 'bg-slate-700/50 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600/80 to-violet-600/80 hover:from-blue-500/80 hover:to-violet-500/80 border border-white/10 hover:border-white/20'
                                }`}
                                onClick={runLangflow}
                                disabled={isLoading || !inputValue.trim()}
                            >
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="relative">
                                                <div className="w-8 h-8 border-4 border-blue-400/30 rounded-full animate-spin border-t-blue-500"></div>
                                                <div className="absolute top-0 left-0 w-8 h-8 border-4 border-transparent rounded-full animate-pulse border-t-violet-500 animate-[spin_3s_linear_infinite]"></div>
                                            </div>
                                            <span className="text-white/90 animate-pulse">
                                                {loadingMessages[currentLoadingMessage]}
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-700/30 rounded-full h-1.5">
                                            <div className="bg-gradient-to-r from-blue-500 to-violet-500 h-1.5 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Sparkles className="w-5 h-5 group-hover:animate-spin-slow" />
                                        <span>Get Analysis</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>
                        </div>

                        {/* Enhanced Error Display */}
                        {error && (
                            <div className="bg-red-900/30 border border-red-500/30 p-4 rounded-xl animate-shake">
                                <p className="text-red-300">{error}</p>
                            </div>
                        )}

                        {/* Enhanced Analysis Output */}
                        {outputValue && (
                            <div className="animate-fadeIn">
                                <AnalysisVisualizer analysisText={outputValue} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && loadingState && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <LoadingState state={loadingState} className="bg-background/95 rounded-lg shadow-lg" />
                </div>
            )}

            {/* Animation Keyframes */}
            <style >{`
                @keyframes floatParticle {
                    0% {
                        transform: translateY(0) translateX(0) scale(0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(-50vh) translateX(20vw) scale(1);
                    }
                    100% {
                        transform: translateY(-100vh) translateX(40vw) scale(0);
                        opacity: 0;
                    }
                }
                @keyframes animate-gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: animate-gradient 4s linear infinite;
                }
                .animate-pulse-slow {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-2px); }
                    75% { transform: translateX(2px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                @keyframes loading {
                    0% {
                        width: 0%;
                    }
                    50% {
                        width: 100%;
                    }
                    100% {
                        width: 0%;
                    }
                }
            `}</style>
        </div>
    );
};

export default ChatPage;
