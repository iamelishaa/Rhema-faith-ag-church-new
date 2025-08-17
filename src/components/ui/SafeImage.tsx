'use client';

import { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { IMAGES } from '@/lib/images';

export default function SafeImage({
  src,
  alt,
  onError,
  ...props
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src as string);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Only update the src if it's different from the placeholder to prevent infinite loops
    if (imgSrc !== IMAGES.placeholder) {
      setImgSrc(IMAGES.placeholder);
    }
    onError?.(e);
  };

  // Don't render anything during SSR to avoid hydration mismatches
  if (!isMounted) {
    return null;
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || ''}
      onError={handleError}
      unoptimized={process.env.NODE_ENV === 'production'}
      {...props}
    />
  );
}
