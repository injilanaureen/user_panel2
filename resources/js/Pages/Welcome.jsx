import React, { useState } from 'react';
import { Link } from "@inertiajs/react";
import { ShoppingBag, X, User, Lock, CreditCard, Smartphone, FileText, ChevronRight } from 'lucide-react';
import Login from './Login';

export default function Welcome() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#29665c] via-[#1d4b43] to-[#153832]">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-48 -right-48 w-96 h-96 bg-[#3a7d71] rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#3a7d71] rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Navigation */}
                <nav className="w-full px-6 py-8 flex justify-between items-center">
                    <div className="flex items-center">
                        <ShoppingBag className="h-10 w-10 text-white" />
                        <span className="text-3xl font-bold text-white ml-3">ShopPoint</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button 
                            onClick={() => setIsLoginOpen(true)}
                            className="bg-white text-[#29665c] px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        >
                            Login
                        </button>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="container mx-auto px-6 pt-20 pb-24">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        {/* Left Content with Enhanced Heading */}
                        <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
                            <div className="relative mb-8 animate-slideUp">
                                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                                    Transform Your
                                    <span className="relative inline-block px-2 mx-2">
                                        <span className="relative z-10">Shop</span>
                                        <div className="absolute -bottom-2 left-0 right-0 h-3 bg-[#3a7d71] transform -skew-x-12"></div>
                                    </span>
                                    Digital
                                </h1>
                                <div className="absolute -right-4 top-0 w-20 h-20 bg-[#7ee2d1] opacity-20 rounded-full blur-xl"></div>
                                <div className="absolute -left-4 bottom-0 w-16 h-16 bg-[#7ee2d1] opacity-20 rounded-full blur-xl"></div>
                            </div>
                            <p className="text-xl text-[#b8e6dd] mb-12 animate-slideUp delay-100">
                                Provide seamless digital services to your customers. One platform for all your payment and service needs.
                            </p>
                            
                            {/* Feature Cards */}
                            <div className="grid grid-cols-2 gap-6 animate-slideUp delay-200">
                                <div className="bg-[#3a7d71] bg-opacity-30 p-6 rounded-xl backdrop-blur-sm">
                                    <Smartphone className="h-8 w-8 text-[#7ee2d1] mb-4" />
                                    <h3 className="text-white font-semibold mb-2">Recharge & Bills</h3>
                                    <p className="text-[#b8e6dd] text-sm">Mobile, DTH & Utility payments made easy</p>
                                </div>
                                <div className="bg-[#3a7d71] bg-opacity-30 p-6 rounded-xl backdrop-blur-sm">
                                    <CreditCard className="h-8 w-8 text-[#7ee2d1] mb-4" />
                                    <h3 className="text-white font-semibold mb-2">Payment Solutions</h3>
                                    <p className="text-[#b8e6dd] text-sm">Secure & fast payment processing</p>
                                </div>
                                <div className="bg-[#3a7d71] bg-opacity-30 p-6 rounded-xl backdrop-blur-sm">
                                    <FileText className="h-8 w-8 text-[#7ee2d1] mb-4" />
                                    <h3 className="text-white font-semibold mb-2">Document Services</h3>
                                    <p className="text-[#b8e6dd] text-sm">Pan Card, Aadhar & more</p>
                                </div>
                                <div className="bg-[#3a7d71] bg-opacity-30 p-6 rounded-xl backdrop-blur-sm">
                                    <ShoppingBag className="h-8 w-8 text-[#7ee2d1] mb-4" />
                                    <h3 className="text-white font-semibold mb-2">Business Growth</h3>
                                    <p className="text-[#b8e6dd] text-sm">Expand your service offerings</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Hero Image Section */}
                        <div className="w-full lg:w-1/2 flex justify-center animate-float">
                            <div className="relative w-full max-w-lg">
                                {/* Background decorative elements */}
                                <div className="absolute top-0 -left-4 w-72 h-72 bg-[#3a7d71] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                                <div className="absolute top-0 -right-4 w-72 h-72 bg-[#7ee2d1] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#153832] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                                
                                {/* Main image container */}
                                <div className="relative">
                                    {/* You would replace this with your actual image */}
                                    {/* <img 
                                        src="https://your-actual-image-url.com/hero-image.png" 
                                        alt="Shop Management Dashboard"
                                        className="relative rounded-lg shadow-2xl"
                                        // onError={(e) => {
                                        //     e.target.onerror = null;
                                        //     e.target.src = "/api/placeholder/600/500";
                                        // }}
                                    /> */}
                                    
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#29665c] to-transparent opacity-10 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            {isLoginOpen && (
           <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen}  />
            )}

<style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                
                @keyframes scaleUp {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                
                .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
                .animate-slideUp { animation: slideUp 0.5s ease-out; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-scaleUp { animation: scaleUp 0.3s ease-out; }
                
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
            `}</style>
        </div>
    );
}