import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import SideMenu from './SideMenu';

// Edit icon
import img27 from '../assets/icons/edit.svg';

type ModeType = 'chat' | 'design' | 'controls' | 'brand' | 'code' | 'settings';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

type EditPanelProps = {
  selectedElement?: HTMLElement | null;
  selectedStyles?: {
    textAlign: string;
    color: string;
    fontWeight: string;
    fontSize: string;
  };
  onStyleUpdate?: (property: string, value: string) => void;
};

export default function EditPanel({ selectedElement, selectedStyles, onStyleUpdate }: EditPanelProps = {}) {
  const [activeMode, setActiveMode] = useState<ModeType>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to position latest messages at the top of the panel
  useEffect(() => {
    if (messagesContainerRef.current && messages.length > 0 && !isThinking) {
      setTimeout(() => {
        const container = messagesContainerRef.current;
        if (container) {
          // Scroll to top (0) to show newest messages at top with column-reverse
          container.scrollTop = 0;
        }
      }, 100);
    }
  }, [messages, isThinking]);

  // Automatically switch to design mode when an element is selected
  useEffect(() => {
    if (selectedElement) {
      setActiveMode('design');
      if (isCollapsed) {
        setIsCollapsed(false);
      }
    }
  }, [selectedElement, isCollapsed]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Switch to chat mode when sending a message
    setActiveMode('chat');

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
        content: "I've made the changes you requested. Would you like me to adjust anything else?",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 2500);
  };

  const handlePromptClick = (prompt: string) => {
    setHasInteracted(true);
    setActiveMode('chat');
    setInputValue(prompt);
    // Focus the textarea so user can edit before sending
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const handleUndo = (messageId: string) => {
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex !== -1) {
      const messageToUndo = messages[messageIndex];
      
      // Put the user message back into the input box
      if (messageToUndo.role === 'user') {
        setInputValue(messageToUndo.content);
      }
      
      // Remove messages from this point forward
      setMessages(messages.slice(0, messageIndex));
      
      // Switch to chat mode
      setActiveMode('chat');
      
      // Show prompts if no messages left
      if (messageIndex === 0) {
        setShowPrompts(true);
      }
      
      // Focus the textarea
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-resize textarea as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [inputValue]);


  return (
    <div className={`flex h-full items-center relative shrink-0 transition-all ${isCollapsed ? 'w-[67px]' : 'w-[422px]'}`} data-name="Edit Panel">
      {/* Side Menu */}
      <SideMenu 
        activeMode={activeMode} 
        onModeChange={setActiveMode}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Edit Area - Conditional Content Based on Mode */}
      {!isCollapsed && (
        <div className="bg-brand-navy box-border flex flex-1 flex-col gap-6 h-full items-center justify-end min-h-0 min-w-px p-[15px] relative overflow-hidden" data-name="Edit Area">
        {activeMode === 'chat' && (
          <>
            {/* Messages Container */}
            <div ref={messagesContainerRef} className="flex-1 w-full overflow-y-auto flex flex-col" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
              
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
                <div key={message.id} className="flex flex-col">
                  {message.role === 'user' ? (
                    <div className="flex flex-col gap-0.5 group w-full mb-1">
                      <div className="bg-[rgba(255,255,255,0.1)] group-hover:bg-[rgba(255,255,255,0.13)] border border-[rgba(241,243,255,0.3)] group-hover:border-brand-gray transition-all rounded-xl px-3 py-2 w-full">
                        <p className="text-white text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <button
                        onClick={() => handleUndo(message.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs flex items-center gap-1 self-end"
                      >
                        Undo to here
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="text-white text-sm leading-relaxed opacity-90 mb-6 px-3">
                      {message.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Prompt Suggestions */}
              {showPrompts && messages.length === 0 && (
                <div className="flex flex-col gap-3 items-start w-full" data-name="Prompt Suggestions">
                  <button
                    onClick={() => handlePromptClick('Simplify the language')}
                    className="bg-[rgba(255,255,255,0.07)] flex gap-3 items-center px-3 py-2 rounded-2xl w-full hover:bg-[rgba(255,255,255,0.12)] transition-colors cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <path d="M7.8612 2.53053C7.88905 2.38146 7.96815 2.24682 8.08481 2.14993C8.20148 2.05304 8.34835 2 8.5 2C8.65165 2 8.79853 2.05304 8.91519 2.14993C9.03185 2.24682 9.11095 2.38146 9.1388 2.53053C9.36114 3.70633 9.59843 5.59843 10.5 6.5C11.4016 7.40157 13.2937 7.63886 14.4695 7.8612C14.6185 7.88905 14.7532 7.96815 14.8501 8.08481C14.947 8.20148 15 8.34835 15 8.5C15 8.65165 14.947 8.79853 14.8501 8.91519C14.7532 9.03185 14.6185 9.11095 14.4695 9.1388C13.2937 9.36114 11.4016 9.59843 10.5 10.5C9.59843 11.4016 9.36114 13.2937 9.1388 14.4695C9.11095 14.6185 9.03185 14.7532 8.91519 14.8501C8.79853 14.947 8.65165 15 8.5 15C8.34835 15 8.20148 14.947 8.08481 14.8501C7.96815 14.7532 7.88905 14.6185 7.8612 14.4695C7.63886 13.2937 7.40157 11.4016 6.5 10.5C5.59843 9.59843 3.70633 9.36114 2.53053 9.1388C2.38146 9.11095 2.24682 9.03185 2.14993 8.91519C2.05304 8.79853 2 8.65165 2 8.5C2 8.34835 2.05304 8.20148 2.14993 8.08481C2.24682 7.96815 2.38146 7.88905 2.53053 7.8612C3.70633 7.63886 5.59843 7.40157 6.5 6.5C7.40157 5.59843 7.63886 3.70633 7.8612 2.53053Z" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.667 14V17.3333" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.3333 15.6665H14" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-medium leading-normal text-sm text-white text-left">
                      Simplify the language
                    </p>
                  </button>
                  <button
                    onClick={() => handlePromptClick('Add a stronger call-to-action')}
                    className="bg-[rgba(255,255,255,0.07)] flex gap-3 items-center px-3 py-2 rounded-2xl w-full hover:bg-[rgba(255,255,255,0.12)] transition-colors cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <path d="M7.8612 2.53053C7.88905 2.38146 7.96815 2.24682 8.08481 2.14993C8.20148 2.05304 8.34835 2 8.5 2C8.65165 2 8.79853 2.05304 8.91519 2.14993C9.03185 2.24682 9.11095 2.38146 9.1388 2.53053C9.36114 3.70633 9.59843 5.59843 10.5 6.5C11.4016 7.40157 13.2937 7.63886 14.4695 7.8612C14.6185 7.88905 14.7532 7.96815 14.8501 8.08481C14.947 8.20148 15 8.34835 15 8.5C15 8.65165 14.947 8.79853 14.8501 8.91519C14.7532 9.03185 14.6185 9.11095 14.4695 9.1388C13.2937 9.36114 11.4016 9.59843 10.5 10.5C9.59843 11.4016 9.36114 13.2937 9.1388 14.4695C9.11095 14.6185 9.03185 14.7532 8.91519 14.8501C8.79853 14.947 8.65165 15 8.5 15C8.34835 15 8.20148 14.947 8.08481 14.8501C7.96815 14.7532 7.88905 14.6185 7.8612 14.4695C7.63886 13.2937 7.40157 11.4016 6.5 10.5C5.59843 9.59843 3.70633 9.36114 2.53053 9.1388C2.38146 9.11095 2.24682 9.03185 2.14993 8.91519C2.05304 8.79853 2 8.65165 2 8.5C2 8.34835 2.05304 8.20148 2.14993 8.08481C2.24682 7.96815 2.38146 7.88905 2.53053 7.8612C3.70633 7.63886 5.59843 7.40157 6.5 6.5C7.40157 5.59843 7.63886 3.70633 7.8612 2.53053Z" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.667 14V17.3333" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.3333 15.6665H14" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-medium leading-normal text-sm text-white text-left">
                      Add a stronger call-to-action
                    </p>
                  </button>
                  <button
                    onClick={() => handlePromptClick('Highlight the biggest pain points and how this lead magnet solves them')}
                    className="bg-[rgba(255,255,255,0.07)] flex gap-3 items-center px-3 py-2 rounded-2xl w-full hover:bg-[rgba(255,255,255,0.12)] transition-colors cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                      <path d="M7.8612 2.53053C7.88905 2.38146 7.96815 2.24682 8.08481 2.14993C8.20148 2.05304 8.34835 2 8.5 2C8.65165 2 8.79853 2.05304 8.91519 2.14993C9.03185 2.24682 9.11095 2.38146 9.1388 2.53053C9.36114 3.70633 9.59843 5.59843 10.5 6.5C11.4016 7.40157 13.2937 7.63886 14.4695 7.8612C14.6185 7.88905 14.7532 7.96815 14.8501 8.08481C14.947 8.20148 15 8.34835 15 8.5C15 8.65165 14.947 8.79853 14.8501 8.91519C14.7532 9.03185 14.6185 9.11095 14.4695 9.1388C13.2937 9.36114 11.4016 9.59843 10.5 10.5C9.59843 11.4016 9.36114 13.2937 9.1388 14.4695C9.11095 14.6185 9.03185 14.7532 8.91519 14.8501C8.79853 14.947 8.65165 15 8.5 15C8.34835 15 8.20148 14.947 8.08481 14.8501C7.96815 14.7532 7.88905 14.6185 7.8612 14.4695C7.63886 13.2937 7.40157 11.4016 6.5 10.5C5.59843 9.59843 3.70633 9.36114 2.53053 9.1388C2.38146 9.11095 2.24682 9.03185 2.14993 8.91519C2.05304 8.79853 2 8.65165 2 8.5C2 8.34835 2.05304 8.20148 2.14993 8.08481C2.24682 7.96815 2.38146 7.88905 2.53053 7.8612C3.70633 7.63886 5.59843 7.40157 6.5 6.5C7.40157 5.59843 7.63886 3.70633 7.8612 2.53053Z" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.667 14V17.3333" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.3333 15.6665H14" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-medium leading-normal text-sm text-white text-left">
                      Highlight the biggest pain points and how this lead magnet solves them
                    </p>
                  </button>
                </div>
              )}

              {/* Instructional Text */}
              {showPrompts && messages.length === 0 && (
                <p className="font-normal opacity-70 text-sm text-white w-full whitespace-pre-wrap mb-4">
                  Edit your lead magnet with one of these prompts or make your own in the chat:
                </p>
              )}
            </div>
          </>
        )}

        {activeMode === 'design' && (
          <div className="flex flex-col flex-1 w-full overflow-y-auto p-4">
            {!selectedElement ? (
              <div className="flex items-center justify-center flex-1">
                <p className="text-white opacity-70 text-center">
                  Select an image, text or icon to start designing.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-white font-semibold text-lg mb-4">Text Properties</h3>
                
                {/* Text Align */}
                <div>
                  <label className="text-white text-sm mb-2 block">Text Align</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['left', 'center', 'right', 'justify'].map((align) => (
                      <button
                        key={align}
                        onClick={() => onStyleUpdate?.('textAlign', align)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          selectedStyles?.textAlign === align
                            ? 'bg-brand-purple text-white'
                            : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.15)]'
                        }`}
                      >
                        {align.charAt(0).toUpperCase() + align.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="text-white text-sm mb-2 block">Text Color</label>
                  <input
                    type="color"
                    value={selectedStyles?.color || '#000000'}
                    onChange={(e) => onStyleUpdate?.('color', e.target.value)}
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Font Weight */}
                <div>
                  <label className="text-white text-sm mb-2 block">Font Weight</label>
                  <select
                    value={selectedStyles?.fontWeight || 'normal'}
                    onChange={(e) => onStyleUpdate?.('fontWeight', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] focus:border-brand-purple focus:outline-none"
                  >
                    <option value="normal" className="bg-brand-navy">Normal (400)</option>
                    <option value="500" className="bg-brand-navy">Medium (500)</option>
                    <option value="600" className="bg-brand-navy">Semibold (600)</option>
                    <option value="bold" className="bg-brand-navy">Bold (700)</option>
                  </select>
                </div>

                {/* Font Size */}
                <div>
                  <label className="text-white text-sm mb-2 block">Font Size</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={parseInt(selectedStyles?.fontSize || '16')}
                      onChange={(e) => onStyleUpdate?.('fontSize', e.target.value + 'px')}
                      className="flex-1 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] focus:border-brand-purple focus:outline-none"
                      min="8"
                      max="72"
                    />
                    <span className="text-white text-sm">px</span>
                  </div>
                </div>

                {/* Note */}
                <p className="text-white text-sm">Edit fonts in the Brand Tab</p>
              </div>
            )}
          </div>
        )}

        {activeMode === 'controls' && (
          <div className="flex flex-col items-center justify-center flex-1 w-full gap-4">
            <h2 className="text-2xl font-semibold text-white">Controls</h2>
            <p className="text-white opacity-70 text-center">
              Control settings and options will appear here.
            </p>
          </div>
        )}

        {activeMode === 'brand' && (
          <div className="flex flex-col items-center justify-center flex-1 w-full gap-4">
            <h2 className="text-2xl font-semibold text-white">Brand Mode</h2>
            <p className="text-white opacity-70 text-center">
              Brand customization options will appear here.
            </p>
          </div>
        )}

        {activeMode === 'code' && (
          <div className="flex flex-col items-center justify-center flex-1 w-full gap-4">
            <h2 className="text-2xl font-semibold text-white">Code Mode</h2>
            <p className="text-white opacity-70 text-center">
              Code editor will appear here.
            </p>
          </div>
        )}

        {activeMode === 'settings' && (
          <div className="flex flex-col items-center justify-center flex-1 w-full gap-4">
            <h2 className="text-2xl font-semibold text-white">Settings</h2>
            <p className="text-white opacity-70 text-center">
              Settings panel will appear here.
            </p>
          </div>
        )}

        {/* Chat Input Box - Hidden in Design Mode */}
        {activeMode !== 'design' && (
          <div className={`focus-within:bg-[rgba(255,255,255,0.13)] border-[0.5px] border-solid box-border flex flex-col gap-1 items-start p-2.5 rounded-lg shrink-0 w-full focus-within:border-brand-gray transition-all ${
            !hasInteracted ? 'animate-border-sweep' : 'bg-[rgba(255,255,255,0.1)] border-[rgba(241,243,255,0.3)]'
          }`} data-name="Chat Box">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setHasInteracted(true)}
                onClick={() => setHasInteracted(true)}
                placeholder="Chat here..."
                className="w-full bg-transparent border-none outline-none resize-none text-sm text-white placeholder-white placeholder-opacity-70 font-normal leading-relaxed overflow-hidden"
                style={{ minHeight: '48px', maxHeight: '200px' }}
              />
              
              {/* Chat Buttons */}
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={() => setHasInteracted(true)}
                  className="bg-[rgba(241,243,255,0.3)] box-border flex gap-1 items-center justify-center px-2 py-1 rounded-lg shrink-0 hover:bg-[rgba(241,243,255,0.4)] transition-colors cursor-pointer"
                >
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
                </button>
                
                <button
                  onClick={() => {
                    setHasInteracted(true);
                    handleSendMessage();
                  }}
                  className="bg-[rgba(241,243,255,0.3)] box-border flex items-center justify-center p-1.5 rounded-full shrink-0 hover:bg-[rgba(241,243,255,0.4)] transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
        )}
        </div>
      )}
    </div>
  );
}

