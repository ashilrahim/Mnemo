
const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="p-8 rounded-2xl shadow-lg text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-2">🎉 Quiz Complete!</h2>
          <p className="text-xl mb-4">
            Your Score: <span className="font-extrabold">5</span> / 10
          </p>
          <button
            
            className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
  )
}

export default page