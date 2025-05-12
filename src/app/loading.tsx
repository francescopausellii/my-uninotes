import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  message?: string;
}

export default function Loading({
  className,
  message = "Caricamento...",
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-10",
        className,
      )}
    >
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      {message}
    </div>
  );
}
