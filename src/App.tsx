import { useState } from 'react';
import EditLeadMagnetPanel from './components/EditLeadMagnetPanel';
import Leads from './components/Leads';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import Share from './components/Share';

type TabType = 'Campaign' | 'Leads' | 'Analytics' | 'Settings' | 'Share';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Campaign');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'Campaign':
        return <EditLeadMagnetPanel onPreviewClick={() => {}} onTabChange={setActiveTab} />;
      case 'Leads':
        return <Leads onTabChange={setActiveTab} />;
      case 'Analytics':
        return <Analytics onTabChange={setActiveTab} />;
      case 'Settings':
        return <Settings onTabChange={setActiveTab} />;
      case 'Share':
        return <Share onTabChange={setActiveTab} />;
      default:
        return <EditLeadMagnetPanel onPreviewClick={() => {}} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="relative bg-[#fefefe] min-h-screen">
      {renderActivePage()}
    </div>
  )
}

export default App

