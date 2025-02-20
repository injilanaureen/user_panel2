import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function ChangePassword() {
    const { data, setData, post, errors } = useForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/change-password");
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">Change Password</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <div>
                    <label className="block">Current Password</label>
                    <input type="password" value={data.current_password} onChange={(e) => setData("current_password", e.target.value)} className="border p-2 w-full" />
                    {errors.current_password && <p className="text-red-500">{errors.current_password}</p>}
                </div>

                <div>
                    <label className="block">New Password</label>
                    <input type="password" value={data.new_password} onChange={(e) => setData("new_password", e.target.value)} className="border p-2 w-full" />
                    {errors.new_password && <p className="text-red-500">{errors.new_password}</p>}
                </div>

                <div>
                    <label className="block">Confirm New Password</label>
                    <input type="password" value={data.new_password_confirmation} onChange={(e) => setData("new_password_confirmation", e.target.value)} className="border p-2 w-full" />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Update Password</button>
            </form>
        </div>
    );
}
