import React, { useState } from 'react';
import LangflowClient from '../services/langflowService';

const ChatPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const runLangflow = async () => {
        console.log('Starting Langflow request...');
        const flowIdOrName = '';
        const langflowId = '';
        const applicationToken = '';
        
        console.log('Input value:', inputValue);
        
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
            console.log('Sending request to Langflow...');
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

            console.log('Full response:', response);

            if (response && response.outputs && response.outputs[0]) {
                // Extract the message text from the response
                const messageText = response.outputs[0].outputs[0].messages[0].message;
                console.log('Message text:', messageText);
                setOutputValue(messageText);
            } else {
                console.log('No outputs in response:', response);
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
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Social Media Analysis Chat
                </h1>

                <div className="space-y-6">
                    {/* Input Section */}
                    <div className="space-y-3">
                        <label className="block text-lg font-medium text-gray-600">
                            Ask a Question
                        </label>
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                            className={`w-full py-3 rounded-lg text-white text-lg font-medium shadow-md transition ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            onClick={runLangflow}
                            disabled={isLoading || !inputValue.trim()}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <span className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5"></span>
                                    <span>Analyzing...</span>
                                </div>
                            ) : (
                                'Get Analysis'
                            )}
                        </button>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Output Section */}
                    {outputValue && (
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300 shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-3">
                                Analysis Result
                            </h2>
                            <div className="prose prose-sm max-w-none text-gray-800">
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
    );
};

export default ChatPage;
