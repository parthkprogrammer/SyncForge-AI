import { useState } from 'react';

function App() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100 flex flex-col items-center">
        {/* Centered Title */}
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight text-center">
          SyncForge AI
        </h1>
        
        {/* Small Description */}
        <p className="text-slate-500 text-sm text-center mt-3 leading-relaxed">
          Tailwind CSS has been successfully configured. This is a clean, minimal container verifying our utility classes.
        </p>

        {/* Primary Button */}
        <button
          onClick={() => setClicked(!clicked)}
          className={`mt-6 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            clicked 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {clicked ? 'Connected!' : 'Test Connection'}
        </button>
      </div>
    </div>
  );
}

export default App;
