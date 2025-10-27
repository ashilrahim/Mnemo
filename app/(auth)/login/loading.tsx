import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center space-y-3">
        <p className="text-xl md:text-2xl font-sans font-medium text-foreground animate-pulse">
          Redirecting to your dashboard...
        </p>
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    </div>
  );
}

