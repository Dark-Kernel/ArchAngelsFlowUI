class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = 'https://arch-angels-iserver.vercel.app/api/langflow';
        this.applicationToken = applicationToken;
    }

    async post(endpoint, body, headers = {"Content-Type": "application/json"}) {
        console.log('Making POST request to:', this.baseURL);
        
        // Extract flowId and langflowId from the endpoint
        const urlParts = endpoint.split('/');
        const flowId = urlParts[urlParts.length - 1].split('?')[0];
        const langflowId = urlParts[2];

        const requestBody = {
            flowId,
            langflowId,
            body
        };

        console.log('Request body:', requestBody);

        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            const responseMessage = await response.json();
            console.log('Response data:', responseMessage);
            return responseMessage;
        } catch (error) {
            console.error('Request Error:', error);
            throw error;
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
        console.log('Initiating session with:', { flowId, langflowId, inputValue, inputType, outputType, stream });
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { 
            input_value: inputValue, 
            input_type: inputType, 
            output_type: outputType, 
            tweaks: tweaks 
        });
    }

    handleStream(streamUrl, onUpdate, onClose, onError) {
        console.log('Setting up stream from:', streamUrl);
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = (event) => {
            console.log('Stream message received:', event.data);
            const data = JSON.parse(event.data);
            onUpdate(data);
        };

        eventSource.onerror = (event) => {
            console.error('Stream Error:', event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener('close', () => {
            console.log('Stream closed');
            onClose('Stream closed');
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false, onUpdate, onClose, onError) {
        console.log('Running flow with:', { 
            flowIdOrName, 
            langflowId, 
            inputValue, 
            inputType, 
            outputType, 
            stream 
        });

        try {
            const initResponse = await this.initiateSession(
                flowIdOrName, 
                langflowId, 
                inputValue, 
                inputType, 
                outputType, 
                stream, 
                tweaks
            );

            console.log('Initial response:', initResponse);

            if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
                const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
                console.log('Setting up stream from URL:', streamUrl);
                this.handleStream(streamUrl, onUpdate, onClose, onError);
            }

            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            throw error;
        }
    }
}

export default LangflowClient;
