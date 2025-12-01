import SiteNavigation from './SiteNavigation';

type TabType = 'Campaign' | 'Leads' | 'Analytics' | 'Settings' | 'Share';

type ShareProps = {
  onTabChange: (tab: TabType) => void;
};

export default function Share({ onTabChange }: ShareProps) {
  return (
    <div className="bg-[#fefefe] flex flex-col h-screen overflow-hidden">
      {/* Top Navigation */}
      <SiteNavigation 
        activeTab="Share"
        onTabChange={onTabChange}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-brand-gray">
        {/* Content goes here */}
      </div>
    </div>
  );
}

