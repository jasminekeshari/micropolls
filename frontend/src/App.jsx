import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePoll from './components/CreatePoll';
import PollView from './components/PollView';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 right-20"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-20 left-40"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
              Micro<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient">Polls</span>
            </h1>
            <p className="text-2xl md:text-3xl text-purple-200 mb-4 leading-relaxed">
              Create and share polls instantly
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Simple, fast, and beautiful polling platform. Create polls in seconds, share with anyone, and watch results update in real-time.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-white font-bold mb-2">Instant Creation</h3>
              <p className="text-purple-200 text-sm">Create polls in under 30 seconds with our intuitive interface</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-white font-bold mb-2">Live Results</h3>
              <p className="text-purple-200 text-sm">Watch votes come in real-time with beautiful visualizations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-white font-bold mb-2">Easy Sharing</h3>
              <p className="text-purple-200 text-sm">Share your poll with a simple link - no registration required</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <Link
              to="/new"
              className="inline-block px-12 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold rounded-2xl text-xl transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-purple-500/25"
            >
              🎆 Create Your First Poll
            </Link>
          </div>

          {/* How it Works */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mx-auto mb-4">1</div>
                <h3 className="text-white font-semibold mb-2">Create</h3>
                <p className="text-white/70 text-sm">Enter your admin key, add a question and up to 6 options</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mx-auto mb-4">2</div>
                <h3 className="text-white font-semibold mb-2">Share</h3>
                <p className="text-white/70 text-sm">Get a unique link and share it with your audience</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mx-auto mb-4">3</div>
                <h3 className="text-white font-semibold mb-2">Analyze</h3>
                <p className="text-white/70 text-sm">Watch live results with real-time updates and analytics</p>
              </div>
            </div>
          </div>

          {/* Admin Note */}
          <div className="mt-8 bg-blue-500/20 border border-blue-400/50 text-blue-200 px-6 py-4 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div className="text-left">
                <div className="font-bold">Admin Access Required</div>
                <div className="text-sm text-blue-300">You need an admin key to create polls. Demo key: <code className="bg-blue-900/50 px-2 py-1 rounded font-mono">admin123</code></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<CreatePoll />} />
        <Route path="/p/:id" element={<PollView />} />
      </Routes>
    </Router>
  );
}