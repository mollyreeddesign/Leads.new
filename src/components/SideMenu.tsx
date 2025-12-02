import { FileCog, ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';

// Robot icon parts (Chat mode)
import img from '../assets/icons/robot-1.svg';
import img1 from '../assets/icons/robot-2.svg';
import img2 from '../assets/icons/robot-3.svg';
import img3 from '../assets/icons/robot-4.svg';
import img4 from '../assets/icons/robot-5.svg';

// Design icon parts (Design mode - sidebar)
import img5 from '../assets/icons/design-1.svg';
import img6 from '../assets/icons/design-2.svg';
import img7 from '../assets/icons/design-3.svg';
import img8 from '../assets/icons/design-4.svg';
import img9 from '../assets/icons/design-5.svg';

// Brand icon parts (Brand mode)
import img15 from '../assets/icons/brand-1.svg';
import img16 from '../assets/icons/brand-2.svg';
import img17 from '../assets/icons/brand-3.svg';

// Code icon parts (Code mode)
import img18 from '../assets/icons/code-1.svg';
import img19 from '../assets/icons/code-2.svg';

type ModeType = 'chat' | 'design' | 'controls' | 'brand' | 'code' | 'settings';

type SideMenuProps = {
  activeMode: ModeType;
  onModeChange: (mode: ModeType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export default function SideMenu({ activeMode, onModeChange, isCollapsed, onToggleCollapse }: SideMenuProps) {
  const handleModeChange = (mode: ModeType) => {
    if (isCollapsed) {
      onToggleCollapse(); // Expand the panel
    }
    onModeChange(mode); // Switch to the mode
  };

  return (
    <div className="bg-[#19133c] box-border flex gap-2.5 h-full items-center px-2 py-[14px] relative shrink-0 w-[67px] overflow-y-auto" data-name="Side Menu">
      <div className="flex flex-1 flex-col h-full items-start justify-between min-h-px min-w-px relative shrink-0" data-name="Side Menu Items">
        {/* Top Side Menu Items */}
        <div className="flex flex-col gap-3 items-start relative shrink-0 w-full" data-name="Top Side Menu Items">
          {/* Chat Mode */}
          <button 
            onClick={() => handleModeChange('chat')}
            className="h-[50px] relative shrink-0 w-full cursor-pointer group" 
            data-name="Mode Menu Item"
          >
            <div className="absolute flex flex-col gap-1 items-center justify-center left-0 size-[50px] top-0 z-10">
              <div className="overflow-clip relative shrink-0 size-5" data-name="Robot">
                <div className="absolute bottom-[66.67%] left-[33.33%] right-1/2 top-[16.67%]">
                  <div className="absolute inset-[-25%]">
                    <img alt="" className="block max-w-none size-full" src={img} />
                  </div>
                </div>
                <div className="absolute inset-[33.33%_16.67%_16.67%_16.67%]">
                  <div className="absolute inset-[-8.33%_-6.25%]">
                    <img alt="" className="block max-w-none size-full" src={img1} />
                  </div>
                </div>
                <div className="absolute inset-[58.33%_83.33%_41.67%_8.33%]">
                  <div className="absolute inset-[-0.83px_-50%]">
                    <img alt="" className="block max-w-none size-full" src={img2} />
                  </div>
                </div>
                <div className="absolute inset-[58.33%_8.33%_41.67%_83.33%]">
                  <div className="absolute inset-[-0.83px_-50%]">
                    <img alt="" className="block max-w-none size-full" src={img2} />
                  </div>
                </div>
                <div className="absolute inset-[54.17%_37.5%_37.5%_62.5%]">
                  <div className="absolute inset-[-50%_-0.83px]">
                    <img alt="" className="block max-w-none size-full" src={img3} />
                  </div>
                </div>
                <div className="absolute inset-[54.17%_62.5%_37.5%_37.5%]">
                  <div className="absolute inset-[-50%_-0.83px]">
                    <img alt="" className="block max-w-none size-full" src={img4} />
                  </div>
                </div>
              </div>
              <p className="font-medium leading-normal min-w-full relative shrink-0 text-xs text-brand-white text-center w-[min-content] whitespace-pre-wrap">
                Chat
              </p>
            </div>
            {/* Hover state */}
            <div className="absolute bg-[rgba(241,243,255,0.15)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px] opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Active state */}
            {activeMode === 'chat' && (
              <div className="absolute bg-[rgba(241,243,255,0.3)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px]" data-name="Highlight" />
            )}
          </button>

          {/* Design Mode */}
          <button 
            onClick={() => handleModeChange('design')}
            className="h-[50px] relative shrink-0 w-full cursor-pointer bg-transparent border-0 group"
          >
            <div className="absolute flex flex-col gap-1 items-center justify-center left-0 size-[50px] top-0 z-10">
              <div className="overflow-clip relative shrink-0 size-5">
                <div className="absolute bottom-3/4 left-1/2 right-[41.67%] top-[17.08%]">
                  <div className="absolute inset-[-52.63%_-50%]">
                    <img alt="" className="block max-w-none size-full" src={img5} />
                  </div>
                </div>
                <div className="absolute inset-[30%_78.75%_66.67%_9.17%]">
                  <div className="absolute inset-[-125.03%_-34.49%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
                <div className="absolute bottom-[41.67%] left-[17.08%] right-3/4 top-1/2">
                  <div className="absolute inset-[-50%_-52.63%]">
                    <img alt="" className="block max-w-none size-full" src={img7} />
                  </div>
                </div>
                <div className="absolute inset-[9.17%_66.67%_78.75%_30%]">
                  <div className="absolute inset-[-34.49%_-125.03%]">
                    <img alt="" className="block max-w-none size-full" src={img8} />
                  </div>
                </div>
                <div className="absolute inset-[37.49%_12.5%_12.49%_37.49%]">
                  <div className="absolute inset-[-8.33%]">
                    <img alt="" className="block max-w-none size-full" src={img9} />
                  </div>
                </div>
              </div>
              <p className="font-medium leading-normal min-w-full relative shrink-0 text-[#d0d2dd] text-xs text-center w-[min-content] whitespace-pre-wrap">
                Design
              </p>
            </div>
            {/* Hover state */}
            <div className="absolute bg-[rgba(241,243,255,0.15)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px] opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Active state */}
            {activeMode === 'design' && (
              <div className="absolute bg-[rgba(241,243,255,0.3)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px]" />
            )}
          </button>

          {/* Brand Mode */}
          <button 
            onClick={() => handleModeChange('brand')}
            className="h-[50px] relative shrink-0 w-full cursor-pointer bg-transparent border-0 group"
          >
            <div className="absolute flex flex-col gap-1 items-center justify-center left-0 size-[50px] top-0 z-10">
              <div className="overflow-clip relative shrink-0 size-5">
              <div className="absolute inset-[8.34%_12.5%]">
                <div className="absolute inset-[-5%_-5.56%]">
                  <img alt="" className="block max-w-none size-full" src={img15} />
                </div>
              </div>
              <div className="absolute bottom-1/2 left-[13.75%] right-[13.75%] top-[29.17%]">
                <div className="absolute inset-[-20%_-5.75%]">
                  <img alt="" className="block max-w-none size-full" src={img16} />
                </div>
              </div>
              <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-1/2">
                <div className="absolute inset-[-10%_-0.83px]">
                  <img alt="" className="block max-w-none size-full" src={img17} />
                </div>
              </div>
            </div>
              <p className="font-medium leading-normal min-w-full relative shrink-0 text-[#d0d2dd] text-xs text-center w-[min-content] whitespace-pre-wrap">
                Brand
              </p>
            </div>
            {/* Hover state */}
            <div className="absolute bg-[rgba(241,243,255,0.15)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px] opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Active state */}
            {activeMode === 'brand' && (
              <div className="absolute bg-[rgba(241,243,255,0.3)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px]" />
            )}
          </button>

          {/* Code Mode */}
          <button 
            onClick={() => handleModeChange('code')}
            className="h-[50px] relative shrink-0 w-full cursor-pointer bg-transparent border-0 group"
          >
            <div className="absolute flex flex-col gap-1 items-center justify-center left-0 size-[50px] top-0 z-10">
              <div className="overflow-clip relative shrink-0 size-5">
              <div className="absolute bottom-1/4 left-[66.67%] right-[8.33%] top-1/4">
                <div className="absolute inset-[-8.33%_-16.67%]">
                  <img alt="" className="block max-w-none size-full" src={img18} />
                </div>
              </div>
              <div className="absolute bottom-1/4 left-[8.33%] right-[66.67%] top-1/4">
                <div className="absolute inset-[-8.33%_-16.67%]">
                  <img alt="" className="block max-w-none size-full" src={img19} />
                </div>
              </div>
            </div>
              <p className="font-medium leading-normal min-w-full relative shrink-0 text-[#d0d2dd] text-xs text-center w-[min-content] whitespace-pre-wrap">
                Code
              </p>
            </div>
            {/* Hover state */}
            <div className="absolute bg-[rgba(241,243,255,0.15)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px] opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Active state */}
            {activeMode === 'code' && (
              <div className="absolute bg-[rgba(241,243,255,0.3)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px]" />
            )}
          </button>

          {/* Controls Mode */}
          <button 
            onClick={() => handleModeChange('controls')}
            className="h-[50px] relative shrink-0 w-full cursor-pointer bg-transparent border-0 group"
          >
            <div className="absolute flex flex-col gap-1 items-center justify-center left-0 size-[50px] top-0 z-10">
              <FileCog className="w-5 h-5 text-[#d0d2dd]" />
              <p className="font-medium leading-normal min-w-full relative shrink-0 text-[#d0d2dd] text-xs text-center w-[min-content] whitespace-pre-wrap">
                Controls
              </p>
            </div>
            {/* Hover state */}
            <div className="absolute bg-[rgba(241,243,255,0.15)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px] opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* Active state */}
            {activeMode === 'controls' && (
              <div className="absolute bg-[rgba(241,243,255,0.3)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px]" />
            )}
          </button>
        </div>

        {/* Collapse/Expand Toggle at Bottom */}
        <button 
          onClick={onToggleCollapse}
          className="h-[50px] relative shrink-0 w-full cursor-pointer bg-transparent border-0 group"
        >
          <div className="absolute flex flex-col gap-1 items-center justify-center left-0 size-[50px] top-0 z-10">
            {isCollapsed ? (
              <ArrowRightToLine className="w-5 h-5 text-[#d0d2dd]" />
            ) : (
              <ArrowLeftToLine className="w-5 h-5 text-[#d0d2dd]" />
            )}
          </div>
          {/* Hover state */}
          <div className="absolute bg-[rgba(241,243,255,0.15)] left-[-4px] rounded-lg w-[58px] h-[58px] top-[-4px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}

