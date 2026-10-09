"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/src/shared/theme";
import { attachStarBehavior } from "./starBehavior";
import styles from "./StarsBackground.module.css";

const STARS_ID = "stars-background";

// Должна быть стабильной ссылкой на всё время жизни приложения (требование провайдера).
const initEngine = async (engine: Engine) => {
  await loadSlim(engine);
};

const readCssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// Мерцающее звёздное небо. Цвет звёзд — токен --color-star:
// чёрные в светлой теме, белые в тёмной.
const buildOptions = (starColor: string): ISourceOptions => {
  const isMotionReduced = matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return {
    fullScreen: { enable: false },
    fpsLimit: 45,
    detectRetina: true,
    particles: {
      number: { value: 170, density: { enable: true } },
      // В версии 4 цвет задаётся через paint (старое particles.color игнорируется,
      // и звёзды становятся белыми — в светлой теме их просто не видно).
      paint: { fill: { enable: true, color: { value: starColor } } },
      links: { enable: false },
      move: {
        enable: !isMotionReduced,
        speed: 0.6,
        random: true,
        outModes: { default: "out" },
      },
      opacity: {
        value: { min: 0.4, max: 1 },
        animation: { enable: !isMotionReduced, speed: 0.6, sync: false },
      },
      size: { value: { min: 1.19, max: 3.56 } },
    },
  };
};

export const StarsLayer = () => {
  // Подписка на тему: при её смене компонент перерисуется и цвет перечитается.
  useTheme();

  // Canvas не понимает var(--...), поэтому цвет читаем из токена руками.
  const starColor = readCssVar("--color-star");
  const options = useMemo(() => buildOptions(starColor), [starColor]);

  // Обработчик мыши живёт, пока жив контейнер частиц; при перезагрузке
  // (смена темы) старый снимаем, на новый вешаем заново.
  const disposeRef = useRef<(() => void) | null>(null);

  const handleLoaded = useCallback((container?: Container) => {
    disposeRef.current?.();
    disposeRef.current = null;

    const root = document.getElementById(STARS_ID);
    if (container && root) {
      disposeRef.current = attachStarBehavior(container, root);
    }
  }, []);

  useEffect(() => () => disposeRef.current?.(), []);

  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id={STARS_ID}
        className={styles.root}
        options={options}
        particlesLoaded={handleLoaded}
      />
    </ParticlesProvider>
  );
};
