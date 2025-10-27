export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center space-y-3">
        <p className="text-xl md:text-2xl font-sans font-medium text-foreground animate-pulse">
          Redirecting to your dashboard...
        </p>
        <div className="flex justify-center">
          <div className="w-6 h-6 border-4 border-t-transparent border-foreground rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}
