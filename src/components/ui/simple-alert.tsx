import { AlertCircle, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "default" | "destructive" | "success";

interface SimpleAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  message: string;
  onClose?: () => void;
}

export function SimpleAlert({ 
  variant = "default", 
  message, 
  className,
  onClose,
  ...props 
}: SimpleAlertProps) {
  const variants = {
    default: "bg-blue-50 text-blue-800 border-blue-200",
    destructive: "bg-red-50 text-red-800 border-red-200",
    success: "bg-green-50 text-green-800 border-green-200",
  };

  const icons = {
    default: <AlertCircle className="h-4 w-4" />,
    destructive: <AlertCircle className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />,
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 p-4 mb-4 border rounded-md",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0">
        {icons[variant]}
      </div>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 -mr-1 -mt-1 text-current hover:opacity-70"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function SimpleAlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-1 text-sm opacity-90", className)}
      {...props}
    />
  );
}
