import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Pipeline Builder</h1>
              <span className="ml-3 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                Beta
              </span>
            </div>
            <SubmitButton />
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar Layout */}
      <main className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
          <PipelineToolbar />
        </aside>

        {/* Pipeline Canvas */}
        <div className="flex-1 relative">
          <PipelineUI />
        </div>
      </main>
    </div>
  );
}

export default App;
