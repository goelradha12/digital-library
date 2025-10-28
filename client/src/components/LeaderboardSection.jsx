import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/auth.Stores';
import { useLeaderboardStore } from '../stores/leaderboard.Stores';
import { Crown, Flame, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router';

const LeaderboardSection = () => {
  const { User } = useAuthStore();
  const { leaderboard, userRank, isLoadingLeaderboard, getLeaderboard } = useLeaderboardStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!leaderboard.length && !isLoadingLeaderboard) getLeaderboard();
  }, []);

  if (isLoadingLeaderboard)
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#A56F6E]" />
        <span className="ml-3 text-gray-600 text-sm">Loading Leaderboard...</span>
      </div>
    );

  if (!leaderboard?.length)
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
        <p>No leaderboard data available yet.</p>
      </div>
    );

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 sm:p-8 max-w-3xl mx-auto mt-10 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold text-[#A56F6E] flex items-center gap-2">
          <Trophy size={24} className="text-[#A56F6E]" />
          Reading Leaderboard
        </h2>
        <p className="text-sm text-gray-500 italic">Based on daily reading streaks 🔥</p>
      </div>

      {/* 🏆 Top 3 Leaderboard */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {leaderboard.slice(0, 3).map((user, index) => (
          <div
            key={user.User_ID || index}
            className={`relative flex flex-col items-center justify-center p-5 rounded-lg text-center shadow-md transition-all hover:scale-[1.03] ${
              index === 0
                ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-300'
                : index === 1
                  ? 'bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-300'
                  : 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200'
            }`}
          >
            {index === 0 && <Crown className="absolute -top-3 text-yellow-500" size={26} />}
            <h3 className="font-semibold text-gray-800 mt-1">{user.Name}</h3>
            <p className="text-sm text-gray-600 mt-1">🔥 {user.Current_Streak} day streak</p>
            <p className="text-xs text-gray-500">Longest: {user.Longest_Streak} days</p>
            <span
              className={`absolute -bottom-3 px-3 py-0.5 rounded-full text-xs font-medium text-white ${
                index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
              }`}
            >
              #{index + 1}
            </span>
          </div>
        ))}
      </div>

      {/* 👤 Current User Summary */}
      {User && (
        <div className="bg-[#A56F6E]/10 p-4 rounded-lg text-center border border-[#A56F6E]/30">
          <h3 className="text-lg font-semibold text-[#A56F6E] mb-1">Your Reading Streak</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-gray-700 text-sm">
            <span>
              <Flame size={18} className="inline text-[#A56F6E]" /> <b>{User.Current_Streak}</b>{' '}
              days active
            </span>
            <span>|</span>
            <span>
              Longest streak: <b>{User.Longest_Streak}</b> days
            </span>
            <span>|</span>
            <span>
              Rank:{' '}
              <b>#{userRank || leaderboard.findIndex((u) => u.User_ID === User.User_ID) + 1}</b>
            </span>
          </div>
        </div>
      )}
      {!User && (
        <div className="bg-[#A56F6E]/10 p-4 rounded-lg text-center border border-[#A56F6E]/30">
          <h3 className="text-lg font-semibold text-[#A56F6E] mb-1">
            Start reading to unlock your reading streak{' '}
            <span className="underline" onClick={() => navigate('/login')}>
              Login Here
            </span>
          </h3>
        </div>
      )}
    </section>
  );
};

export default LeaderboardSection;
