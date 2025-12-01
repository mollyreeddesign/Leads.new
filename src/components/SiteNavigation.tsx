// Image assets - Local imports
import imgLeadsLogo from '../assets/leads-logo.svg';
import imgLucideChevronDown from '../assets/chevron-down.svg';

type TabType = 'Campaign' | 'Leads' | 'Analytics' | 'Settings' | 'Share';

type SiteNavigationProps = {
  onEditClick?: () => void;
  showEditButton?: boolean;
  onPreviewClick?: () => void;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
};

export default function SiteNavigation({ onEditClick, showEditButton = false, onPreviewClick, activeTab = 'Campaign', onTabChange }: SiteNavigationProps) {
  const tabs: TabType[] = ['Campaign', 'Leads', 'Analytics', 'Settings', 'Share'];
  
  const handleTabClick = (tab: TabType) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };
  return (
    <div className="box-border flex flex-col items-start px-[18px] py-3 relative shrink-0 w-full" data-name="Navigation">
      <div className="flex items-center justify-between relative shrink-0 w-full" data-name="Navigation Items">
        {/* Logo + Project Dropdown */}
        <div className="h-[30px] relative shrink-0 w-[227px]" data-name="Logo + Project Dropdown">
          <div className="absolute left-0 size-6 top-[3px]" data-name="Leads Logo">
            <img alt="Leads Logo" className="block max-w-none size-full" src={imgLeadsLogo} />
          </div>
          <div className="absolute bg-brand-white box-border flex gap-1 h-[30px] items-center justify-center left-[37px] px-3 py-1 rounded-lg top-0" data-name="Project Dropdown">
            <p className="font-semibold leading-normal relative shrink-0 text-base text-brand-navy font-heading">
              Project:
            </p>
            <p className="font-semibold leading-normal relative shrink-0 text-base text-brand-navy font-heading">
              Starfish Quiz
            </p>
            <div className="relative shrink-0 size-5">
              <img alt="Dropdown" className="block max-w-none size-full" src={imgLucideChevronDown} />
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex gap-1 items-center relative shrink-0" data-name="Main Menu">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`${
                activeTab === tab ? 'bg-brand-gray' : 'bg-brand-white hover:bg-gray-100'
              } box-border flex gap-2.5 h-[30px] items-center justify-center px-3 py-1 relative rounded-lg shrink-0 cursor-pointer transition-colors`}
            >
              <p className="font-medium leading-normal relative shrink-0 text-sm text-brand-navy">
                {tab}
              </p>
            </button>
          ))}
        </div>

        {/* Publish + Preview/Edit Buttons */}
        <div className="h-8 relative shrink-0 w-[190px]" data-name="Publish + Preview Buttons">
          <div className="absolute bg-brand-purple box-border flex gap-2 items-center justify-center left-[98px] px-4 py-2 rounded-lg top-0 w-[92px]">
            <p className="font-medium leading-normal relative shrink-0 text-sm text-brand-white">
              Publish
            </p>
          </div>
          {showEditButton ? (
            <button
              onClick={onEditClick}
              className="absolute bg-brand-white border border-brand-purple border-solid box-border flex gap-2 items-center justify-center left-0 px-4 py-2 rounded-lg top-0 w-[92px] hover:bg-purple-50 transition-colors cursor-pointer"
            >
              <p className="font-medium leading-normal relative shrink-0 text-sm text-brand-navy">
                Edit
              </p>
            </button>
          ) : onPreviewClick ? (
            <button
              onClick={onPreviewClick}
              className="absolute bg-brand-white border border-brand-purple border-solid box-border flex gap-2 items-center justify-center left-0 px-4 py-2 rounded-lg top-0 w-[92px] hover:bg-purple-50 transition-colors cursor-pointer"
            >
              <p className="font-medium leading-normal relative shrink-0 text-sm text-brand-navy">
                Preview
              </p>
            </button>
          ) : (
            <div className="absolute bg-brand-white border border-brand-purple border-solid box-border flex gap-2 items-center justify-center left-0 px-4 py-2 rounded-lg top-0 w-[92px]">
              <p className="font-medium leading-normal relative shrink-0 text-sm text-brand-navy">
                Preview
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

