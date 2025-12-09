import { useState, useRef, useEffect } from 'react';
import { 
  ArrowUp, 
  Check, 
  X, 
  Heart, 
  Star, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Settings, 
  Search, 
  Home,
  Calendar
} from 'lucide-react';
import SideMenu from './SideMenu';

// Edit icon
import img27 from '../assets/icons/edit.svg';

// Helper function to convert RGB/RGBA to Hex
function rgbToHex(color: string): string {
  // If already hex, return as is
  if (color.startsWith('#')) return color;
  
  // Match RGB or RGBA values
  const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
  if (!match) return '#000000';
  
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

type ModeType = 'chat' | 'design' | 'controls' | 'brand' | 'code' | 'settings';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

type SectionType = 'resultsHeader' | 'personalityTraits' | 'careTips' | null;

type EditPanelProps = {
  selectedElement?: HTMLElement | SVGElement | null;
  selectedElementType?: 'text' | 'image' | 'icon' | null;
  selectedStyles?: {
    textAlign: string;
    color: string;
    fontWeight: string;
    fontSize: string;
    fontFamily: string;
  };
  selectedImageUrl?: string;
  selectedIconHtml?: string;
  onStyleUpdate?: (property: string, value: string) => void;
  onImageUpdate?: (newUrl: string) => void;
  onIconUpdate?: (newIconHtml: string) => void;
  onModeChange?: (mode: ModeType) => void;
  onThemeChange?: (colors: ThemeColors) => void;
  selectedSection?: SectionType;
  onPromptEntered?: (entered: {resultsHeader: boolean, personalityTraits: boolean}) => void;
};

// Theme palette definitions - exported for use in other components
export const themePalettes = [
  { id: 'original', name: 'Original', colors: ['#836FFF', '#F5D0FE', '#22C55E', '#F9FAFB'] },
  { id: 'ocean-blue', name: 'Ocean Blue', colors: ['#0047AB', '#4A90E2', '#1E3A8A', '#334155'] },
  { id: 'forest-green', name: 'Forest Green', colors: ['#065F46', '#10B981', '#064E3B', '#334155'] },
  { id: 'sunset-orange', name: 'Sunset Orange', colors: ['#C2410C', '#F97316', '#9A3412', '#334155'] },
  { id: 'royal-purple', name: 'Royal Purple', colors: ['#6D28D9', '#A78BFA', '#5B21B6', '#334155'] },
  { id: 'modern-gray', name: 'Modern Gray', colors: ['#1F2937', '#4B5563', '#6B7280', '#9CA3AF'] },
  { id: 'creative-blue', name: 'Creative Blue', colors: ['#4F46E5', '#818CF8', '#14B8A6', '#1E40AF'] },
  { id: 'pro-purple', name: 'Pro Purple', colors: ['#7C3AED', '#A78BFA', '#8B5CF6', '#A855F7'] },
  { id: 'growth-green', name: 'Growth Green', colors: ['#047857', '#10B981', '#14B8A6', '#065F46'] },
  { id: 'minimal-black', name: 'Minimal Black', colors: ['#000000', '#374151', '#6B7280', '#9CA3AF'] },
  { id: 'design-pink', name: 'Design Pink', colors: ['#DB2777', '#EC4899', '#F472B6', '#BE185D'] },
];

// Theme colors type for passing to preview pages
export type ThemeColors = {
  primary: string;      // Main buttons, accents
  secondary: string;    // Lighter accents, backgrounds
  accent: string;       // Highlights, checkmarks
  text: string;         // Dark text color
};

export default function EditPanel({ selectedElement, selectedElementType, selectedStyles, selectedImageUrl, selectedIconHtml, onStyleUpdate, onImageUpdate, onIconUpdate, onModeChange, onThemeChange, selectedSection, onPromptEntered }: EditPanelProps = {}) {
  const [activeMode, setActiveMode] = useState<ModeType>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasControlsInteracted, setHasControlsInteracted] = useState(false);
  const [controlsMessages, setControlsMessages] = useState<Record<string, Message[]>>({
    resultsHeader: [],
    personalityTraits: [],
    careTips: []
  });
  const [isControlsThinking, setIsControlsThinking] = useState(false);
  const [controlsInputValue, setControlsInputValue] = useState('');
  const [showControlsPrompts, setShowControlsPrompts] = useState<Record<string, boolean>>({
    resultsHeader: true,
    personalityTraits: true,
    careTips: true
  });
  const [hasPromptBeenEntered, setHasPromptBeenEntered] = useState<Record<string, boolean>>({
    resultsHeader: false,
    personalityTraits: false,
    careTips: false
  });
  const [shouldAnimatePrompts, setShouldAnimatePrompts] = useState(false);
  const controlsMessagesContainerRef = useRef<HTMLDivElement>(null);
  const controlsTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [activeImageTab, setActiveImageTab] = useState<'url' | 'upload' | 'generate'>('url');
  const [activeIconTab, setActiveIconTab] = useState<'swap' | 'upload' | 'generate'>('swap');
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('original');
  const [pageBgColor, setPageBgColor] = useState('#FFFFFF');
  const [pageSecondaryBgColor, setPageSecondaryBgColor] = useState('#F0F0F0');
  const [buttonPrimaryColor, setButtonPrimaryColor] = useState('#836FFF');
  const [buttonSecondaryColor, setButtonSecondaryColor] = useState('#F1F3FF');
  const [buttonCornerRadius, setButtonCornerRadius] = useState('8');
  const [formBorderColor, setFormBorderColor] = useState('#D1D5DB');
  const [formBackgroundColor, setFormBackgroundColor] = useState('#FFFFFF');
  const [formBorderRadius, setFormBorderRadius] = useState('8');
  const [cardBorderColor, setCardBorderColor] = useState('#E5E7EB');
  const [cardBackgroundColor, setCardBackgroundColor] = useState('#FFFFFF');
  const [cardBorderRadius, setCardBorderRadius] = useState('12');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

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

  // Notify parent when mode changes
  useEffect(() => {
    if (onModeChange) {
      onModeChange(activeMode);
    }
  }, [activeMode, onModeChange]);

  // Reset controls interaction state when mode or section changes
  useEffect(() => {
    if (activeMode === 'controls') {
      setHasControlsInteracted(false);
      // Clear input when switching sections
      setControlsInputValue('');
      // Reset thinking state when switching sections
      setIsControlsThinking(false);
      // Reset animation state when section changes
      setShouldAnimatePrompts(false);
      // Trigger animation when section is selected, with delay to ensure reset
      if (selectedSection) {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          setTimeout(() => {
            setShouldAnimatePrompts(true);
          }, 100);
        });
      }
    } else {
      // Clear controls messages when leaving controls mode
      setControlsMessages({
        resultsHeader: [],
        personalityTraits: [],
        careTips: []
      });
      setControlsInputValue('');
      setShowControlsPrompts({
        resultsHeader: true,
        personalityTraits: true,
        careTips: true
      });
      setIsControlsThinking(false);
      setHasPromptBeenEntered({
        resultsHeader: false,
        personalityTraits: false,
        careTips: false
      });
      setShouldAnimatePrompts(false);
      if (onPromptEntered) {
        onPromptEntered({
          resultsHeader: false,
          personalityTraits: false
        });
      }
    }
  }, [activeMode, selectedSection, onPromptEntered]);

  // Notify parent when prompt is entered
  useEffect(() => {
    if (onPromptEntered) {
      onPromptEntered({
        resultsHeader: hasPromptBeenEntered.resultsHeader,
        personalityTraits: hasPromptBeenEntered.personalityTraits
      });
    }
  }, [hasPromptBeenEntered.resultsHeader, hasPromptBeenEntered.personalityTraits, onPromptEntered]);

  // Reset and trigger animation when prompts are shown
  useEffect(() => {
    if (selectedSection && showControlsPrompts[selectedSection] && (!controlsMessages[selectedSection] || controlsMessages[selectedSection].length === 0)) {
      setShouldAnimatePrompts(false);
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        setTimeout(() => {
          setShouldAnimatePrompts(true);
        }, 100);
      });
    }
  }, [showControlsPrompts, controlsMessages, selectedSection]);

  // Scroll to position latest messages at the top of the controls panel
  useEffect(() => {
    if (controlsMessagesContainerRef.current && selectedSection && controlsMessages[selectedSection]?.length > 0 && !isControlsThinking) {
      setTimeout(() => {
        const container = controlsMessagesContainerRef.current;
        if (container) {
          container.scrollTop = 0;
        }
      }, 100);
    }
  }, [controlsMessages, isControlsThinking, selectedSection]);

  // Handle controls chat message send
  const handleControlsSendMessage = () => {
    if (!controlsInputValue.trim() || !selectedSection) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: controlsInputValue,
      timestamp: Date.now(),
    };

    setControlsMessages(prev => ({
      ...prev,
      [selectedSection]: [...(prev[selectedSection] || []), userMessage]
    }));
    setControlsInputValue('');
    setShowControlsPrompts(prev => ({
      ...prev,
      [selectedSection]: false
    }));
    setIsControlsThinking(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I've made the changes you requested. Would you like me to adjust anything else?",
        timestamp: Date.now(),
      };
      setControlsMessages(prev => ({
        ...prev,
        [selectedSection]: [...(prev[selectedSection] || []), aiMessage]
      }));
      setIsControlsThinking(false);
      setHasPromptBeenEntered(prev => ({
        ...prev,
        [selectedSection]: true
      }));
    }, 2500);
  };

  // Handle controls prompt click
  const handleControlsPromptClick = (prompt: string) => {
    setHasControlsInteracted(true);
    setControlsInputValue(prompt);
    setTimeout(() => {
      controlsTextareaRef.current?.focus();
    }, 100);
  };

  // Handle controls undo
  const handleControlsUndo = (messageId: string) => {
    if (!selectedSection) return;
    const sectionMessages = controlsMessages[selectedSection] || [];
    const messageIndex = sectionMessages.findIndex(m => m.id === messageId);
    if (messageIndex !== -1) {
      const messageToUndo = sectionMessages[messageIndex];
      
      if (messageToUndo.role === 'user') {
        setControlsInputValue(messageToUndo.content);
      }
      
      setControlsMessages(prev => ({
        ...prev,
        [selectedSection]: sectionMessages.slice(0, messageIndex)
      }));
      
      if (messageIndex === 0) {
        setShowControlsPrompts(prev => ({
          ...prev,
          [selectedSection]: true
        }));
      }
      
      setTimeout(() => {
        controlsTextareaRef.current?.focus();
      }, 100);
    }
  };

  // Handle controls key down
  const handleControlsKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleControlsSendMessage();
    }
  };

  // Auto-resize controls textarea
  useEffect(() => {
    const textarea = controlsTextareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [controlsInputValue]);

  // Update image URL input when an image is selected
  useEffect(() => {
    if (selectedImageUrl) {
      setImageUrlInput(selectedImageUrl);
    }
  }, [selectedImageUrl]);

  // Update icon when an icon is selected
  useEffect(() => {
    if (selectedIconHtml) {
      setSelectedIcon(selectedIconHtml);
    }
  }, [selectedIconHtml]);

  // Close theme dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Notify parent when theme changes
  useEffect(() => {
    if (onThemeChange && selectedTheme) {
      const theme = themePalettes.find(t => t.id === selectedTheme);
      if (theme) {
        onThemeChange({
          primary: theme.colors[0],
          secondary: theme.colors[1],
          accent: theme.colors[2],
          text: theme.colors[3]
        });
      }
    }
  }, [selectedTheme, onThemeChange]);

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
            <div ref={messagesContainerRef} className="flex-1 w-full overflow-y-auto flex flex-col edit-panel-scroll" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
              
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
          <div className="flex flex-col flex-1 w-full overflow-y-auto edit-panel-scroll">
            {!selectedElement ? (
              <div className="flex items-center justify-center flex-1">
            <p className="text-white opacity-70 text-center">
                  Select an image, text or icon to start designing.
                </p>
              </div>
            ) : selectedElementType === 'image' ? (
              <div className="space-y-6 pt-4">
                <h3 className="text-white font-semibold text-lg mb-4">Edit Image</h3>
                
                {/* Image Preview */}
                <div className="w-full aspect-video bg-[rgba(255,255,255,0.05)] rounded-lg overflow-hidden flex items-center justify-center border border-[rgba(255,255,255,0.1)]">
                  <img 
                    src={imageUrlInput || selectedImageUrl}
                    alt="Selected" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveImageTab('url')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeImageTab === 'url'
                        ? 'bg-[rgba(255,255,255,0.15)] text-white'
                        : 'bg-[rgba(255,255,255,0.05)] text-white/50 hover:bg-[rgba(255,255,255,0.1)] hover:text-white/70'
                    }`}
                  >
                    URL
                  </button>
                  <button
                    onClick={() => setActiveImageTab('upload')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeImageTab === 'upload'
                        ? 'bg-[rgba(255,255,255,0.15)] text-white'
                        : 'bg-[rgba(255,255,255,0.05)] text-white/50 hover:bg-[rgba(255,255,255,0.1)] hover:text-white/70'
                    }`}
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setActiveImageTab('generate')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeImageTab === 'generate'
                        ? 'bg-[rgba(255,255,255,0.15)] text-white'
                        : 'bg-[rgba(255,255,255,0.05)] text-white/50 hover:bg-[rgba(255,255,255,0.1)] hover:text-white/70'
                    }`}
                  >
                    Generate
                  </button>
                </div>

                {/* URL Tab Content */}
                {activeImageTab === 'url' && (
                  <div>
                    <label className="text-white text-sm mb-2 block">Image URL</label>
                    <input
                      type="text"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] focus:border-brand-purple focus:outline-none placeholder-white/30"
                    />
                  </div>
                )}

                {/* Upload Tab Content */}
                {activeImageTab === 'upload' && (
                  <div className="text-center py-8">
                    <p className="text-white/50 text-sm">Upload functionality coming soon</p>
                  </div>
                )}

                {/* Generate Tab Content */}
                {activeImageTab === 'generate' && (
                  <div className="text-center py-8">
                    <p className="text-white/50 text-sm">AI generation coming soon</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      if (imageUrlInput && onImageUpdate) {
                        onImageUpdate(imageUrlInput);
                      }
                    }}
                    className="flex-1 bg-brand-purple text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all"
                  >
                    Save Image
                  </button>
                  <button
                    onClick={() => {
                      setImageUrlInput(selectedImageUrl || '');
                    }}
                    className="px-6 bg-[rgba(255,255,255,0.1)] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[rgba(255,255,255,0.15)] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selectedElementType === 'icon' ? (
              <div className="space-y-6 pt-4">
                <h3 className="text-white font-semibold text-lg mb-4">Edit Icon</h3>
                
                {/* Icon Preview */}
                <div className="w-full aspect-square max-h-64 bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center border border-[rgba(255,255,255,0.1)]">
                  <div 
                    className="text-white scale-[3]"
                    dangerouslySetInnerHTML={{ __html: selectedIcon || selectedIconHtml || '' }}
                  />
                </div>

                {/* Tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveIconTab('swap')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeIconTab === 'swap'
                        ? 'bg-[rgba(255,255,255,0.15)] text-white'
                        : 'bg-[rgba(255,255,255,0.05)] text-white/50 hover:bg-[rgba(255,255,255,0.1)] hover:text-white/70'
                    }`}
                  >
                    Swap
                  </button>
                  <button
                    onClick={() => setActiveIconTab('upload')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeIconTab === 'upload'
                        ? 'bg-[rgba(255,255,255,0.15)] text-white'
                        : 'bg-[rgba(255,255,255,0.05)] text-white/50 hover:bg-[rgba(255,255,255,0.1)] hover:text-white/70'
                    }`}
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setActiveIconTab('generate')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeIconTab === 'generate'
                        ? 'bg-[rgba(255,255,255,0.15)] text-white'
                        : 'bg-[rgba(255,255,255,0.05)] text-white/50 hover:bg-[rgba(255,255,255,0.1)] hover:text-white/70'
                    }`}
                  >
                    Generate
                  </button>
                </div>

                {/* Swap Tab Content - Icon Grid */}
                {activeIconTab === 'swap' && (
                  <div className="grid grid-cols-4 gap-4">
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <Check className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <X className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <Heart className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <Star className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <Mail className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <Phone className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <MapPin className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <User className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <Settings className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <Search className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <Home className="w-full h-full text-white" />
                    </button>
                    <button
                      onClick={() => {
                        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>`;
                        setSelectedIcon(iconHtml);
                      }}
                      className="aspect-square bg-[rgba(255,255,255,0.05)] rounded-lg flex items-center justify-center hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)] p-4"
                    >
                      <Calendar className="w-full h-full text-white" />
                    </button>
                  </div>
                )}

                {/* Upload Tab Content */}
                {activeIconTab === 'upload' && (
                  <div className="text-center py-8">
                    <p className="text-white/50 text-sm">Upload functionality coming soon</p>
                  </div>
                )}

                {/* Generate Tab Content */}
                {activeIconTab === 'generate' && (
                  <div className="text-center py-8">
                    <p className="text-white/50 text-sm">AI generation coming soon</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      if (selectedIcon && onIconUpdate) {
                        onIconUpdate(selectedIcon);
                      }
                    }}
                    className="flex-1 bg-brand-purple text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all"
                  >
                    Save Icon
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIcon(selectedIconHtml || '');
                    }}
                    className="px-6 bg-[rgba(255,255,255,0.1)] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[rgba(255,255,255,0.15)] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pt-4">
                <h3 className="text-white font-semibold text-lg mb-4">Edit Text</h3>
                
                {/* Text Align */}
                <div>
                  <label className="text-white text-sm mb-2 block">Text Align</label>
                  <div className="grid grid-cols-4 gap-2">
                    {/* Left Align */}
                    <button
                      onClick={() => onStyleUpdate?.('textAlign', 'left')}
                      className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center ${
                        selectedStyles?.textAlign === 'left'
                          ? 'bg-brand-purple text-white'
                          : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.15)]'
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="14" height="2" rx="1" fill="currentColor"/>
                        <rect x="3" y="9" width="10" height="2" rx="1" fill="currentColor"/>
                        <rect x="3" y="14" width="12" height="2" rx="1" fill="currentColor"/>
                      </svg>
                    </button>
                    
                    {/* Center Align */}
                    <button
                      onClick={() => onStyleUpdate?.('textAlign', 'center')}
                      className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center ${
                        selectedStyles?.textAlign === 'center'
                          ? 'bg-brand-purple text-white'
                          : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.15)]'
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="14" height="2" rx="1" fill="currentColor"/>
                        <rect x="5" y="9" width="10" height="2" rx="1" fill="currentColor"/>
                        <rect x="4" y="14" width="12" height="2" rx="1" fill="currentColor"/>
                      </svg>
                    </button>
                    
                    {/* Right Align */}
                    <button
                      onClick={() => onStyleUpdate?.('textAlign', 'right')}
                      className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center ${
                        selectedStyles?.textAlign === 'right'
                          ? 'bg-brand-purple text-white'
                          : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.15)]'
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="14" height="2" rx="1" fill="currentColor"/>
                        <rect x="7" y="9" width="10" height="2" rx="1" fill="currentColor"/>
                        <rect x="5" y="14" width="12" height="2" rx="1" fill="currentColor"/>
                      </svg>
                    </button>
                    
                    {/* Justify */}
                    <button
                      onClick={() => onStyleUpdate?.('textAlign', 'justify')}
                      className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-center ${
                        selectedStyles?.textAlign === 'justify'
                          ? 'bg-brand-purple text-white'
                          : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.15)]'
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="14" height="2" rx="1" fill="currentColor"/>
                        <rect x="3" y="9" width="14" height="2" rx="1" fill="currentColor"/>
                        <rect x="3" y="14" width="14" height="2" rx="1" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="text-white text-sm mb-2 block">Text Color</label>
                  <div className="relative">
                    <input
                      type="color"
                      value={rgbToHex(selectedStyles?.color || '#000000')}
                      onChange={(e) => onStyleUpdate?.('color', e.target.value)}
                      className="absolute opacity-0 w-0 h-0"
                      id="color-picker"
                    />
                    <label
                      htmlFor="color-picker"
                      className="w-full px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center gap-3 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                    >
                      <div
                        className="w-6 h-6 rounded border-2 border-white/20 flex-shrink-0"
                        style={{ backgroundColor: selectedStyles?.color || '#000000' }}
                      />
                      <span className="text-white text-sm font-mono uppercase">
                        {rgbToHex(selectedStyles?.color || '#000000')}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Font Weight */}
                <div>
                  <label className="text-white text-sm mb-2 block">Font Weight</label>
                  <div className="relative">
                    <select
                      value={selectedStyles?.fontWeight || 'normal'}
                      onChange={(e) => onStyleUpdate?.('fontWeight', e.target.value)}
                      className="w-full pl-3 pr-10 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] focus:border-brand-purple focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="normal" className="bg-brand-navy">Normal (400)</option>
                      <option value="500" className="bg-brand-navy">Medium (500)</option>
                      <option value="600" className="bg-brand-navy">Semibold (600)</option>
                      <option value="bold" className="bg-brand-navy">Bold (700)</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
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

                {/* Font */}
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Font <span className="text-white/50">(edit in Brand tab)</span>
                  </label>
                  <div className="w-full px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-white/50 border border-[rgba(255,255,255,0.1)]">
                    {selectedStyles?.fontFamily || 'Onest'}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeMode === 'controls' && (
          <>
            {!selectedSection ? (
              <div className="flex items-center justify-center flex-1 w-full">
                <p className="text-white opacity-70 text-center">
                  Control your lead magnet's results. Select a component from the Results page to begin.
                </p>
              </div>
            ) : selectedSection === 'resultsHeader' || selectedSection === 'personalityTraits' ? (
              <>
                {/* Header and Info Card - Fixed at Top */}
                <div className="shrink-0 mb-4 pt-4">
                  {/* Header */}
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-white mb-2">Controls</h2>
                    <p className="text-white opacity-70 text-sm">
                      Leads.new generates your leads' results with AI. Fine tune in the chat to control it.
                    </p>
                  </div>

                  {/* Info Card */}
                  <div className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg p-3">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {selectedSection === 'personalityTraits' 
                        ? 'Personality Traits Result'
                        : 'Starfish Personality Result'
                      }
                    </h3>
                    <p className="text-white opacity-70 text-sm leading-relaxed">
                      {selectedSection === 'personalityTraits' 
                        ? hasPromptBeenEntered.personalityTraits
                          ? "The starfish personality traits are generated based on the result of the quiz. There are four traits with an icon, title, description and button."
                          : "The starfish personality traits are generated based on the result of the quiz. There are four traits with an icon, title and description."
                        : hasPromptBeenEntered.resultsHeader
                          ? "The starfish personality is generated based on the user's quiz selections. The starfish personalities are based on Myers Briggs personality types."
                          : "The starfish personality is generated based on the user's quiz selections. There are unlimited starfish personality types."
                      }
                    </p>
                  </div>
                </div>

                {/* Scrollable Content Area with Messages */}
                <div ref={controlsMessagesContainerRef} className="flex-1 w-full overflow-y-auto flex flex-col edit-panel-scroll min-h-0" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                  {/* Thinking Indicator */}
                  {isControlsThinking && (
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
                  {selectedSection && [...(controlsMessages[selectedSection] || [])].reverse().map((message) => (
                    <div key={message.id} className="flex flex-col">
                      {message.role === 'user' ? (
                        <div className="flex flex-col gap-0.5 group w-full mb-1">
                          <div className="bg-[rgba(255,255,255,0.1)] group-hover:bg-[rgba(255,255,255,0.13)] border border-[rgba(241,243,255,0.3)] group-hover:border-brand-gray transition-all rounded-xl px-3 py-2 w-full">
                            <p className="text-white text-sm leading-relaxed">{message.content}</p>
                          </div>
                          <button
                            onClick={() => handleControlsUndo(message.id)}
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
                  {selectedSection && showControlsPrompts[selectedSection] && (!controlsMessages[selectedSection] || controlsMessages[selectedSection].length === 0) && (
                    <div key={selectedSection} className="flex flex-col gap-3 items-start w-full">
                      {selectedSection === 'personalityTraits' ? (
                        <>
                          <button
                            onClick={() => handleControlsPromptClick('Include a button for each personality trait')}
                            className={`bg-[rgba(255,255,255,0.07)] flex gap-3 items-center px-3 py-2 rounded-2xl w-full hover:bg-[rgba(255,255,255,0.12)] transition-all cursor-pointer text-left ${
                              shouldAnimatePrompts 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-4'
                            }`}
                            style={{ 
                              transitionDelay: shouldAnimatePrompts ? '0ms' : '0ms',
                              transitionDuration: '500ms',
                              transitionTimingFunction: 'ease-out'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                              <path d="M7.8612 2.53053C7.88905 2.38146 7.96815 2.24682 8.08481 2.14993C8.20148 2.05304 8.34835 2 8.5 2C8.65165 2 8.79853 2.05304 8.91519 2.14993C9.03185 2.24682 9.11095 2.38146 9.1388 2.53053C9.36114 3.70633 9.59843 5.59843 10.5 6.5C11.4016 7.40157 13.2937 7.63886 14.4695 7.8612C14.6185 7.88905 14.7532 7.96815 14.8501 8.08481C14.947 8.20148 15 8.34835 15 8.5C15 8.65165 14.947 8.79853 14.8501 8.91519C14.7532 9.03185 14.6185 9.11095 14.4695 9.1388C13.2937 9.36114 11.4016 9.59843 10.5 10.5C9.59843 11.4016 9.36114 13.2937 9.1388 14.4695C9.11095 14.6185 9.03185 14.7532 8.91519 14.8501C8.79853 14.947 8.65165 15 8.5 15C8.34835 15 8.20148 14.947 8.08481 14.8501C7.96815 14.7532 7.88905 14.6185 7.8612 14.4695C7.63886 13.2937 7.40157 11.4016 6.5 10.5C5.59843 9.59843 3.70633 9.36114 2.53053 9.1388C2.38146 9.11095 2.24682 9.03185 2.14993 8.91519C2.05304 8.79853 2 8.65165 2 8.5C2 8.34835 2.05304 8.20148 2.14993 8.08481C2.24682 7.96815 2.38146 7.88905 2.53053 7.8612C3.70633 7.63886 5.59843 7.40157 6.5 6.5C7.40157 5.59843 7.63886 3.70633 7.8612 2.53053Z" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15.667 14V17.3333" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17.3333 15.6665H14" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="font-medium leading-normal text-sm text-white text-left">
                              Include a button for each personality trait
                            </p>
                          </button>
                          <button
                            onClick={() => handleControlsPromptClick('Mention my business in each of these personality trait descriptions')}
                            className={`bg-[rgba(255,255,255,0.07)] flex gap-3 items-center px-3 py-2 rounded-2xl w-full hover:bg-[rgba(255,255,255,0.12)] transition-all cursor-pointer text-left ${
                              shouldAnimatePrompts 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-4'
                            }`}
                            style={{ 
                              transitionDelay: shouldAnimatePrompts ? '100ms' : '0ms',
                              transitionDuration: '500ms',
                              transitionTimingFunction: 'ease-out'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                              <path d="M7.8612 2.53053C7.88905 2.38146 7.96815 2.24682 8.08481 2.14993C8.20148 2.05304 8.34835 2 8.5 2C8.65165 2 8.79853 2.05304 8.91519 2.14993C9.03185 2.24682 9.11095 2.38146 9.1388 2.53053C9.36114 3.70633 9.59843 5.59843 10.5 6.5C11.4016 7.40157 13.2937 7.63886 14.4695 7.8612C14.6185 7.88905 14.7532 7.96815 14.8501 8.08481C14.947 8.20148 15 8.34835 15 8.5C15 8.65165 14.947 8.79853 14.8501 8.91519C14.7532 9.03185 14.6185 9.11095 14.4695 9.1388C13.2937 9.36114 11.4016 9.59843 10.5 10.5C9.59843 11.4016 9.36114 13.2937 9.1388 14.4695C9.11095 14.6185 9.03185 14.7532 8.91519 14.8501C8.79853 14.947 8.65165 15 8.5 15C8.34835 15 8.20148 14.947 8.08481 14.8501C7.96815 14.7532 7.88905 14.6185 7.8612 14.4695C7.63886 13.2937 7.40157 11.4016 6.5 10.5C5.59843 9.59843 3.70633 9.36114 2.53053 9.1388C2.38146 9.11095 2.24682 9.03185 2.14993 8.91519C2.05304 8.79853 2 8.65165 2 8.5C2 8.34835 2.05304 8.20148 2.14993 8.08481C2.24682 7.96815 2.38146 7.88905 2.53053 7.8612C3.70633 7.63886 5.59843 7.40157 6.5 6.5C7.40157 5.59843 7.63886 3.70633 7.8612 2.53053Z" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15.667 14V17.3333" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17.3333 15.6665H14" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="font-medium leading-normal text-sm text-white text-left">
                              Mention my business in each of these personality trait descriptions
                            </p>
                          </button>
                          <button
                            onClick={() => handleControlsPromptClick('Make each personality trait description more exciting')}
                            className={`bg-[rgba(255,255,255,0.07)] flex gap-3 items-center px-3 py-2 rounded-2xl w-full hover:bg-[rgba(255,255,255,0.12)] transition-all cursor-pointer text-left ${
                              shouldAnimatePrompts 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-4'
                            }`}
                            style={{ 
                              transitionDelay: shouldAnimatePrompts ? '200ms' : '0ms',
                              transitionDuration: '500ms',
                              transitionTimingFunction: 'ease-out'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                              <path d="M7.8612 2.53053C7.88905 2.38146 7.96815 2.24682 8.08481 2.14993C8.20148 2.05304 8.34835 2 8.5 2C8.65165 2 8.79853 2.05304 8.91519 2.14993C9.03185 2.24682 9.11095 2.38146 9.1388 2.53053C9.36114 3.70633 9.59843 5.59843 10.5 6.5C11.4016 7.40157 13.2937 7.63886 14.4695 7.8612C14.6185 7.88905 14.7532 7.96815 14.8501 8.08481C14.947 8.20148 15 8.34835 15 8.5C15 8.65165 14.947 8.79853 14.8501 8.91519C14.7532 9.03185 14.6185 9.11095 14.4695 9.1388C13.2937 9.36114 11.4016 9.59843 10.5 10.5C9.59843 11.4016 9.36114 13.2937 9.1388 14.4695C9.11095 14.6185 9.03185 14.7532 8.91519 14.8501C8.79853 14.947 8.65165 15 8.5 15C8.34835 15 8.20148 14.947 8.08481 14.8501C7.96815 14.7532 7.88905 14.6185 7.8612 14.4695C7.63886 13.2937 7.40157 11.4016 6.5 10.5C5.59843 9.59843 3.70633 9.36114 2.53053 9.1388C2.38146 9.11095 2.24682 9.03185 2.14993 8.91519C2.05304 8.79853 2 8.65165 2 8.5C2 8.34835 2.05304 8.20148 2.14993 8.08481C2.24682 7.96815 2.38146 7.88905 2.53053 7.8612C3.70633 7.63886 5.59843 7.40157 6.5 6.5C7.40157 5.59843 7.63886 3.70633 7.8612 2.53053Z" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15.667 14V17.3333" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17.3333 15.6665H14" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="font-medium leading-normal text-sm text-white text-left">
                              Make each personality trait description more exciting
                            </p>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleControlsPromptClick('Only allow for 20 personality types')}
                            className={`bg-[rgba(255,255,255,0.07)] flex gap-3 items-center px-3 py-2 rounded-2xl w-full hover:bg-[rgba(255,255,255,0.12)] transition-all cursor-pointer text-left ${
                              shouldAnimatePrompts 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-4'
                            }`}
                            style={{ 
                              transitionDelay: shouldAnimatePrompts ? '0ms' : '0ms',
                              transitionDuration: '500ms',
                              transitionTimingFunction: 'ease-out'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                              <path d="M7.8612 2.53053C7.88905 2.38146 7.96815 2.24682 8.08481 2.14993C8.20148 2.05304 8.34835 2 8.5 2C8.65165 2 8.79853 2.05304 8.91519 2.14993C9.03185 2.24682 9.11095 2.38146 9.1388 2.53053C9.36114 3.70633 9.59843 5.59843 10.5 6.5C11.4016 7.40157 13.2937 7.63886 14.4695 7.8612C14.6185 7.88905 14.7532 7.96815 14.8501 8.08481C14.947 8.20148 15 8.34835 15 8.5C15 8.65165 14.947 8.79853 14.8501 8.91519C14.7532 9.03185 14.6185 9.11095 14.4695 9.1388C13.2937 9.36114 11.4016 9.59843 10.5 10.5C9.59843 11.4016 9.36114 13.2937 9.1388 14.4695C9.11095 14.6185 9.03185 14.7532 8.91519 14.8501C8.79853 14.947 8.65165 15 8.5 15C8.34835 15 8.20148 14.947 8.08481 14.8501C7.96815 14.7532 7.88905 14.6185 7.8612 14.4695C7.63886 13.2937 7.40157 11.4016 6.5 10.5C5.59843 9.59843 3.70633 9.36114 2.53053 9.1388C2.38146 9.11095 2.24682 9.03185 2.14993 8.91519C2.05304 8.79853 2 8.65165 2 8.5C2 8.34835 2.05304 8.20148 2.14993 8.08481C2.24682 7.96815 2.38146 7.88905 2.53053 7.8612C3.70633 7.63886 5.59843 7.40157 6.5 6.5C7.40157 5.59843 7.63886 3.70633 7.8612 2.53053Z" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15.667 14V17.3333" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17.3333 15.6665H14" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="font-medium leading-normal text-sm text-white text-left">
                              Only allow for 20 personality types
                            </p>
                          </button>
                          <button
                            onClick={() => handleControlsPromptClick("Add personality type 'The Shy Guy!' to the possible results.")}
                            className={`bg-[rgba(255,255,255,0.07)] flex gap-3 items-center px-3 py-2 rounded-2xl w-full hover:bg-[rgba(255,255,255,0.12)] transition-all cursor-pointer text-left ${
                              shouldAnimatePrompts 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-4'
                            }`}
                            style={{ 
                              transitionDelay: shouldAnimatePrompts ? '100ms' : '0ms',
                              transitionDuration: '500ms',
                              transitionTimingFunction: 'ease-out'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                              <path d="M7.8612 2.53053C7.88905 2.38146 7.96815 2.24682 8.08481 2.14993C8.20148 2.05304 8.34835 2 8.5 2C8.65165 2 8.79853 2.05304 8.91519 2.14993C9.03185 2.24682 9.11095 2.38146 9.1388 2.53053C9.36114 3.70633 9.59843 5.59843 10.5 6.5C11.4016 7.40157 13.2937 7.63886 14.4695 7.8612C14.6185 7.88905 14.7532 7.96815 14.8501 8.08481C14.947 8.20148 15 8.34835 15 8.5C15 8.65165 14.947 8.79853 14.8501 8.91519C14.7532 9.03185 14.6185 9.11095 14.4695 9.1388C13.2937 9.36114 11.4016 9.59843 10.5 10.5C9.59843 11.4016 9.36114 13.2937 9.1388 14.4695C9.11095 14.6185 9.03185 14.7532 8.91519 14.8501C8.79853 14.947 8.65165 15 8.5 15C8.34835 15 8.20148 14.947 8.08481 14.8501C7.96815 14.7532 7.88905 14.6185 7.8612 14.4695C7.63886 13.2937 7.40157 11.4016 6.5 10.5C5.59843 9.59843 3.70633 9.36114 2.53053 9.1388C2.38146 9.11095 2.24682 9.03185 2.14993 8.91519C2.05304 8.79853 2 8.65165 2 8.5C2 8.34835 2.05304 8.20148 2.14993 8.08481C2.24682 7.96815 2.38146 7.88905 2.53053 7.8612C3.70633 7.63886 5.59843 7.40157 6.5 6.5C7.40157 5.59843 7.63886 3.70633 7.8612 2.53053Z" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15.667 14V17.3333" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17.3333 15.6665H14" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="font-medium leading-normal text-sm text-white text-left">
                              Add personality type 'The Shy Guy!' to the possible results.
                            </p>
                          </button>
                          <button
                            onClick={() => handleControlsPromptClick('Make all starfish personalities based on Family Guy characters.')}
                            className={`bg-[rgba(255,255,255,0.07)] flex gap-3 items-center px-3 py-2 rounded-2xl w-full hover:bg-[rgba(255,255,255,0.12)] transition-all cursor-pointer text-left ${
                              shouldAnimatePrompts 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-4'
                            }`}
                            style={{ 
                              transitionDelay: shouldAnimatePrompts ? '200ms' : '0ms',
                              transitionDuration: '500ms',
                              transitionTimingFunction: 'ease-out'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                              <path d="M7.8612 2.53053C7.88905 2.38146 7.96815 2.24682 8.08481 2.14993C8.20148 2.05304 8.34835 2 8.5 2C8.65165 2 8.79853 2.05304 8.91519 2.14993C9.03185 2.24682 9.11095 2.38146 9.1388 2.53053C9.36114 3.70633 9.59843 5.59843 10.5 6.5C11.4016 7.40157 13.2937 7.63886 14.4695 7.8612C14.6185 7.88905 14.7532 7.96815 14.8501 8.08481C14.947 8.20148 15 8.34835 15 8.5C15 8.65165 14.947 8.79853 14.8501 8.91519C14.7532 9.03185 14.6185 9.11095 14.4695 9.1388C13.2937 9.36114 11.4016 9.59843 10.5 10.5C9.59843 11.4016 9.36114 13.2937 9.1388 14.4695C9.11095 14.6185 9.03185 14.7532 8.91519 14.8501C8.79853 14.947 8.65165 15 8.5 15C8.34835 15 8.20148 14.947 8.08481 14.8501C7.96815 14.7532 7.88905 14.6185 7.8612 14.4695C7.63886 13.2937 7.40157 11.4016 6.5 10.5C5.59843 9.59843 3.70633 9.36114 2.53053 9.1388C2.38146 9.11095 2.24682 9.03185 2.14993 8.91519C2.05304 8.79853 2 8.65165 2 8.5C2 8.34835 2.05304 8.20148 2.14993 8.08481C2.24682 7.96815 2.38146 7.88905 2.53053 7.8612C3.70633 7.63886 5.59843 7.40157 6.5 6.5C7.40157 5.59843 7.63886 3.70633 7.8612 2.53053Z" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M15.667 14V17.3333" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17.3333 15.6665H14" stroke="#D9D9D9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="font-medium leading-normal text-sm text-white text-left">
                              Make all starfish personalities based on Family Guy characters.
                            </p>
                          </button>
                        </>
                      )}
                    </div>
                  )}

                </div>

                {/* Prompt Suggestions - Removed, now in scrollable area */}

                {/* Chat Input */}
                <div className={`focus-within:bg-[rgba(255,255,255,0.13)] border-[0.5px] border-solid box-border flex flex-col gap-1 items-start p-2.5 rounded-lg w-full shrink-0 focus-within:border-brand-gray transition-all ${
                  !hasControlsInteracted ? 'animate-border-sweep' : 'bg-[rgba(255,255,255,0.1)] border-[rgba(241,243,255,0.3)]'
                }`}>
                  <textarea
                    ref={controlsTextareaRef}
                    value={controlsInputValue}
                    onChange={(e) => setControlsInputValue(e.target.value)}
                    onKeyDown={handleControlsKeyDown}
                    onFocus={() => setHasControlsInteracted(true)}
                    onClick={() => setHasControlsInteracted(true)}
                    placeholder="Tell me how you want to change the result"
                    className="w-full bg-transparent border-none outline-none resize-none text-sm text-white placeholder-white placeholder-opacity-70 font-normal leading-relaxed overflow-hidden"
                    style={{ minHeight: '48px', maxHeight: '200px' }}
                  />
                  <div className="flex items-center justify-between w-full">
                    <button 
                      onClick={() => setHasControlsInteracted(true)}
                      className="bg-[rgba(241,243,255,0.3)] box-border flex gap-1 items-center justify-center px-2 py-1 rounded-lg shrink-0 hover:bg-[rgba(241,243,255,0.4)] transition-colors cursor-pointer"
                    >
                      <p className="font-medium leading-normal text-xs text-brand-white">Edit</p>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => {
                        setHasControlsInteracted(true);
                        handleControlsSendMessage();
                      }}
                      className="bg-[rgba(241,243,255,0.3)] box-border flex items-center justify-center p-1.5 rounded-full shrink-0 hover:bg-[rgba(241,243,255,0.4)] transition-colors cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center flex-1 w-full">
                <p className="text-white opacity-70 text-center">
                  Controls for this section coming soon.
                </p>
              </div>
            )}
          </>
        )}

        {activeMode === 'brand' && (
          <div className="flex flex-col flex-1 w-full overflow-y-auto edit-panel-scroll">
            <div className="space-y-6 pt-4">
              <h3 className="text-white font-semibold text-lg">Edit Brand</h3>
              
              {/* Description */}
              

              {/* Theme Dropdown */}
              <div>
                <label className="text-white text-sm mb-2 block">Color Palette</label>
                <div className="relative" ref={themeDropdownRef}>
                  {/* Dropdown Trigger */}
                  <button
                    onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.15)] focus:border-brand-purple focus:outline-none cursor-pointer transition-colors text-left flex items-center"
                  >
                    {selectedTheme ? (
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          {themePalettes.find(t => t.id === selectedTheme)?.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded border border-[rgba(0,0,0,0.1)]"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm">
                          {themePalettes.find(t => t.id === selectedTheme)?.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-white/70 text-sm">Choose palette</span>
                    )}
                  </button>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 12 12" 
                      fill="none"
                      className={`transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  {isThemeDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
                      {themePalettes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => {
                            setSelectedTheme(theme.id);
                            setIsThemeDropdownOpen(false);
                            // Update all color pickers to match the theme
                            setButtonPrimaryColor(theme.colors[0]);
                            setButtonSecondaryColor(theme.colors[1]);
                            setPageSecondaryBgColor(theme.colors[1]);
                            setFormBorderColor(theme.colors[3]);
                            setCardBorderColor(theme.colors[3]);
                          }}
                          className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0 ${
                            selectedTheme === theme.id ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div className="flex gap-1">
                            {theme.colors.map((color, idx) => (
                              <div
                                key={idx}
                                className="w-6 h-6 rounded border border-gray-200"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span className="text-gray-900 text-sm font-medium">
                            {theme.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Background Colors Section */}
              <div className="pt-6 border-t border-[rgba(255,255,255,0.1)]">
                <h4 className="text-white font-semibold text-base mb-4">Page Background</h4>
                
                <div className="flex gap-3">
                  {/* Page Background */}
                  <div className="flex-1">
                    <label className="text-white text-sm mb-2 block">Primary</label>
                    <div className="relative">
                      <input
                        type="color"
                        value={pageBgColor}
                        onChange={(e) => setPageBgColor(e.target.value)}
                        className="absolute opacity-0 w-0 h-0"
                        id="page-bg-color-picker"
                      />
                      <label
                        htmlFor="page-bg-color-picker"
                        className="w-full px-2 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded border-2 border-white/20 flex-shrink-0"
                          style={{ backgroundColor: pageBgColor }}
                        />
                        <span className="text-white text-sm font-mono uppercase leading-tight">
                          {pageBgColor}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Page Secondary Background */}
                  <div className="flex-1">
                    <label className="text-white text-sm mb-2 block">Secondary</label>
                    <div className="relative">
                      <input
                        type="color"
                        value={pageSecondaryBgColor}
                        onChange={(e) => setPageSecondaryBgColor(e.target.value)}
                        className="absolute opacity-0 w-0 h-0"
                        id="page-secondary-bg-color-picker"
                      />
                      <label
                        htmlFor="page-secondary-bg-color-picker"
                        className="w-full px-2 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded border-2 border-white/20 flex-shrink-0"
                          style={{ backgroundColor: pageSecondaryBgColor }}
                        />
                        <span className="text-white text-sm font-mono uppercase leading-tight">
                          {pageSecondaryBgColor}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="pt-6 border-t border-[rgba(255,255,255,0.1)]">
                <h4 className="text-white font-semibold text-base mb-4">Buttons</h4>
                
                <div className="flex gap-3 mb-4">
                  {/* Primary Button Color */}
                  <div className="flex-1">
                    <label className="text-white text-sm mb-2 block">Primary</label>
                    <div className="relative">
                      <input
                        type="color"
                        value={buttonPrimaryColor}
                        onChange={(e) => setButtonPrimaryColor(e.target.value)}
                        className="absolute opacity-0 w-0 h-0"
                        id="button-primary-color-picker"
                      />
                      <label
                        htmlFor="button-primary-color-picker"
                        className="w-full px-2 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded border-2 border-white/20 flex-shrink-0"
                          style={{ backgroundColor: buttonPrimaryColor }}
                        />
                        <span className="text-white text-sm font-mono uppercase leading-tight">
                          {buttonPrimaryColor}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Secondary Button Color */}
                  <div className="flex-1">
                    <label className="text-white text-sm mb-2 block">Secondary</label>
                    <div className="relative">
                      <input
                        type="color"
                        value={buttonSecondaryColor}
                        onChange={(e) => setButtonSecondaryColor(e.target.value)}
                        className="absolute opacity-0 w-0 h-0"
                        id="button-secondary-color-picker"
                      />
                      <label
                        htmlFor="button-secondary-color-picker"
                        className="w-full px-2 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded border-2 border-white/20 flex-shrink-0"
                          style={{ backgroundColor: buttonSecondaryColor }}
                        />
                        <span className="text-white text-sm font-mono uppercase leading-tight">
                          {buttonSecondaryColor}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Corner Radius */}
                <div>
                  <label className="text-white text-sm mb-2 block">Corner Radius</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={buttonCornerRadius}
                      onChange={(e) => setButtonCornerRadius(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] focus:border-brand-purple focus:outline-none"
                      min="0"
                      max="50"
                    />
                    <span className="text-white text-sm">px</span>
                  </div>
                </div>
              </div>

              {/* Fonts Section */}
              <div className="pt-6 border-t border-[rgba(255,255,255,0.1)]">
                <h4 className="text-white font-semibold text-base mb-4">Fonts</h4>
                
                {/* Headings Font */}
                <div className="mb-4">
                  <label className="text-white text-sm mb-2 block">Headings</label>
                  <div className="relative">
                    <select
                      className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] focus:border-brand-purple focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="inter" className="bg-brand-navy">Inter</option>
                      <option value="poppins" className="bg-brand-navy">Poppins</option>
                      <option value="roboto" className="bg-brand-navy">Roboto</option>
                      <option value="montserrat" className="bg-brand-navy">Montserrat</option>
                      <option value="open-sans" className="bg-brand-navy">Open Sans</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Body Font */}
                <div>
                  <label className="text-white text-sm mb-2 block">Body</label>
                  <div className="relative">
                    <select
                      className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] focus:border-brand-purple focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="inter" className="bg-brand-navy">Inter</option>
                      <option value="poppins" className="bg-brand-navy">Poppins</option>
                      <option value="roboto" className="bg-brand-navy">Roboto</option>
                      <option value="montserrat" className="bg-brand-navy">Montserrat</option>
                      <option value="open-sans" className="bg-brand-navy">Open Sans</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Forms Section */}
              <div className="pt-6 border-t border-[rgba(255,255,255,0.1)]">
                <h4 className="text-white font-semibold text-base mb-4">Forms</h4>
                
                <div className="flex gap-3 mb-4">
                  {/* Border Color */}
                  <div className="flex-1">
                    <label className="text-white text-sm mb-2 block">Border</label>
                    <div className="relative">
                      <input
                        type="color"
                        value={formBorderColor}
                        onChange={(e) => setFormBorderColor(e.target.value)}
                        className="absolute opacity-0 w-0 h-0"
                        id="form-border-color-picker"
                      />
                      <label
                        htmlFor="form-border-color-picker"
                        className="w-full px-2 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded border-2 border-white/20 flex-shrink-0"
                          style={{ backgroundColor: formBorderColor }}
                        />
                        <span className="text-white text-sm font-mono uppercase leading-tight">
                          {formBorderColor}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Background Color */}
                  <div className="flex-1">
                    <label className="text-white text-sm mb-2 block">Background</label>
                    <div className="relative">
                      <input
                        type="color"
                        value={formBackgroundColor}
                        onChange={(e) => setFormBackgroundColor(e.target.value)}
                        className="absolute opacity-0 w-0 h-0"
                        id="form-background-color-picker"
                      />
                      <label
                        htmlFor="form-background-color-picker"
                        className="w-full px-2 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded border-2 border-white/20 flex-shrink-0"
                          style={{ backgroundColor: formBackgroundColor }}
                        />
                        <span className="text-white text-sm font-mono uppercase leading-tight">
                          {formBackgroundColor}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Border Radius */}
                <div>
                  <label className="text-white text-sm mb-2 block">Border Radius</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={formBorderRadius}
                      onChange={(e) => setFormBorderRadius(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] focus:border-brand-purple focus:outline-none"
                      min="0"
                      max="50"
                    />
                    <span className="text-white text-sm">px</span>
                  </div>
                </div>
              </div>

              {/* Card Section */}
              <div className="pt-6 border-t border-[rgba(255,255,255,0.1)]">
                <h4 className="text-white font-semibold text-base mb-4">Card</h4>
                
                <div className="flex gap-3 mb-4">
                  {/* Border Color */}
                  <div className="flex-1">
                    <label className="text-white text-sm mb-2 block">Border</label>
                    <div className="relative">
                      <input
                        type="color"
                        value={cardBorderColor}
                        onChange={(e) => setCardBorderColor(e.target.value)}
                        className="absolute opacity-0 w-0 h-0"
                        id="card-border-color-picker"
                      />
                      <label
                        htmlFor="card-border-color-picker"
                        className="w-full px-2 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded border-2 border-white/20 flex-shrink-0"
                          style={{ backgroundColor: cardBorderColor }}
                        />
                        <span className="text-white text-sm font-mono uppercase leading-tight">
                          {cardBorderColor}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Background Color */}
                  <div className="flex-1">
                    <label className="text-white text-sm mb-2 block">Background</label>
                    <div className="relative">
                      <input
                        type="color"
                        value={cardBackgroundColor}
                        onChange={(e) => setCardBackgroundColor(e.target.value)}
                        className="absolute opacity-0 w-0 h-0"
                        id="card-background-color-picker"
                      />
                      <label
                        htmlFor="card-background-color-picker"
                        className="w-full px-2 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded border-2 border-white/20 flex-shrink-0"
                          style={{ backgroundColor: cardBackgroundColor }}
                        />
                        <span className="text-white text-sm font-mono uppercase leading-tight">
                          {cardBackgroundColor}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Border Radius */}
                <div>
                  <label className="text-white text-sm mb-2 block">Border Radius</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={cardBorderRadius}
                      onChange={(e) => setCardBorderRadius(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.2)] focus:border-brand-purple focus:outline-none"
                      min="0"
                      max="50"
                    />
                    <span className="text-white text-sm">px</span>
                  </div>
                </div>
              </div>
            </div>
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

        {/* Chat Input Box - Hidden in Design, Brand, and Controls Mode */}
        {activeMode !== 'design' && activeMode !== 'brand' && activeMode !== 'controls' && (
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

