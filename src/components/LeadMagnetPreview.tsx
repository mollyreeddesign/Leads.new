import { useState } from 'react';
import SiteNavigation from './SiteNavigation';

type PageType = 'dataCapture' | 'gate' | 'results';

type LeadMagnetPreviewProps = {
  onEditClick: () => void;
};

export default function LeadMagnetPreview({ onEditClick }: LeadMagnetPreviewProps) {
  const [activePage, setActivePage] = useState<PageType>('dataCapture');

  return (
    <div className="bg-[#fefefe] flex flex-col w-full h-screen overflow-auto">
      {/* Top Navigation */}
      <SiteNavigation onEditClick={onEditClick} showEditButton={true} />

      {/* Success Banner */}
      <div className="bg-[#16f5ba] px-6 py-4 w-full">
        <p className="text-sm text-[#1a1a1a]">
          Your lead magnet is ready. Take a look.{' '}
          <button
            onClick={onEditClick}
            className="font-bold inline-flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0 text-[#1a1a1a]"
          >
            Go to the studio to edit these pages.
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </p>
      </div>

      {/* Page Tabs */}
      <div className="bg-[#f1f3ff] px-6 py-5 w-full">
        <div className="flex gap-4 max-w-6xl mx-auto">
          {/* Data Capture Page */}
          <button
            onClick={() => setActivePage('dataCapture')}
            className={`bg-white border-[3px] ${
              activePage === 'dataCapture' ? 'border-brand-purple' : 'border-[#e5e7f0]'
            } rounded-xl p-3 flex-1 max-w-md cursor-pointer transition-all hover:shadow-md`}
          >
            <div className="flex gap-3">
              <div className="w-[56px] h-[56px] bg-gray-300 rounded flex-shrink-0"></div>
              <div className="flex-1 text-left">
                <h3 className={`font-semibold text-base mb-1 ${
                  activePage === 'dataCapture' ? 'text-brand-purple' : 'text-[#9ca3af]'
                }`}>
                  1. Data Capture page
                </h3>
                <p className="text-xs text-[#9ca3af] leading-snug">
                  Get people excited about your lead magnet and capture their email
                </p>
              </div>
            </div>
          </button>

          {/* Gate Page */}
          <button
            onClick={() => setActivePage('gate')}
            className={`bg-white border-[3px] ${
              activePage === 'gate' ? 'border-brand-purple' : 'border-[#e5e7f0]'
            } rounded-xl p-3 flex-1 max-w-md cursor-pointer transition-all hover:shadow-md`}
          >
            <div className="flex gap-3">
              <div className="w-[56px] h-[56px] bg-gray-300 rounded flex-shrink-0"></div>
              <div className="flex-1 text-left">
                <h3 className={`font-semibold text-base mb-1 ${
                  activePage === 'gate' ? 'text-brand-purple' : 'text-[#9ca3af]'
                }`}>
                  2. Quiz page
                </h3>
                <p className="text-xs text-[#9ca3af] leading-snug">
                  The quiz to assess their starfish ability
                </p>
              </div>
            </div>
          </button>

          {/* Results Page */}
          <button
            onClick={() => setActivePage('results')}
            className={`bg-white border-[3px] ${
              activePage === 'results' ? 'border-brand-purple' : 'border-[#e5e7f0]'
            } rounded-xl p-3 flex-1 max-w-md cursor-pointer transition-all hover:shadow-md`}
          >
            <div className="flex gap-3">
              <div className="w-[56px] h-[56px] bg-gray-300 rounded flex-shrink-0"></div>
              <div className="flex-1 text-left">
                <h3 className={`font-semibold text-base mb-1 ${
                  activePage === 'results' ? 'text-brand-purple' : 'text-[#9ca3af]'
                }`}>
                  3. Results page
                </h3>
                <p className="text-xs text-[#9ca3af] leading-snug">
                  The quiz to assess their starfish ability
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Preview Section Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h2 className="text-lg font-semibold text-brand-purple">Preview</h2>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="4" y="2" width="16" height="20" rx="2" />
            </svg>
            <span className="text-sm">Desktop</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-[#f8f9ff] px-6 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {activePage === 'dataCapture' && renderDataCapturePage()}
          {activePage === 'gate' && renderGatePage()}
          {activePage === 'results' && renderResultsPage()}
        </div>
      </div>
    </div>
  );

  function renderDataCapturePage() {
    return (
      <>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-white px-12 py-16">
            <div className="flex items-start gap-12">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-600 mb-4 uppercase tracking-wide">ZORVO</p>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Unlock Your Starfish Potential with the Starfish Quiz!
                </h1>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  Discover your starfish's hidden talents and needs with our fun and informative quiz. Get personalized insights to ensure a happy and healthy starfish.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Understand your starfish's unique personality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Get tailored care tips for optimal health</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Learn how to create the perfect starfish habitat</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop" 
                  alt="A vibrant starfish on a sandy seabed"
                  className="w-80 h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Email Capture Form */}
          <div className="px-12 py-12 bg-white">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-center mb-6">Take the Starfish Quiz Now!</h2>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Email Address</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input 
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 mb-6">
                <input type="checkbox" className="mt-1" />
                <label className="text-xs text-gray-600">
                  I agree to the <a href="#" className="text-brand-purple underline">Privacy Policy</a> and <a href="#" className="text-brand-purple underline">Terms of Service</a>
                </label>
              </div>

              <button className="w-full bg-brand-purple text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                Discover My Starfish's Potential
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="px-12 py-16 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-12">What Starfish Owners Are Saying</h2>
            
            <div className="grid grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4 italic">
                  "I never knew my starfish had such a unique personality! The quiz helped me understand its needs so much better."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center text-white font-semibold">
                    AS
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Alice Smith</p>
                    <p className="text-xs text-gray-500">Starfish Enthusiast</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4 italic">
                  "The tailored care tips were a game-changer! My starfish is now thriving, and I'm so grateful for this quiz."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    RD
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Robert Davis</p>
                    <p className="text-xs text-gray-500">Aquarium Hobbyist</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4 italic">
                  "I was struggling to create the right habitat for my starfish, but this quiz provided all the answers I needed!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold">
                    JM
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Jane Miller</p>
                    <p className="text-xs text-gray-500">Marine Biologist Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="px-12 py-16 bg-white">
            <h2 className="text-3xl font-bold text-center mb-12">Why Take the Starfish Quiz?</h2>
            
            <div className="grid grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Quick & Easy</h3>
                <p className="text-sm text-gray-600">
                  Get instant insights into your starfish's needs with our user-friendly quiz.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Free & Valuable</h3>
                <p className="text-sm text-gray-600">
                  Access expert advice and personalized recommendations without spending a dime.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Expert-Backed</h3>
                <p className="text-sm text-gray-600">
                  Benefit from knowledge curated by marine biologists and starfish care specialists.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-12 py-8 bg-gray-100 text-center">
            <p className="text-xs text-gray-600 mb-2">© 2025 Your Company. All rights reserved.</p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
              <a href="#" className="hover:text-brand-purple">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-brand-purple">Terms of Service</a>
            </div>
          </div>
      </>
    );
  }

  function renderGatePage() {
    return (
      <>
        {/* Quiz Header */}
        <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-white px-12 py-12 text-center">
          <p className="text-xs font-semibold text-gray-600 mb-4 uppercase tracking-wide">ZORVO</p>
          <h1 className="text-4xl font-bold mb-4">Starfish Personality Quiz</h1>
          <p className="text-gray-600 text-lg">Answer these questions to discover your starfish's unique traits</p>
        </div>

        {/* Progress Bar */}
        <div className="px-12 py-6 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Question 3 of 8</span>
            <span className="text-sm font-medium text-brand-purple">37% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-brand-purple h-2 rounded-full transition-all" style={{ width: '37%' }}></div>
          </div>
        </div>

        {/* Quiz Question */}
        <div className="px-12 py-16 bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              How active is your starfish during feeding time?
            </h2>
            
            <div className="space-y-4">
              {/* Answer Option 1 */}
              <button className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-brand-purple hover:bg-purple-50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Very active and eager</h3>
                    <p className="text-gray-600 text-sm">Immediately moves toward food and shows excitement</p>
                  </div>
                </div>
              </button>

              {/* Answer Option 2 */}
              <button className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-brand-purple hover:bg-purple-50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Moderately active</h3>
                    <p className="text-gray-600 text-sm">Takes a moment but then approaches food steadily</p>
                  </div>
                </div>
              </button>

              {/* Answer Option 3 */}
              <button className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-brand-purple hover:bg-purple-50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Calm and patient</h3>
                    <p className="text-gray-600 text-sm">Waits and approaches food slowly and deliberately</p>
                  </div>
                </div>
              </button>

              {/* Answer Option 4 */}
              <button className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-brand-purple hover:bg-purple-50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Not very interested</h3>
                    <p className="text-gray-600 text-sm">Shows minimal response to feeding time</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12">
              <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all">
                Previous
              </button>
              <button className="px-8 py-3 bg-brand-purple text-white rounded-lg font-medium hover:bg-opacity-90 transition-all">
                Next Question
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-12 py-8 bg-gray-100 text-center">
          <p className="text-xs text-gray-600 mb-2">© 2025 Your Company. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-brand-purple">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-brand-purple">Terms of Service</a>
          </div>
        </div>
      </>
    );
  }

  function renderResultsPage() {
    return (
      <>
        {/* Results Header */}
        <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-white px-12 py-16 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Starfish Profile: The Explorer!</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Congratulations! Your starfish has a curious and adventurous personality. Here's what we learned about your marine friend.
          </p>
        </div>

        {/* Personality Traits */}
        <div className="px-12 py-12 bg-white">
          <h2 className="text-3xl font-bold text-center mb-10">Personality Traits</h2>
          
          <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Active</h3>
              </div>
              <p className="text-gray-700 text-sm">Your starfish enjoys exploring its environment and is quite energetic.</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Social</h3>
              </div>
              <p className="text-gray-700 text-sm">Shows interest in tankmates and interactive feeding sessions.</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Curious</h3>
              </div>
              <p className="text-gray-700 text-sm">Loves to investigate new objects and changes in the habitat.</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Healthy</h3>
              </div>
              <p className="text-gray-700 text-sm">Displays good appetite and normal regeneration patterns.</p>
            </div>
          </div>
        </div>

        {/* Care Recommendations */}
        <div className="px-12 py-12 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-10">Personalized Care Tips</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Enrichment Activities</h3>
                <p className="text-gray-700">Provide varied textures and objects for exploration. Rotate decorations monthly to keep things interesting.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Feeding Schedule</h3>
                <p className="text-gray-700">Feed 2-3 times per week with varied diet. Your active starfish may benefit from slightly more frequent feeding.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl flex gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Tank Maintenance</h3>
                <p className="text-gray-700">Maintain stable water parameters. Explorer personalities thrive with consistent conditions and gentle water flow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download CTA */}
        <div className="px-12 py-12 bg-white text-center">
          <h2 className="text-3xl font-bold mb-4">Want Your Full Report?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Download a comprehensive PDF guide with detailed care instructions, feeding schedules, and expert tips tailored specifically for your starfish's personality type.
          </p>
          <button className="bg-brand-purple text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all">
            Download Full Report (PDF)
          </button>
        </div>

        {/* Footer */}
        <div className="px-12 py-8 bg-gray-100 text-center">
          <p className="text-xs text-gray-600 mb-2">© 2025 Your Company. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-brand-purple">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-brand-purple">Terms of Service</a>
          </div>
        </div>
      </>
    );
  }
}

