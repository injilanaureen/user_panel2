import React from 'react';
import { Bell } from 'lucide-react';

export default function NotificationItem({ title, description, time }) {

    return (
  
      <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
  
        <div className="flex items-center gap-3">
  
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
  
            <Bell className="h-5 w-5" />
  
          </div>
  
          <div>
  
            <h4 className="font-medium text-sm">{title}</h4>
  
            <p className="text-sm text-gray-500">{description}</p>
  
            <p className="text-xs text-gray-400 mt-1">{time}</p>
  
          </div>
  
        </div>
  
      </div>
  
    );
  
  }