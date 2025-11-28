import { useState } from 'react';
import EditPanel from './EditPanel';
import SiteNavigation from './SiteNavigation';

// Image assets - Local imports
import imgLucideChevronDown from '../assets/chevron-down.svg';

type DeviceType = 'mobile' | 'desktop' | 'tablet';

type EditLeadMagnetPanelProps = {
  onPreviewClick: () => void;
};

export default function EditLeadMagnetPanel({ onPreviewClick }: EditLeadMagnetPanelProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState<'dataCapture' | 'gate' | 'results'>('dataCapture');
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [selectedStyles, setSelectedStyles] = useState({
    textAlign: 'left',
    color: '#000000',
    fontWeight: 'normal',
    fontSize: '16px'
  });

  // Handle element selection
  const handleElementClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const element = event.currentTarget;
    
    // Remove border from previously selected element
    if (selectedElement) {
      selectedElement.style.outline = '';
      selectedElement.contentEditable = 'false';
    }
    
    // Add border to newly selected element
    element.style.outline = '2px solid #836FFF';
    
    // Make element editable
    element.contentEditable = 'true';
    element.focus();
    
    // Get computed styles
    const computedStyles = window.getComputedStyle(element);
    setSelectedStyles({
      textAlign: computedStyles.textAlign || 'left',
      color: computedStyles.color || '#000000',
      fontWeight: computedStyles.fontWeight || 'normal',
      fontSize: computedStyles.fontSize || '16px'
    });
    
    setSelectedElement(element);
  };

  // Handle deselection by clicking outside
  const handleBackgroundClick = () => {
    if (selectedElement) {
      selectedElement.style.outline = '';
      selectedElement.contentEditable = 'false';
      setSelectedElement(null);
    }
  };

  // Handle style updates
  const handleStyleUpdate = (property: string, value: string) => {
    if (selectedElement) {
      (selectedElement.style as any)[property] = value;
      setSelectedStyles(prev => ({
        ...prev,
        [property]: value
      }));
    }
  };

  const deviceLabels = {
    mobile: 'Mobile',
    desktop: 'Desktop',
    tablet: 'Tablet'
  };

  const DeviceIcon = ({ device, className = "w-5 h-5" }: { device: DeviceType; className?: string }) => {
    if (device === 'mobile') {
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (device === 'desktop') {
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    // tablet
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div className="bg-[#fefefe] flex flex-col gap-px items-start relative w-full h-screen overflow-hidden" data-name="Edit Lead Magnet Panel">
      {/* Top Navigation */}
      <SiteNavigation onPreviewClick={onPreviewClick} />

      {/* Edit and Result Panel */}
      <div className="flex items-center justify-between relative flex-1 w-full min-h-0 overflow-hidden" data-name="Edit and Result Panel">
        {/* Edit Panel */}
        <EditPanel 
          selectedElement={selectedElement}
          selectedStyles={selectedStyles}
          onStyleUpdate={handleStyleUpdate}
        />
        {/* Result Panel */}
        <div className="bg-white flex flex-1 flex-col h-full items-center justify-between min-h-0 min-w-px relative" data-name="Result Panel">
          {/* Page Navigation */}
          <div className="bg-brand-gray box-border flex items-center justify-between px-[18px] py-3 relative shrink-0 w-full" data-name="Page Navigation">
            <div className="flex items-center gap-2" data-name="Page Flow Selector">
              {/* PAGES Label */}
              <span className="font-medium text-[12px] text-[#211951] mr-1" style={{ letterSpacing: '0.1em' }}>PAGES</span>

              {/* Data Capture Page Tab */}
              <button
                onClick={() => setActivePage('dataCapture')}
                className={`${
                  activePage === 'dataCapture' ? 'bg-[#16F5BA] text-brand-navy' : 'bg-white text-brand-navy'
                } rounded-lg px-4 h-[34px] cursor-pointer transition-all hover:shadow-md font-medium text-sm`}
              >
                Data Capture
              </button>

              {/* Arrow */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33301 8H12.6663" stroke="#211951" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 3.3335L12.6667 8.00016L8 12.6668" stroke="#211951" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Quiz Page Tab */}
              <button
                onClick={() => setActivePage('gate')}
                className={`${
                  activePage === 'gate' ? 'bg-[#16F5BA] text-brand-navy' : 'bg-white text-brand-navy'
                } rounded-lg px-4 h-[34px] cursor-pointer transition-all hover:shadow-md font-medium text-sm`}
              >
                Quiz
              </button>

              {/* Arrow */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33301 8H12.6663" stroke="#211951" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 3.3335L12.6667 8.00016L8 12.6668" stroke="#211951" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Results Page Tab */}
              <button
                onClick={() => setActivePage('results')}
                className={`${
                  activePage === 'results' ? 'bg-[#16F5BA] text-brand-navy' : 'bg-white text-brand-navy'
                } rounded-lg px-4 h-[34px] cursor-pointer transition-all hover:shadow-md font-medium text-sm`}
              >
                Results
              </button>
            </div>
            
            {/* Device Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-brand-gray border border-[rgba(131,111,255,0.2)] border-solid box-border flex gap-2 h-[34px] items-center pl-3 pr-2 py-[5px] rounded-lg hover:bg-opacity-90 transition-all cursor-pointer"
              >
                <DeviceIcon device={selectedDevice} className="w-5 h-5 text-brand-navy" />
                <p className="font-medium leading-normal text-sm text-brand-navy">
                  {deviceLabels[selectedDevice]}
                </p>
                <div className="relative size-5">
                  <img alt="Dropdown" className="block max-w-none size-full" src={imgLucideChevronDown} />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px] overflow-hidden">
                  {(['mobile', 'desktop', 'tablet'] as DeviceType[]).map((device) => (
                    <button
                      key={device}
                      onClick={() => {
                        setSelectedDevice(device);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-purple-50 transition-colors ${
                        selectedDevice === device ? 'bg-purple-50' : ''
                      }`}
                    >
                      <DeviceIcon 
                        device={device} 
                        className={`w-5 h-5 ${selectedDevice === device ? 'text-brand-purple' : 'text-brand-navy'}`}
                      />
                      <span className={`font-medium text-sm ${
                        selectedDevice === device ? 'text-brand-purple' : 'text-brand-navy'
                      }`}>
                        {deviceLabels[device]}
                      </span>
                      {selectedDevice === device && (
                        <svg className="w-4 h-4 ml-auto text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lead Magnet Preview */}
          <div 
            onClick={handleBackgroundClick}
            className="flex-1 overflow-y-auto w-full px-10 py-6 bg-brand-gray" 
            data-name="Lead Magnet Preview"
          >
            <div 
              onClick={handleBackgroundClick}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {activePage === 'dataCapture' && renderDataCapturePage()}
              {activePage === 'gate' && renderGatePage()}
              {activePage === 'results' && renderResultsPage()}
            </div>
          </div>
          
          {/* Spacer */}
          <div className="h-[5px] shrink-0 w-[50px]" />
        </div>
      </div>
    </div>
  );

  function renderDataCapturePage() {
    return (
      <>
              {/* Hero Section Preview */}
              <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-white px-6 py-8">
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <p 
                      onClick={handleElementClick}
                      className="text-[8px] font-semibold text-gray-600 mb-2 uppercase tracking-wide hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      ZORVO
                    </p>
                    <h1 
                      onClick={handleElementClick}
                      className="text-xl font-bold mb-3 leading-tight hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Unlock Your Starfish Potential with the Starfish Quiz!
                    </h1>
                    <p 
                      onClick={handleElementClick}
                      className="text-gray-700 mb-4 text-xs leading-relaxed hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Discover your starfish's hidden talents and needs with our fun and informative quiz. Get personalized insights to ensure a happy and healthy starfish.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span 
                          onClick={handleElementClick}
                          className="text-xs text-gray-700 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                        >
                          Understand your starfish's unique personality
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span 
                          onClick={handleElementClick}
                          className="text-xs text-gray-700 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                        >
                          Get tailored care tips for optimal health
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span 
                          onClick={handleElementClick}
                          className="text-xs text-gray-700 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                        >
                          Learn how to create the perfect starfish habitat
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop" 
                      alt="A vibrant starfish on a sandy seabed"
                      className="w-32 h-32 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Email Capture Form Preview */}
              <div className="px-6 py-6 bg-white">
                <div className="max-w-xs mx-auto">
                  <h2 
                    onClick={handleElementClick}
                    className="text-base font-bold text-center mb-3 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                  >
                    Take the Starfish Quiz Now!
                  </h2>
                  
                  <div className="mb-3">
                    <label 
                      onClick={handleElementClick}
                      className="block text-[10px] text-gray-600 mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-[10px] text-gray-400">
                        your.email@example.com
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5 mb-3">
                    <div className="w-3 h-3 border border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                    <label 
                      onClick={handleElementClick}
                      className="text-[9px] text-gray-600 leading-tight hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      I agree to the Privacy Policy and Terms of Service
                    </label>
                  </div>

                  <div 
                    onClick={handleElementClick}
                    className="w-full bg-brand-purple text-white py-2 rounded-lg font-semibold text-xs text-center hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                  >
                    Discover My Starfish's Potential
                  </div>

                  <p 
                    onClick={handleElementClick}
                    className="text-[9px] text-gray-500 text-center mt-2 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                  >
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>

              {/* Testimonials Preview */}
              <div className="px-6 py-6 bg-gray-50">
                <h2 
                  onClick={handleElementClick}
                  className="text-base font-bold text-center mb-4 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  What Starfish Owners Are Saying
                </h2>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p 
                      onClick={handleElementClick}
                      className="text-[10px] text-gray-700 mb-2 italic hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      "I never knew my starfish had such a unique personality!"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center text-white font-semibold text-[9px]">
                        AS
                      </div>
                      <div>
                        <p 
                          onClick={handleElementClick}
                          className="font-semibold text-[10px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                        >
                          Alice Smith
                        </p>
                        <p 
                          onClick={handleElementClick}
                          className="text-[8px] text-gray-500 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                        >
                          Starfish Enthusiast
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p 
                      onClick={handleElementClick}
                      className="text-[10px] text-gray-700 mb-2 italic hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      "The tailored care tips were a game-changer!"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-[9px]">
                        RD
                      </div>
                      <div>
                        <p 
                          onClick={handleElementClick}
                          className="font-semibold text-[10px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                        >
                          Robert Davis
                        </p>
                        <p 
                          onClick={handleElementClick}
                          className="text-[8px] text-gray-500 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                        >
                          Aquarium Hobbyist
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p 
                      onClick={handleElementClick}
                      className="text-[10px] text-gray-700 mb-2 italic hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      "I was struggling to create the right habitat for my starfish, but this quiz provided all the answers I needed!"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold text-[9px]">
                        JM
                      </div>
                      <div>
                        <p 
                          onClick={handleElementClick}
                          className="font-semibold text-[10px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                        >
                          Jane Miller
                        </p>
                        <p 
                          onClick={handleElementClick}
                          className="text-[8px] text-gray-500 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                        >
                          Marine Biologist Student
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="px-6 py-6 bg-white">
                <h2 
                  onClick={handleElementClick}
                  className="text-base font-bold text-center mb-4 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Why Take the Starfish Quiz?
                </h2>
                
                <div className="grid grid-cols-3 gap-4">
                  {/* Benefit 1 */}
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 
                      onClick={handleElementClick}
                      className="font-bold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Quick & Easy
                    </h3>
                    <p 
                      onClick={handleElementClick}
                      className="text-[9px] text-gray-600 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Get instant insights into your starfish's needs with our user-friendly quiz.
                    </p>
                  </div>

                  {/* Benefit 2 */}
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 
                      onClick={handleElementClick}
                      className="font-bold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Free & Valuable
                    </h3>
                    <p 
                      onClick={handleElementClick}
                      className="text-[9px] text-gray-600 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Access expert advice and personalized recommendations without spending a dime.
                    </p>
                  </div>

                  {/* Benefit 3 */}
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 
                      onClick={handleElementClick}
                      className="font-bold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Expert-Backed
                    </h3>
                    <p 
                      onClick={handleElementClick}
                      className="text-[9px] text-gray-600 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Benefit from knowledge curated by marine biologists and starfish care specialists.
                    </p>
                  </div>
                </div>
              </div>
      </>
    );
  }

  function renderGatePage() {
    return (
      <>
        {/* Quiz Header */}
        <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-white px-6 py-6 text-center">
          <p 
            onClick={handleElementClick}
            className="text-[8px] font-semibold text-gray-600 mb-2 uppercase tracking-wide hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
          >
            ZORVO
          </p>
          <h1 
            onClick={handleElementClick}
            className="text-xl font-bold mb-2 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
          >
            Starfish Personality Quiz
          </h1>
          <p 
            onClick={handleElementClick}
            className="text-gray-600 text-xs hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
          >
            Answer these questions to discover your starfish's unique traits
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <span 
              onClick={handleElementClick}
              className="text-[10px] font-medium text-gray-600 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
            >
              Question 3 of 8
            </span>
            <span 
              onClick={handleElementClick}
              className="text-[10px] font-medium text-brand-purple hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
            >
              37% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-brand-purple h-1.5 rounded-full transition-all" style={{ width: '37%' }}></div>
          </div>
        </div>

        {/* Quiz Question */}
        <div className="px-6 py-8 bg-white">
          <div className="max-w-xl mx-auto">
            <h2 
              onClick={handleElementClick}
              className="text-base font-bold mb-4 text-center hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
            >
              How active is your starfish during feeding time?
            </h2>
            
            <div className="space-y-2">
              {/* Answer Option 1 */}
              <button className="w-full text-left p-3 border-2 border-gray-200 rounded-lg hover:border-brand-purple hover:bg-purple-50 transition-all">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h3 
                      onClick={handleElementClick}
                      className="font-semibold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Very active and eager
                    </h3>
                    <p 
                      onClick={handleElementClick}
                      className="text-gray-600 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Immediately moves toward food and shows excitement
                    </p>
                  </div>
                </div>
              </button>

              {/* Answer Option 2 */}
              <button className="w-full text-left p-3 border-2 border-gray-200 rounded-lg hover:border-brand-purple hover:bg-purple-50 transition-all">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h3 
                      onClick={handleElementClick}
                      className="font-semibold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Moderately active
                    </h3>
                    <p 
                      onClick={handleElementClick}
                      className="text-gray-600 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Takes a moment but then approaches food steadily
                    </p>
                  </div>
                </div>
              </button>

              {/* Answer Option 3 */}
              <button className="w-full text-left p-3 border-2 border-gray-200 rounded-lg hover:border-brand-purple hover:bg-purple-50 transition-all">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h3 
                      onClick={handleElementClick}
                      className="font-semibold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Calm and patient
                    </h3>
                    <p 
                      onClick={handleElementClick}
                      className="text-gray-600 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Waits and approaches food slowly and deliberately
                    </p>
                  </div>
                </div>
              </button>

              {/* Answer Option 4 */}
              <button className="w-full text-left p-3 border-2 border-gray-200 rounded-lg hover:border-brand-purple hover:bg-purple-50 transition-all">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h3 
                      onClick={handleElementClick}
                      className="font-semibold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Not very interested
                    </h3>
                    <p 
                      onClick={handleElementClick}
                      className="text-gray-600 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                    >
                      Shows minimal response to feeding time
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button 
                onClick={handleElementClick}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition-all"
              >
                Previous
              </button>
              <button 
                onClick={handleElementClick}
                className="px-5 py-2 bg-brand-purple text-white rounded-lg text-xs font-medium hover:bg-opacity-90 transition-all"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderResultsPage() {
    return (
      <>
        {/* Results Header */}
        <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-white px-6 py-8 text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 
            onClick={handleElementClick}
            className="text-xl font-bold mb-2 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
          >
            Your Starfish Profile: The Explorer!
          </h1>
          <p 
            onClick={handleElementClick}
            className="text-gray-700 text-xs max-w-md mx-auto hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
          >
            Congratulations! Your starfish has a curious and adventurous personality. Here's what we learned about your marine friend.
          </p>
        </div>

        {/* Personality Traits */}
        <div className="px-6 py-6 bg-white">
          <h2 
            onClick={handleElementClick}
            className="text-base font-bold text-center mb-5 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
          >
            Personality Traits
          </h2>
          
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-brand-purple rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 
                  onClick={handleElementClick}
                  className="font-bold text-xs hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Active
                </h3>
              </div>
              <p 
                onClick={handleElementClick}
                className="text-gray-700 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
              >
                Your starfish enjoys exploring its environment and is quite energetic.
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-brand-purple rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 
                  onClick={handleElementClick}
                  className="font-bold text-xs hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Social
                </h3>
              </div>
              <p 
                onClick={handleElementClick}
                className="text-gray-700 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
              >
                Shows interest in tankmates and interactive feeding sessions.
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-brand-purple rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 
                  onClick={handleElementClick}
                  className="font-bold text-xs hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Curious
                </h3>
              </div>
              <p 
                onClick={handleElementClick}
                className="text-gray-700 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
              >
                Loves to investigate new objects and changes in the habitat.
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-brand-purple rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 
                  onClick={handleElementClick}
                  className="font-bold text-xs hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Healthy
                </h3>
              </div>
              <p 
                onClick={handleElementClick}
                className="text-gray-700 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
              >
                Displays good appetite and normal regeneration patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Care Recommendations */}
        <div className="px-6 py-6 bg-gray-50">
          <h2 
            onClick={handleElementClick}
            className="text-base font-bold text-center mb-5 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
          >
            Personalized Care Tips
          </h2>
          
          <div className="max-w-lg mx-auto space-y-3">
            <div className="bg-white p-3 rounded-lg flex gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div>
                <h3 
                  onClick={handleElementClick}
                  className="font-bold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Enrichment Activities
                </h3>
                <p 
                  onClick={handleElementClick}
                  className="text-gray-700 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Provide varied textures and objects for exploration. Rotate decorations monthly to keep things interesting.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg flex gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 
                  onClick={handleElementClick}
                  className="font-bold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Feeding Schedule
                </h3>
                <p 
                  onClick={handleElementClick}
                  className="text-gray-700 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Feed 2-3 times per week with varied diet. Your active starfish may benefit from slightly more frequent feeding.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg flex gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 
                  onClick={handleElementClick}
                  className="font-bold text-xs mb-1 hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Tank Maintenance
                </h3>
                <p 
                  onClick={handleElementClick}
                  className="text-gray-700 text-[9px] hover:outline hover:outline-2 hover:outline-[#836FFF] transition-all"
                >
                  Maintain stable water parameters. Explorer personalities thrive with consistent conditions and gentle water flow.
                </p>
              </div>
        </div>
      </div>
    </div>

        {/* Download CTA */}
        <div className="px-6 py-6 bg-white text-center">
          <h2 
            onClick={handleElementClick}
            className="text-base font-bold mb-2"
          >
            Want Your Full Report?
          </h2>
          <p 
            onClick={handleElementClick}
            className="text-gray-600 mb-4 text-[10px] max-w-md mx-auto"
          >
            Download a comprehensive PDF guide with detailed care instructions, feeding schedules, and expert tips tailored specifically for your starfish's personality type.
          </p>
          <button 
            onClick={handleElementClick}
            className="bg-brand-purple text-white px-5 py-2 rounded-lg font-semibold text-xs hover:bg-opacity-90 transition-all"
          >
            Download Full Report (PDF)
          </button>
        </div>
      </>
  );
  }
}

