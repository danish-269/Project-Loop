import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">

        <div className="text-6xl mb-4">🚫</div>

        <h1 className="text-3xl font-bold text-red-600">
          Access Denied
        </h1>

        <p className="mt-4 text-gray-600">
          You don't have permission to access this page.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Go Back
        </Link>

      </div>
    </div>
  );
}