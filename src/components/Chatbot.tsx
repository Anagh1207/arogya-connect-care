
import { useState } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm your Arogya Care assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const suggestedQuestions = [
    "How do I book an appointment?",
    "What services do you offer?",
    "How does blood donation work?",
    "How to request an ambulance?",
    "Upload medical reports",
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText('');
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('appointment') || lowerQuery.includes('book')) {
      return "To book an appointment, go to your Patient Dashboard and click 'Book Consultation'. You can choose from available doctors and time slots.";
    } else if (lowerQuery.includes('blood') || lowerQuery.includes('donor')) {
      return "For blood donation, visit our Emergency Services page. You can register as a donor or request blood based on your location and blood type.";
    } else if (lowerQuery.includes('ambulance')) {
      return "To request an ambulance, go to Emergency Services and click 'Request Ambulance'. We'll track your location and dispatch the nearest available ambulance.";
    } else if (lowerQuery.includes('report') || lowerQuery.includes('upload')) {
      return "You can upload medical reports in your Patient Dashboard under 'My Health Records'. Our AI will analyze your reports and provide insights.";
    } else if (lowerQuery.includes('service')) {
      return "Arogya Care offers video consultations, AI report analysis, blood donation matching, ambulance services, and comprehensive health record management.";
    } else {
      return "I'm here to help with Arogya Care services. You can ask about appointments, blood donation, ambulance requests, uploading reports, or our services.";
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            style={{ backgroundColor: '#013c22' }}
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div 
            className="p-4 rounded-t-xl flex items-center justify-between"
            style={{ backgroundColor: '#013c22' }}
          >
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Arogya Care Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  style={{
                    backgroundColor: message.sender === 'user' ? '#093e43' : undefined
                  }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.sender === 'bot' ? (
                      <Bot className="w-4 h-4 text-gray-600" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                    <span className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs h-7 px-2"
                    style={{ borderColor: '#c9e6e8', color: '#093e43' }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div 
            className="p-4 border-t rounded-b-xl"
            style={{ backgroundColor: '#c9e6e8' }}
          >
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-sm border-0 focus:ring-2"
                style={{ 
                  backgroundColor: 'white',
                  outline: 'none',
                  boxShadow: 'none'
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="px-3"
                style={{ backgroundColor: '#013c22' }}
                disabled={!inputText.trim()}
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
