import { Link } from "@inertiajs/react";

export default function UserPage({ auth }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Welcome, {auth.user.name}!</h1>
            <Link href="/logout" method="post" as="button" className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
                Logout
            </Link>
        </div>
    );
}
