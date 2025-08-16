import * as React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
    fallback?: string;
    className?: string;
    imgProps?: Omit<ImageProps, 'src' | 'alt' | 'className'>;
  }
>(({ 
  className, 
  src, 
  alt = "Profile",
  fallback = "i",
  imgProps = {},
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          {...imgProps}
        />
      ) : (
        <span className="m-auto font-medium text-gray-600">
          {fallback.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export { Avatar };
