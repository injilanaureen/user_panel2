import React, { useState } from "react";

import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import StatCard from "./statcard";
import NotificationItem from "../../../Layouts/notificationitem";
import { Bell, Search, Filter, Download, MoreVertical } from "lucide-react";
import { usePage, Link } from "@inertiajs/react";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend,
} from "recharts";
const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

const revenueData = [
    { name: "Jan", revenue: 4000 },

    { name: "Feb", revenue: 3000 },

    { name: "Mar", revenue: 5000 },

    { name: "Apr", revenue: 4500 },

    { name: "May", revenue: 6000 },

    { name: "Jun", revenue: 5500 },

    { name: "Jul", revenue: 7000 },
];

const transactionDistribution = [
    { name: "Mobile", value: 400 },

    { name: "DTH", value: 300 },

    { name: "Utilities", value: 200 },

    { name: "Others", value: 100 },
];

const hourlyTransactions = [
    { hour: "00:00", transactions: 120 },

    { hour: "04:00", transactions: 80 },

    { hour: "08:00", transactions: 200 },

    { hour: "12:00", transactions: 300 },

    { hour: "16:00", transactions: 250 },

    { hour: "20:00", transactions: 180 },
];

const transactions = [
    {
        user: "John Doe",

        email: "john@example.com",

        amount: "500",

        status: "Success",

        date: "2024-03-15",
    },

    {
        user: "Jane Smith",

        email: "jane@example.com",

        amount: "1000",

        status: "Success",

        date: "2024-03-15",
    },

    {
        user: "Mike Johnson",

        email: "mike@example.com",

        amount: "750",

        status: "Failed",

        date: "2024-03-14",
    },

    {
        user: "Sarah Williams",

        email: "sarah@example.com",

        amount: "250",

        status: "Success",

        date: "2024-03-14",
    },

    {
        user: "Robert Brown",

        email: "robert@example.com",

        amount: "1500",

        status: "Success",

        date: "2024-03-13",
    },
];

export default function Dashboard() {
    return (
            <main className="flex-1 overflow-y-auto">
                 <marquee
                className="text-red-500 font-bold text-lg"
                scrollamount="5"
            >
                <Link href="/onboarding-merchant" className="text-blue-600">
                    Click here!
                </Link>{" "}
                to send verification link on registered email ID. This will help
                in improving the security of your account.
            </marquee>
                {/* Top Navigation */}

                <div className="p-8">
                    {/* Stats Grid */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Revenue"
                            value="₹145,280"
                            change="+12.5%"
                            trend="up"
                            color="indigo"
                        />

                        <StatCard
                            title="Active Users"
                            value="1,482"
                            change="+8.2%"
                            trend="up"
                            color="green"
                        />

                        <StatCard
                            title="Failed Transactions"
                            value="23"
                            change="-5.1%"
                            trend="down"
                            color="red"
                        />

                        <StatCard
                            title="Success Rate"
                            value="98.5%"
                            change="+0.8%"
                            trend="up"
                            color="blue"
                        />
                    </div>

                    {/* Charts Section */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Revenue Chart */}

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">
                                    Revenue Overview
                                </h3>

                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                        <Filter className="h-5 w-5 text-gray-500" />
                                    </button>

                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                        <Download className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData}>
                                        <defs>
                                            <linearGradient
                                                id="colorRevenue"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#6366F1"
                                                    stopOpacity={0.1}
                                                />

                                                <stop
                                                    offset="95%"
                                                    stopColor="#6366F1"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />

                                        <XAxis dataKey="name" />

                                        <YAxis />

                                        <Tooltip />

                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#6366F1"
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Transaction Distribution */}

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">
                                    Transaction Distribution
                                </h3>

                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <MoreVertical className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="h-64">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={transactionDistribution}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {transactionDistribution.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={index}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>

                                            <Tooltip />

                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="h-64">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart data={hourlyTransactions}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />

                                            <XAxis dataKey="hour" />

                                            <YAxis />

                                            <Tooltip />

                                            <Bar
                                                dataKey="transactions"
                                                fill="#6366F1"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}

                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    Recent Transactions
                                </h3>

                                <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                                    View All
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                                            User
                                        </th>

                                        <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                                            Amount
                                        </th>

                                        <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                                            Status
                                        </th>

                                        <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                                            Date
                                        </th>

                                        <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions.map((transaction, index) => (
                                        <tr
                                            key={index}
                                            className="border-t border-gray-100"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                        {transaction.user[0]}
                                                    </div>

                                                    <div>
                                                        <p className="font-medium">
                                                            {transaction.user}
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            {transaction.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6 font-medium">
                                                ₹{transaction.amount}
                                            </td>

                                            <td className="py-4 px-6">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                        transaction.status ===
                                                        "Success"
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-red-50 text-red-700"
                                                    }`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 text-gray-500">
                                                {transaction.date}
                                            </td>

                                            <td className="py-4 px-6">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreVertical className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
    );
}
