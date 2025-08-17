'use client';

import Image, { ImageProps } from 'next/image';
import { IMAGES } from '@/lib/images';

export default function SafeImage({
  src,
  alt,
  onError,
  ...props
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = IMAGES.placeholder;
        target.onerror = null;
      }}
      {...props}
    />
  );
}
