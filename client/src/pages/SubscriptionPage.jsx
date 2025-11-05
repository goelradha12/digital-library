import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/auth.Stores';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Lock, Heart, Calendar } from 'lucide-react';
import { axiosInstance } from '../utils/axios';
import { useState } from 'react';

// Utility function to dynamically load the Razorpay script
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const SubscriptionPage = () => {
  const navigate = useNavigate();
  // Assuming useAuthStore provides both Visitor (logged-in but unsubscribed) and User (subscribed)
  const { Visitor, User, checkUserAuth } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const isLoggedIn = Visitor || User;
  const isSubscribed = User && User.subscription_end_date;

  const subscriptionEndDate = User?.subscription_end_date
    ? new Date(User.subscription_end_date)
    : null;

  // Determine the current subscription status
  let isExpired = false;
  if (subscriptionEndDate) {
    const today = new Date();
    // Check if the end date is in the past
    isExpired = subscriptionEndDate < today;
  }

  // Content Variables
  let mainTitle = 'Unlock Your Full Digital Library';
  let subText = 'Become a premium user to access all books, downloads, and rewards.';
  let ctaButtonText = 'Subscribe Now';
  let priceText = '₹600 / Year';
  let secondaryAction = 'Already a member? Login here.';
  let secondaryPath = '/login';

  if (!isLoggedIn) {
    mainTitle = 'Start Your Journey';
    subText = 'You must log in or sign up to view and manage your subscription.';
    ctaButtonText = 'Go to Login / Sign Up';
    priceText = 'Access Blocked';
  } else if (isExpired) {
    mainTitle = 'Your Subscription Has Ended';
    subText = `Please renew to continue access. Your membership ended on ${subscriptionEndDate.toLocaleDateString()}.`;
    ctaButtonText = 'Renew Subscription Now';
    priceText = 'Time to Renew';
  }

  // Actual Razorpay logic
  const initiatePaymentProcess = async () => {
    // 1. Load Razorpay script dynamically
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      console.error('Razorpay SDK failed to load. Please check your network.');
      return;
    }

    // Determine the ID to send for payment processing
    const userIdForOrder = Visitor?.Visitor_ID || User?.Visitor_ID;
    if (!userIdForOrder) return;

    // 2. Call backend to create Razorpay Order ID
    let orderDetails;
    try {
      // NOTE: This endpoint needs to be secured on your backend
      const response = await axiosInstance.post('/payments/create-order', {
        amount: 60000, // Amount in paisa (₹600.00)
        visitor_id: userIdForOrder,
      });
      orderDetails = response.data.data;
    } catch (error) {
      console.error('Backend failed to create order:', error);
      alert('Could not initiate payment. Please try again.'); // Using alert() for immediate feedback on critical error
      return;
    }

    // 3. Configure Razorpay options and open checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use environment variable
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      name: 'Digital Library Subscription',
      description: 'Annual Premium Access',
      order_id: orderDetails.id,
      handler: function (response) {
        // This handler is called on successful payment
        // NOTE: Call your backend validation endpoint here
        console.log(response);
        axiosInstance
          .post('/payments/verify', response)
          .then((verificationRes) => {
            if (verificationRes.data.data?.success) {
              alert('Subscription successful! Redirecting to profile.');
              // refesh the user data
              checkUserAuth(Visitor.Visitor_ID);
              navigate('/');
            } else {
              alert('Payment verification failed. Contact support.');
            }
          })
          .catch((err) => {
            console.error('Verification failed:', err);
            alert('A error occurred during verification.');
          });
      },
      prefill: {
        name: Visitor?.Name || 'Library User',
        email: Visitor?.Email,
      },
      theme: {
        color: '#A56F6E', // Our dusty rose color
      },
      modal: {
        ondismiss: function () {
          alert('Payment process was cancelled.');
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Handle CTA Click based on state
  const handleCtaClick = async () => {
    console.log('Clicked by: ', User, Visitor);
    if (!isLoggedIn) {
      navigate('/login');
    }
    setIsProcessing(true);
    await initiatePaymentProcess();
    setIsProcessing(false);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-20 pb-12 font-sans text-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 text-center">
            <Lock
              size={48}
              className={`mx-auto mb-6 ${isExpired ? 'text-red-500' : 'text-[#A56F6E]'}`}
            />

            <h1 className="text-4xl font-serif text-gray-900 leading-tight mb-3">{mainTitle}</h1>
            <p className="text-lg text-gray-600 mb-10">{subText}</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-10 border border-gray-200">
              <p className="text-5xl font-bold text-gray-900">{priceText}</p>
              {(!isLoggedIn || (!isSubscribed && !isExpired)) && (
                <p className="text-sm font-semibold text-[#A56F6E] mt-2">Annual Premium Plan</p>
              )}
              {isExpired && (
                <p className="text-md text-red-500 mt-2 flex items-center justify-center gap-2">
                  <Calendar size={18} /> Expired on: {subscriptionEndDate.toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Features/Benefits (Only shown when user is ready to subscribe) */}
            {!isExpired && isLoggedIn && !isSubscribed && (
              <div className="text-left max-w-sm mx-auto space-y-3 mb-10">
                <h3 className="text-lg font-semibold text-[#A56F6E]">What you get:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-3">
                    <Heart size={18} className="text-[#A56F6E]" /> Unlimited Downloads and Favorites
                  </li>
                  <li className="flex items-center gap-3">
                    <Calendar size={18} className="text-[#A56F6E]" /> Full 12-Month Access
                  </li>
                  <li className="flex items-center gap-3">
                    <Lock size={18} className="text-[#A56F6E]" /> Exclusive AI Recommendations
                  </li>
                </ul>
              </div>
            )}

            {/* Main CTA */}
            <button
              onClick={handleCtaClick}
              className="w-full cursor-pointer px-6 py-3 text-xl font-semibold text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#A56F6E] focus:ring-opacity-50"
              style={{ backgroundColor: '#A56F6E' }}
              disabled={isProcessing}
            >
              {ctaButtonText}
            </button>

            {/* Secondary Action */}
            {isExpired && (
              <p className="text-center text-sm text-gray-600 mt-4">
                Or contact support if you need assistance.
              </p>
            )}
            {!isLoggedIn && (
              <p className="text-center text-sm text-gray-600 mt-4">
                Already subscribed?{' '}
                <a
                  onClick={() => navigate(secondaryPath)}
                  className="text-[#A56F6E] font-medium hover:underline cursor-pointer"
                >
                  Login here
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubscriptionPage;
