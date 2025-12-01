import { useState } from 'react';
import SiteNavigation from './SiteNavigation';

type TabType = 'Campaign' | 'Leads' | 'Analytics' | 'Settings' | 'Share';

type SettingsProps = {
  onTabChange: (tab: TabType) => void;
};

type PlanType = 'small' | 'medium' | 'large';

export default function Settings({ onTabChange }: SettingsProps) {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('small');
  return (
    <div className="bg-[#fefefe] flex flex-col h-screen overflow-hidden">
      {/* Top Navigation */}
      <SiteNavigation 
        activeTab="Settings"
        onTabChange={onTabChange}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-brand-gray overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-brand-navy mb-8">Settings</h1>
          
          {/* Account Settings Section */}
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-brand-navy">Account Settings</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* User Photo */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-brand-purple flex items-center justify-center text-white text-xl font-semibold">
                    MR
                  </div>
                  <div>
                    <h3 className="font-medium text-brand-navy">Profile Photo</h3>
                    <p className="text-sm text-gray-600">Update your profile picture</p>
                  </div>
                </div>
                <button className="bg-brand-white border border-brand-purple text-brand-navy px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                  Change Photo
                </button>
              </div>

              {/* User Email */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-brand-navy">Email Address</h3>
                  <p className="text-sm text-gray-600">mollyr@example.com</p>
                </div>
                <button className="bg-brand-white border border-brand-purple text-brand-navy px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                  Change Email
                </button>
              </div>

              {/* Subscription */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-brand-navy">Subscription</h3>
                  <p className="text-sm text-gray-600">Current plan: Small - $29/mo</p>
                </div>
                <button 
                  onClick={() => setIsSubscriptionModalOpen(true)}
                  className="bg-brand-white border border-brand-purple text-brand-navy px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors"
                >
                  Change Subscription
                </button>
              </div>

              {/* Log Out */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-brand-navy">Log Out</h3>
                  <p className="text-sm text-gray-600">Sign out of your account</p>
                </div>
                <button className="bg-brand-gray border border-gray-300 text-brand-navy px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Project Settings Section */}
          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-brand-navy">Project Settings</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Rename Project */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-brand-navy">Project Name</h3>
                  <p className="text-sm text-gray-600">Starfish Quiz</p>
                </div>
                <button className="bg-brand-white border border-brand-purple text-brand-navy px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                  Rename Project
                </button>
              </div>

              {/* Delete Project */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-red-700">Delete Project</h3>
                  <p className="text-sm text-gray-600">Permanently delete this project and all its data</p>
                  <p className="text-xs text-red-600 mt-1">⚠️ This action cannot be undone</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {isSubscriptionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <div className="text-center flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
                <p className="text-gray-600 text-lg">Start your subscription today</p>
              </div>
              <button 
                onClick={() => setIsSubscriptionModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-8 py-8 space-y-4">
              {/* Small Plan */}
              <div 
                className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                  selectedPlan === 'small' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan('small')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'small' ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedPlan === 'small' && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Small</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900">$29</span>
                        <span className="text-gray-600">/mo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">3 lead magnets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">50 leads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Standard AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Standard support</span>
                      </div>
                    </div>
                    
                    <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Medium Plan */}
              <div 
                className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                  selectedPlan === 'medium' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-blue-500 hover:border-blue-600'
                }`}
                onClick={() => setSelectedPlan('medium')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'medium' ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedPlan === 'medium' && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-bold text-gray-900">Medium</h3>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">Popular</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900">$79</span>
                        <span className="text-gray-600">/mo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">10 lead magnets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">250 leads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Frontier AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Priority support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Remove branding</span>
                      </div>
                    </div>
                    
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Large Plan */}
              <div 
                className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                  selectedPlan === 'large' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan('large')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === 'large' ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedPlan === 'large' && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Large</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900">$199</span>
                        <span className="text-gray-600">/mo</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">20 lead magnets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">1000 leads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Frontier AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Priority support</span>
                      </div>
                    </div>
                    
                    <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

