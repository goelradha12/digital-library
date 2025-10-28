import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/auth.Stores';

const SUBSCRIPTION_PRICE = '₹600/yr';

const SubscriptionModal = () => {
  const { Visitor, checkUserAuth, User, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!User) {
      setIsModalOpen(true);
    } else if (User && new Date(User.subscription_end_date) < new Date()) {
      console.log('Subscription ended');
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isLoading, User]);

  // Simple function to navigate/handle subscription action
  const handleCtaClick = () => {
    // In a real app, this would redirect to the dedicated payment page
    console.log('Redirecting to subscription payment page...');
    navigate('/subscription');
  };

  // Simple function to navigate to login page
  const handleLoginClick = () => {
    console.log('Redirecting to login page...');
    navigate('/login');
  };

  if (!isModalOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm relative transform scale-100 transition-transform duration-300">
        <div className="p-8 text-center">
          <header className="mb-8">
            <h2 className="text-3xl font-serif text-gray-900 mb-2">Unlock Premium Access</h2>
            <p className="text-gray-600 text-base">
              You need a subscription to access this feature.
            </p>
            {User && (
              <p className="text-gray-600 text-base">
                Subscription ended on, {new Date(User.subscription_end_date).toDateString()}.
              </p>
            )}
          </header>

          {/* Pricing Box - Enhanced Look */}
          <div className="bg-[#E0D4D3] p-6 rounded-lg mb-8 border-2 border-[#A56F6E]">
            <p className="text-sm font-semibold text-[#A56F6E] mb-1">Annual Premium Plan</p>
            <p className="text-5xl font-bold text-gray-900 mb-2">{SUBSCRIPTION_PRICE}</p>
            <p className="text-xs text-gray-600">Less than ₹50/month!</p>
          </div>

          {/* Benefits List */}
          <ul className="space-y-3 text-left text-gray-700 mb-8 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#A56F6E] flex-shrink-0 mt-0.5" />
              Unlimited downloads and offline reading
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#A56F6E] flex-shrink-0 mt-0.5" />
              Personalized AI reading recommendations
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#A56F6E] flex-shrink-0 mt-0.5" />
              Earn rewards and track reading streaks
            </li>
          </ul>

          {/* CTA Button */}
          <button
            onClick={handleCtaClick}
            className="w-full cursor-pointer px-6 py-3 text-lg font-semibold text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#A56F6E] focus:ring-opacity-50"
            style={{ backgroundColor: '#A56F6E' }}
          >
            Subscribe Now
          </button>

          <p className="text-xs text-gray-500 mt-3">Join 1000+ users already subscribed!</p>

          {/* New Login Link */}
          <p className="text-sm mt-4 text-gray-600">
            Already subscribed?{' '}
            <a
              onClick={handleLoginClick}
              className="text-[#A56F6E] font-semibold hover:underline cursor-pointer"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
