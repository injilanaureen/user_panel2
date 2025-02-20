import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { X, ChevronRight } from "lucide-react"; // Ensure you import the icons you're using
import {Link} from "@inertiajs/react";

export default function Login({ isLoginOpen, setIsLoginOpen }) {

    const { data, setData, post, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        console.log(data)
        e.preventDefault();
        setIsLoading(true);
        post("/login", {
            onFinish: () => setIsLoading(false),
            onSuccess: () => {
                console.log("Success")
                // Redirect user after successful login
                window.location.href = "/dashboard";
            },
        });
    };

    return (
        isLoginOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-scaleUp">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                            <p className="text-gray-600 mt-1">Login to your account</p>
                        </div>
                        <button
                            onClick={() => setIsLoginOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#29665c] focus:border-transparent"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#29665c] focus:border-transparent"
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-500">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#29665c] hover:bg-[#3a7d71] text-white py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center group"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login to Dashboard"}
                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-center mt-6 text-gray-600">
                        New to ShopPoint?{' '}
                        <Link href="/register" className="text-[#29665c] hover:text-[#3a7d71] font-semibold">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        )
    );
}
