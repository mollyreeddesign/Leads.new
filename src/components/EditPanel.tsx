import { useState, useRef, useEffect } from 'react';
import SideMenu from './SideMenu';

// Design icon parts (white - for chat button)
import img22 from '../assets/icons/design-white-1.svg';
import img23 from '../assets/icons/design-white-2.svg';
import img24 from '../assets/icons/design-white-3.svg';
import img25 from '../assets/icons/design-white-4.svg';
import img26 from '../assets/icons/design-white-5.svg';

// Edit and arrow icons
import img27 from '../assets/icons/edit.svg';
import img28 from '../assets/icons/arrow-up-1.svg';
import img29 from '../assets/icons/arrow-up-2.svg';

type ModeType = 'chat' | 'design' | 'quiz' | 'brand' | 'code' | 'settings';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export default function EditPanel() {
  const [activeMode, setActiveMode] = useState<ModeType>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowPrompts(false);
    setIsThinking(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I've made the changes you requested. The title is now smaller. Would you like me to adjust anything else?",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleUndo = (messageId: string) => {
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex !== -1) {
      setMessages(messages.slice(0, messageIndex));
      if (messages.length === 0) {
        setShowPrompts(true);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full items-center relative shrink-0 w-[422px]" data-name="Edit Panel">
      {/* Side Menu */}
      <SideMenu activeMode={activeMode} onModeChange={setActiveMode} />

      {/* Edit Area - Conditional Content Based on Mode */}
      <div className="bg-brand-navy box-border flex flex-1 flex-col gap-[18px] h-full items-center justify-end min-h-0 min-w-px p-[15px] relative overflow-hidden" data-name="Edit Area">
        {activeMode === 'chat' && (
          <>
            {/* Messages Container */}
            <div className="flex-1 w-full overflow-y-auto flex flex-col gap-4" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
              <div ref={messagesEndRef} />
              
              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="animate-bounce">
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.7">
                        <path d="M9.8685 2L3 8.62978L6.3252 12L13.1937 5.55746L15.4105 7.80427L8.64753 14.6298L11.9727 18L18.9204 11.1745V4.43405L16.5189 2H9.8685Z" stroke="#F1F3FF" strokeWidth="1.67" strokeLinejoin="round"/>
                        <path d="M8.31836 20L8 20.3184L6.18164 18.5L6.5 18.1816L8.31836 20Z" stroke="#F1F3FF" strokeWidth="1.67" strokeLinejoin="round"/>
                        <path d="M3.31836 13L3 13.3184L1.18164 11.5L1.5 11.1816L3.31836 13Z" stroke="#F1F3FF" strokeWidth="1.67" strokeLinejoin="round"/>
                        <path d="M10.8252 12.5L14.3252 16" stroke="#F1F3FF" strokeWidth="1.67"/>
                        <path d="M5.3252 6.5L8.8252 10" stroke="#F1F3FF" strokeWidth="1.67"/>
                      </g>
                    </svg>
                  </div>
                  <p className="text-white opacity-70 text-sm">Thinking...</p>
                </div>
              )}

              {/* Messages */}
              {[...messages].reverse().map((message) => (
                <div key={message.id} className="flex flex-col gap-2">
                  {message.role === 'user' ? (
                    <div className="flex items-start gap-2 group">
                      <div className="bg-[rgba(241,243,255,0.2)] border border-[rgba(208,210,221,0.5)] rounded-xl px-4 py-3 flex-1">
                        <p className="text-white text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <button
                        onClick={() => handleUndo(message.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs flex items-center gap-1 whitespace-nowrap"
                      >
                        Undo to here
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="text-white text-sm leading-relaxed opacity-90">
                      {message.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Instructional Text */}
              {showPrompts && messages.length === 0 && (
                <p className="font-normal opacity-70 text-sm text-white w-full whitespace-pre-wrap">
                  Edit your lead magnet with one of these prompts or make your own in the chat:
                </p>
              )}

              {/* Prompt Suggestions */}
              {showPrompts && messages.length === 0 && (
                <div className="flex flex-col gap-2 items-start w-full" data-name="Prompt Suggestions">
                  <button
                    onClick={() => handlePromptClick('Add a new custom section.')}
                    className="border border-[rgba(208,210,221,0.7)] border-solid box-border flex gap-2 items-center px-3 py-2 rounded-lg w-full hover:bg-[rgba(241,243,255,0.1)] transition-colors cursor-pointer"
                  >
                    <p className="font-medium leading-normal text-sm text-white text-left">
                      Add a new custom section.
                    </p>
                  </button>
                  <button
                    onClick={() => handlePromptClick('Make the icons purple and center align them with the text.')}
                    className="border border-[rgba(208,210,221,0.7)] border-solid box-border flex gap-2 items-center px-3 py-2 rounded-lg w-full hover:bg-[rgba(241,243,255,0.1)] transition-colors cursor-pointer"
                  >
                    <p className="font-medium leading-normal text-sm text-white text-left">
                      Make the icons purple and center align them with the text.
                    </p>
                  </button>
                  <button
                    onClick={() => handlePromptClick('Change the title of the magnet.')}
                    className="border border-[rgba(208,210,221,0.7)] border-solid box-border flex gap-2 items-center px-3 py-2 rounded-lg w-full hover:bg-[rgba(241,243,255,0.1)] transition-colors cursor-pointer"
                  >
                    <p className="font-medium leading-normal text-sm text-white text-left">
                      Change the title of the magnet.
                    </p>
                  </button>
                </div>
              )}
            </div>

            {/* Chat Input Box */}
            <div className="bg-[rgba(255,255,255,0.1)] border-[0.5px] border-brand-gray border-solid box-border flex flex-col gap-1 min-h-[95px] items-start p-2.5 rounded-lg shrink-0 w-full" data-name="Chat Box">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Chat here..."
                className="flex-1 w-full bg-transparent border-none outline-none resize-none text-sm text-white placeholder-white placeholder-opacity-70 font-medium"
                rows={2}
              />
              
              {/* Chat Buttons */}
              <div className="flex items-center justify-between w-full">
                <div className="bg-[rgba(241,243,255,0.3)] box-border flex gap-1 items-center justify-center px-2 py-1 rounded-lg shrink-0">
                  <p className="font-medium leading-normal text-xs text-brand-white">
                    Design
                  </p>
                  <div className="overflow-clip relative shrink-0 size-4">
                    <div className="absolute bottom-3/4 left-1/2 right-[41.67%] top-[17.08%]">
                      <div className="absolute inset-[-52.63%_-50%]">
                        <img alt="" className="block max-w-none size-full" src={img22} />
                      </div>
                    </div>
                    <div className="absolute inset-[30%_78.75%_66.67%_9.17%]">
                      <div className="absolute inset-[-125.03%_-34.49%]">
                        <img alt="" className="block max-w-none size-full" src={img23} />
                      </div>
                    </div>
                    <div className="absolute bottom-[41.67%] left-[17.08%] right-3/4 top-1/2">
                      <div className="absolute inset-[-50%_-52.63%]">
                        <img alt="" className="block max-w-none size-full" src={img24} />
                      </div>
                    </div>
                    <div className="absolute inset-[9.17%_66.67%_78.75%_30%]">
                      <div className="absolute inset-[-34.49%_-125.03%]">
                        <img alt="" className="block max-w-none size-full" src={img25} />
                      </div>
                    </div>
                    <div className="absolute inset-[37.49%_12.5%_12.49%_37.49%]">
                      <div className="absolute inset-[-8.33%]">
                        <img alt="" className="block max-w-none size-full" src={img26} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 items-center">
                  <div className="bg-[rgba(241,243,255,0.3)] box-border flex gap-1 items-center justify-center px-2 py-1 rounded-lg shrink-0">
                    <p className="font-medium leading-normal text-xs text-brand-white">
                      Edit
                    </p>
                    <div className="overflow-clip relative shrink-0 size-4">
                      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]">
                        <div className="absolute inset-[-16.67%_-8.33%]">
                          <img alt="" className="block max-w-none size-full" src={img27} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="bg-[rgba(241,243,255,0.3)] box-border flex gap-1 items-center justify-center px-1.5 py-1 rounded-full shrink-0 hover:bg-[rgba(241,243,255,0.4)] transition-colors cursor-pointer"
                  >
                    <div className="overflow-clip relative shrink-0 size-4">
                      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-[20.83%]">
                        <div className="absolute inset-[-14.29%_-7.14%]">
                          <img alt="" className="block max-w-none size-full" src={img28} />
                        </div>
                      </div>
                      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]">
                        <div className="absolute inset-[-7.14%_-0.67px]">
                          <img alt="" className="block max-w-none size-full" src={img29} />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeMode === 'design' && (
          <div className="flex flex-col items-center justify-center h-full w-full gap-4">
            <h2 className="text-2xl font-semibold text-white">Design Mode</h2>
            <p className="text-white opacity-70 text-center">
              Design customization tools will appear here.
            </p>
          </div>
        )}

        {activeMode === 'quiz' && (
          <div className="flex flex-col items-center justify-center h-full w-full gap-4">
            <h2 className="text-2xl font-semibold text-white">Quiz Mode</h2>
            <p className="text-white opacity-70 text-center">
              Quiz builder tools will appear here.
            </p>
          </div>
        )}

        {activeMode === 'brand' && (
          <div className="flex flex-col items-center justify-center h-full w-full gap-4">
            <h2 className="text-2xl font-semibold text-white">Brand Mode</h2>
            <p className="text-white opacity-70 text-center">
              Brand customization options will appear here.
            </p>
          </div>
        )}

        {activeMode === 'code' && (
          <div className="flex flex-col items-center justify-center h-full w-full gap-4">
            <h2 className="text-2xl font-semibold text-white">Code Mode</h2>
            <p className="text-white opacity-70 text-center">
              Code editor will appear here.
            </p>
          </div>
        )}

        {activeMode === 'settings' && (
          <div className="flex flex-col items-center justify-center h-full w-full gap-4">
            <h2 className="text-2xl font-semibold text-white">Settings</h2>
            <p className="text-white opacity-70 text-center">
              Settings panel will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

