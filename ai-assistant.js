// AI Assistant Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');

    // Emotion keywords
    const emotionKeywords = {
        positive: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'good', 'fantastic'],
        negative: ['sad', 'angry', 'anxious', 'stressed', 'worried', 'scared', 'bad', 'terrible'],
        neutral: ['okay', 'fine', 'alright', 'normal', 'average', 'neutral']
    };

    // Response templates
    const responseTemplates = {
        positive: [
            'I\'m glad to hear you\'re feeling positive! Keep up that great attitude.',
            'That\'s wonderful! Your positive mindset will help you overcome challenges.',
            'Your optimism is contagious!'
        ],
        negative: [
            'I understand you\'re not feeling great. Would you like to try our relaxation exercises?',
            'It\'s normal to feel down sometimes. Would you like some suggestions for stress relief?',
            'I\'m here for you. Would you like to talk about what\'s bothering you?'
        ],
        neutral: [
            'Maintaining a balanced mood is good. Is there anything I can help you with?',
            'A calm state of mind helps with clear thinking. Would you like some guidance?'
        ]
    };

    // Analyze user input emotion
    function analyzeEmotion(text) {
        let emotion = 'neutral';
        let maxCount = 0;

        for (const [type, keywords] of Object.entries(emotionKeywords)) {
            const count = keywords.filter(keyword => text.toLowerCase().includes(keyword)).length;
            if (count > maxCount) {
                maxCount = count;
                emotion = type;
            }
        }

        return emotion;
    }

    // Get random response
    function getRandomResponse(emotion) {
        const templates = responseTemplates[emotion];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    // Add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle user input
    function handleUserInput() {
        const text = userInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, true);
        userInput.value = '';

        // Analyze emotion and generate response
        const emotion = analyzeEmotion(text);
        const response = getRandomResponse(emotion);

        // Simulate AI thinking time
        setTimeout(() => {
            addMessage(response);
        }, 1000);
    }

    // Event listeners
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
}); 