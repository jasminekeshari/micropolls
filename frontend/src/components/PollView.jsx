import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function PollView() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [justVoted, setJustVoted] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchPoll = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/polls/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setPoll(data);
      } else {
        setError(data.error || 'Poll not found');
      }
    } catch (err) {
      setError('Failed to load poll. Make sure backend is running!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
    
    // Check if already voted
    const voted = localStorage.getItem(`poll:${id}:voted`);
    if (voted === 'true') {
      setHasVoted(true);
    }

    // Auto-refresh every 2 seconds
    const interval = setInterval(fetchPoll, 2000);
    return () => clearInterval(interval);
  }, [id]);

  const handleVote = async () => {
    if (selectedOption === null || hasVoted) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/polls/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex: selectedOption })
      });

      const data = await response.json();
      
      if (response.ok) {
        setPoll(data);
        setHasVoted(true);
        setJustVoted(true);
        localStorage.setItem(`poll:${id}:voted`, 'true');
        setTimeout(() => setJustVoted(false), 3000);
      } else {
        setError(data.error || 'Failed to vote');
      }
    } catch (err) {
      setError('Failed to submit vote');
    }
  };

  const getTotalVotes = () => {
    return poll?.options.reduce((sum, option) => sum + option.votes, 0) || 0;
  };

  const getPercentage = (votes) => {
    const total = getTotalVotes();
    return total > 0 ? ((votes / total) * 100).toFixed(1) : 0;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWinningOption = () => {
    if (!poll?.options.length) return null;
    return poll.options.reduce((max, option) => 
      option.votes > max.votes ? option : max
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading poll...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-500/20 border border-red-400/50 text-red-200 px-6 py-6 rounded-xl mb-6">
            <div className="text-4xl mb-4">🙁</div>
            <div className="font-bold text-lg mb-2">Oops! Something went wrong</div>
            <div className="text-sm">{error}</div>
          </div>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const winningOption = getWinningOption();
  const totalVotes = getTotalVotes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 right-20"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-20 left-40"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <h1 className="text-4xl font-black text-white hover:scale-105 transition-transform duration-300">
                Micro<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Polls</span>
              </h1>
            </Link>
          </div>

          {/* Main Poll Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
            {/* Poll Question */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {poll?.question}
              </h2>
              <div className="flex items-center justify-center gap-4 text-white/60">
                <span className="flex items-center gap-2">
                  📈 {totalVotes} total votes
                </span>
                <span className="flex items-center gap-2">
                  🔄 Live updates
                </span>
              </div>
            </div>

            {/* Voting Section */}
            {!hasVoted ? (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Cast Your Vote</h3>
                <div className="space-y-4 mb-6">
                  {poll?.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                        selectedOption === index
                          ? 'bg-purple-500/30 border-purple-400/70 scale-105'
                          : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="poll-option"
                        value={index}
                        onChange={() => setSelectedOption(index)}
                        className="mr-4 w-5 h-5 text-purple-500"
                      />
                      <span className="text-white text-lg font-medium">{option.text}</span>
                    </label>
                  ))}
                </div>
                
                <button
                  onClick={handleVote}
                  disabled={selectedOption === null}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold rounded-xl text-lg transition-all duration-300 disabled:cursor-not-allowed hover:scale-105 disabled:scale-100 shadow-lg"
                >
                  {selectedOption !== null ? '🚀 Submit My Vote' : 'Select an option to vote'}
                </button>
              </div>
            ) : (
              <div className="mb-8 text-center">
                <div className={`inline-block px-6 py-4 rounded-xl border ${justVoted ? 'bg-emerald-500/30 border-emerald-400/70 animate-pulse' : 'bg-emerald-500/20 border-emerald-400/50'}`}>
                  <div className="flex items-center gap-3 text-emerald-200">
                    <span className="text-2xl">✓</span>
                    <div>
                      <div className="font-bold">{justVoted ? 'Vote Submitted!' : 'You have voted'}</div>
                      <div className="text-sm text-emerald-300">Thank you for participating</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Live Results</h3>
                {winningOption && totalVotes > 0 && (
                  <div className="bg-yellow-500/20 border border-yellow-400/50 text-yellow-200 px-4 py-2 rounded-full text-sm font-semibold">
                    🏆 Leading: {winningOption.text}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {poll?.options.map((option, index) => {
                  const percentage = getPercentage(option.votes);
                  const isWinning = winningOption && option.text === winningOption.text && totalVotes > 0;
                  
                  return (
                    <div key={index} className={`rounded-xl p-5 border transition-all duration-500 ${
                      isWinning ? 'bg-yellow-500/10 border-yellow-400/30' : 'bg-white/5 border-white/10'
                    }`}>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          {isWinning && <span className="text-yellow-400">🏆</span>}
                          <span className="text-white font-semibold text-lg">{option.text}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold text-lg">{percentage}%</div>
                          <div className="text-white/60 text-sm">{option.votes} votes</div>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                            isWinning 
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold text-lg">Share This Poll</h4>
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    copied 
                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50'
                      : 'bg-blue-500/30 hover:bg-blue-500/50 text-blue-200 border border-blue-400/30'
                  }`}
                >
                  {copied ? '✓ Copied!' : '📋 Copy Link'}
                </button>
              </div>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-white/80 break-all border border-white/10">
                {window.location.href}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors duration-300"
            >
              ← Create Your Own Poll
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}