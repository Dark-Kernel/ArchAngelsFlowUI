import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import LangflowClient from '../services/langflowService';

const ChatPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
            'http://localhost:3001/api/langflow',
            applicationToken
        );

        setIsLoading(true);
        setError(null);
        
        try {
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
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-violet-950 py-8 relative">
            {/* Grid Pattern Overlay */}
            <div 
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
            ></div>
                 {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
      >
        {/* Spark Trails */}
        <div className="spark-trail absolute h-20 w-px bg-gradient-to-b from-white/0 via-white to-white/0" 
             style={{ left: '20%', top: '10%', animation: 'sparkMove 3s ease-in-out infinite' }}></div>
        <div className="spark-trail absolute h-32 w-px bg-gradient-to-b from-white/0 via-white to-white/0" 
             style={{ left: '60%', top: '30%', animation: 'sparkMove 4s ease-in-out infinite 1s' }}></div>
        <div className="spark-trail absolute h-24 w-px bg-gradient-to-b from-white/0 via-white to-white/0" 
             style={{ left: '85%', top: '60%', animation: 'sparkMove 3.5s ease-in-out infinite 0.5s' }}></div>
      </div>

            <div className="container mx-auto px-4 max-w-4xl relative">
                <div className="bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 border-b border-white/10 p-6">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Social Media Analysis Chat
                        </h1>
                        <p className="text-blue-300/80">
                            Get AI-powered insights for your social media strategy
                        </p>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Input Section */}
                        <div className="space-y-3">
                            <label className="block text-lg font-medium text-white/90">
                                Ask a Question
                            </label>
                            <textarea
                                className="w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-white/40 resize-none"
                                placeholder="What's your social media question?"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                rows={5}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                className={`w-full py-3 rounded-xl text-white text-lg font-medium shadow-lg transition ${
                                    isLoading
                                        ? 'bg-slate-700/50 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600/80 to-violet-600/80 hover:from-blue-500/80 hover:to-violet-500/80 border border-white/10'
                                }`}
                                onClick={runLangflow}
                                disabled={isLoading || !inputValue.trim()}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-5 h-5"></span>
                                        <span>Analyzing...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Sparkles className="w-5 h-5" />
                                        <span>Get Analysis</span>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="bg-red-900/30 border border-red-500/30 p-4 rounded-xl">
                                <p className="text-red-300">{error}</p>
                            </div>
                        )}

                        {/* Output Section */}
                        {outputValue && (
                            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/10">
                                <h2 className="text-lg font-semibold text-white/90 mb-4">
                                    Analysis Result
                                </h2>
                                <div className="prose prose-invert prose-sm max-w-none text-white/80">
                                    {outputValue.split('\n').map((line, index) => (
                                        <p key={index} className="mb-2">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
