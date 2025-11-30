"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { useState } from "react";

export default function NextImageClient(props: ImageProps) {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc("/fallback.png")}
    />
  );
}
