// Tab functionality
function openTab(tabName) {
    const tabs = document.getElementsByClassName('tab');
    for (let tab of tabs) {
        tab.classList.remove('active');
    }
    
    const tabContents = document.getElementsByClassName('tab-content');
    for (let content of tabContents) {
        content.classList.remove('active');
    }
    
    event.currentTarget.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Chat functionality
function handleKeyPress(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

function sendQuickMessage(message) {
    document.getElementById('user-input').value = message;
    sendMessage();
    document.getElementById('chat').classList.add('active');
    document.querySelector('.tab[onclick="openTab(\'chat\')"]').classList.add('active');
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    const chatMessages = document.getElementById('chat-messages');
    
    if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `${message} <div class="message-time">${getCurrentTime()}</div>`;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        userInput.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <span>Leo is typing</span>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI response after delay
        setTimeout(() => {
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Add AI response
            const aiResponse = generateResponse(message);
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            aiMessage.innerHTML = `${aiResponse} <div class="message-time">${getCurrentTime()}</div>`;
            chatMessages.appendChild(aiMessage);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function generateResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    // About responses
    if (lowerMsg.includes('who are you') || lowerMsg.includes('what are you')) {
        return "I'm Leo, a personal AI assistant created to represent Alan Thomas. I can tell you about his skills, projects, and interests!";
    }
    
    // Skills responses
    if (lowerMsg.includes('skill') || lowerMsg.includes('know') || lowerMsg.includes('expert')) {
        return "Alan is proficient in Python, JavaScript, and Linux. He's currently learning about Large Language Models and Cloud Architecture. Would you like details about any specific skill?";
    }
    
    // Project responses
    if (lowerMsg.includes('project') || lowerMsg.includes('work on')) {
        return "Alan has worked on several projects including an AI Personal Assistant and Jules Journey. His current focus is on developing more advanced machine learning applications.";
    }
    
    // Interest responses
    if (lowerMsg.includes('hobby') || lowerMsg.includes('interest') || lowerMsg.includes('fun')) {
        return "Outside of coding, Alan enjoys music production, photography, and gaming. He's particularly fond of classic rock and sci-fi movies.";
    }
    
    if (lowerMsg.includes('music') || lowerMsg.includes('listen')) {
        return "Alan's music taste ranges from Pink Floyd to modern indie artists. He also produces electronic music as a hobby!";
    }
    
    if (lowerMsg.includes('book') || lowerMsg.includes('read')) {
        return "Some of Alan's favorite books include 'Clean Code' by Robert Martin, 'Designing Data-Intensive Applications', and sci-fi classics like 'Dune'.";
    }
    
    // Default responses
    const defaultResponses = [
        "That's an interesting question! Alan would probably say: 'It depends on the context.'",
        "I can tell you more about Alan's technical skills or personal interests. What would you like to know?",
        "Alan is currently focused on his studies and AI research. Would you like details about his current projects?",
        "I'm not sure I understand. Could you rephrase that?",
        "Let me think about that... Alan's perspective would likely be..."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Initialize with some quick replies in chat
setTimeout(() => {
    const quickReplies = [
        "What are your skills?",
        "Tell me about your projects",
        "What do you do for fun?",
        "Who are you?"
    ];
    
    const quickReplyContainer = document.createElement('div');
    quickReplyContainer.className = 'quick-replies';
    quickReplyContainer.style.marginTop = '15px';
    
    quickReplies.forEach(reply => {
        const quickReply = document.createElement('div');
        quickReply.className = 'quick-reply';
        quickReply.textContent = reply;
        quickReply.onclick = function() { sendQuickMessage(reply); };
        quickReplyContainer.appendChild(quickReply);
    });
    
    document.getElementById('chat-messages').appendChild(quickReplyContainer);
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
}, 1000);