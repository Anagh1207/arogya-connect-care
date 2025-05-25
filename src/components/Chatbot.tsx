
import { useState } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Arogya Care assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestedQuestions = [
    "How do I book an appointment?",
    "How to request blood donors?",
    "What medical reports can I upload?",
    "How does ambulance service work?",
    "How to contact my doctor?"
  ];

  const botResponses: { [key: string]: string } = {
    'appointment': "To book an appointment, go to your Patient Dashboard and click 'Book New Appointment'. You can choose your preferred doctor and available time slots.",
    'blood': "For blood requests, visit our Emergency Services page. Select your required blood group, location, and urgency level. We'll notify nearby verified donors.",
    'report': "You can upload medical reports in PDF, JPG, or PNG format from your dashboard. Our AI will analyze and provide summaries of your reports.",
    'ambulance': "To request an ambulance, go to Emergency Services and click 'Request Ambulance'. Share your location and emergency details for immediate dispatch.",
    'doctor': "You can contact your assigned doctor through the secure messaging feature in your Patient Dashboard or during scheduled video consultations.",
    'default': "I can help you with appointments, blood requests, medical reports, ambulance services, and doctor consultations. Please ask me about any Arogya Care service!"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Simple keyword-based response
    const lowerInput = inputMessage.toLowerCase();
    let response = botResponses.default;

    if (lowerInput.includes('appointment') || lowerInput.includes('book')) {
      response = botResponses.appointment;
    } else if (lowerInput.includes('blood') || lowerInput.includes('donor')) {
      response = botResponses.blood;
    } else if (lowerInput.includes('report') || lowerInput.includes('upload')) {
      response = botResponses.report;
    } else if (lowerInput.includes('ambulance') || lowerInput.includes('emergency')) {
      response = botResponses.ambulance;
    } else if (lowerInput.includes('doctor') || lowerInput.includes('contact')) {
      response = botResponses.doctor;
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-14 h-14 shadow-lg"
            style={{ backgroundColor: '#013c22', color: 'white' }}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96">
          <Card className="shadow-2xl">
            <CardHeader className="pb-3" style={{ backgroundColor: '#013c22', color: 'white' }}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Arogya Care Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      style={{
                        backgroundColor: message.sender === 'user' ? '#093e43' : undefined
                      }}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && <Bot className="w-4 h-4 mt-0.5 text-gray-600" />}
                        <div className="flex-1">
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-gray-200' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                        {message.sender === 'user' && <User className="w-4 h-4 mt-0.5 text-gray-200" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
                  <div className="space-y-2">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="w-full text-left text-sm p-2 rounded border hover:bg-gray-50 transition-colors"
                        style={{ borderColor: '#c9e6e8' }}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about Arogya Care services..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: '#c9e6e8', focusRingColor: '#093e43' }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    style={{ backgroundColor: '#013c22', color: 'white' }}
                    className="hover:opacity-90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;
