import { useState } from 'react'
import EditLeadMagnetPanel from './components/EditLeadMagnetPanel'
import LeadMagnetPreview from './components/LeadMagnetPreview'

function App() {
  const [currentPage, setCurrentPage] = useState<'edit' | 'preview'>('preview')

  return (
    <div className="relative">
      {currentPage === 'preview' ? (
        <LeadMagnetPreview onEditClick={() => setCurrentPage('edit')} />
      ) : (
        <EditLeadMagnetPanel onPreviewClick={() => setCurrentPage('preview')} />
      )}
    </div>
  )
}

export default App

