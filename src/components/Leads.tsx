import SiteNavigation from './SiteNavigation';

type TabType = 'Campaign' | 'Leads' | 'Analytics' | 'Settings' | 'Share';

type LeadsProps = {
  onTabChange: (tab: TabType) => void;
};

export default function Leads({ onTabChange }: LeadsProps) {
  return (
    <div className="bg-[#fefefe] flex flex-col h-screen overflow-hidden">
      {/* Top Navigation */}
      <SiteNavigation 
        activeTab="Leads"
        onTabChange={onTabChange}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-brand-gray">
        {/* Content goes here */}
      </div>
    </div>
  );
}

