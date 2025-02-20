import React from "react";
import { usePage } from "@inertiajs/react";


export default function Profile() {
    const { user } = usePage().props;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Last Login:</strong> {user.last_login}</p>
        </div>
    );
}
