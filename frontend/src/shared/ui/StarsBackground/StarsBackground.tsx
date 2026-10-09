"use client";

import dynamic from "next/dynamic";

// Библиотека частиц тянется отдельным чанком и только когда фон реально показан,
// а не в каждый бандл, который импортирует shared/ui.
export const StarsBackground = dynamic(
  () => import("./StarsLayer").then((module) => module.StarsLayer),
  { ssr: false },
);
