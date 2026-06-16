export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">🚧 Coming Soon</h1>

        <p className="text-lg text-gray-600 max-w-md mx-auto">
          We are working hard to bring this feature to life. Stay tuned for
          exciting updates!
        </p>

        <div className="mt-8">
          <button
            disabled
            className="px-6 py-3 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
          >
            Under Development
          </button>
        </div>
      </div>
    </div>
  );
}
