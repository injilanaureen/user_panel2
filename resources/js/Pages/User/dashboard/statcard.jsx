import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, change, trend, color }) {

    const colors = {
  
      indigo: 'bg-indigo-50 text-indigo-600',
  
      green: 'bg-green-50 text-green-600',
  
      red: 'bg-red-50 text-red-600',
  
      blue: 'bg-blue-50 text-blue-600'
  
    };
  
    return (
  
      <div className="bg-white p-6 rounded-xl shadow-sm">
  
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${colors[color]} mb-4`}>
  
          {title}
  
        </div>
  
        <div className="flex items-center justify-between">
  
          <span className="text-3xl font-bold text-gray-900">{value}</span>
  
          <span className={`flex items-center text-sm ${
  
            trend === 'up' ? 'text-green-600' : 'text-red-600'
  
          }`}>
  
            {trend === 'up' ? (
  
              <ArrowUpRight className="h-4 w-4" />
  
            ) : (
  
              <ArrowDownRight className="h-4 w-4" />
  
            )}
  
            {change}
  
          </span>
  
        </div>
  
      </div>
  
    );
  
  }
  