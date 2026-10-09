import type { Container, Particle } from "@tsparticles/engine";

// Раскол: наведённая мышью звезда исчезает, а на её месте разлетаются три новых.
// Чтобы общее число звёзд не росло, вдали от курсора две самые тусклые пропадают.
const HIT_PADDING = 49; // насколько близко курсор должен подойти к звезде, px
const FAR_DISTANCE = 280; // исчезать могут только звёзды дальше этого от курсора, px
const STAR_COOLDOWN_MS = 300; // сколько новорождённый осколок не раскалывается
const MIN_GAP_MS = 100; // не чаще одного раскола в этот интервал на всё небо
const POINTER_CHECK_MS = 30; // как часто вообще проверяем попадание курсора в звезду
const CHIPS_COUNT = 3;
const REMOVED_COUNT = CHIPS_COUNT - 1; // -1 исходная, +3 осколка, -2 далёкие = 0
const CHIP_BURST = 6; // стартовая скорость осколка, дальше он плавно замедляется

// Блуждание и разбегание. Раз в тик каждая звезда чуть поворачивает в случайную сторону,
// поэтому летят по извилистым путям. А чем плотнее вокруг неё звёзды, тем быстрее
// она убегает от соседей. Скорость не падает ниже собственной обычной.
const TICK_MS = 150;
const WANDER_ANGLE = 0.5; // максимальный случайный поворот за тик, рад
const CROWD_RADIUS = 200; // «соседи» — звёзды ближе этого, px
const CROWD_MAX_BOOST = 13.6; // во сколько раз максимум разгоняется звезда в гуще
const CROWD_DEAD_ZONE = 1.2; // во сколько раз плотнее нормы начинается «гуща»
const CROWD_GAIN = 6.8; // насколько сильно разгон растёт с плотностью
const FLEE_STEER = 0.35; // какая доля разворота «от соседей» применяется за тик
const SPEED_EASE = 0.7; // доля разницы скоростей, остающаяся за тик (плавный разгон/торможение)
const MIN_BASE_SPEED = 0.3; // звёзды с почти нулевой скоростью подтягиваем, чтобы не стояли

// Кратчайшая разница между двумя углами, рад.
const angleDiff = (from: number, to: number) =>
  Math.atan2(Math.sin(to - from), Math.cos(to - from));

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const attachStarBehavior = (container: Container, root: HTMLElement) => {
  const cooldowns = new WeakMap<Particle, number>();
  // Собственная обычная скорость каждой звезды: от неё считаем разгон.
  const baseSpeeds = new WeakMap<Particle, number>();
  let lastSplitAt = 0;
  // Буферы тика переиспользуем: каждые 150 мс новые массивы — лишний мусор для GC.
  const stars: Particle[] = [];
  let cells: Particle[][] = [];
  let lastCheckAt = 0;

  // Размеры кэшируем: getBoundingClientRect на каждое движение мыши дёргал бы раскладку.
  // Координаты частиц — в пикселях канваса, а у курсора — в CSS-пикселях.
  let rect = root.getBoundingClientRect();
  let scale = container.canvas.size.width / rect.width;
  const refreshMetrics = () => {
    rect = root.getBoundingClientRect();
    scale = container.canvas.size.width / rect.width;
  };

  const handlePointerMove = (event: PointerEvent) => {
    const now = performance.now();
    if (
      container.destroyed ||
      now - lastCheckAt < POINTER_CHECK_MS ||
      now - lastSplitAt < MIN_GAP_MS
    ) {
      return;
    }
    lastCheckAt = now;

    const x = (event.clientX - rect.left) * scale;
    const y = (event.clientY - rect.top) * scale;
    const distanceToCursor = (particle: Particle) =>
      Math.hypot(particle.position.x - x, particle.position.y - y);

    const star = container.particles.find((particle) => {
      const isCooling =
        now - (cooldowns.get(particle) ?? -STAR_COOLDOWN_MS) < STAR_COOLDOWN_MS;
      return (
        !isCooling &&
        distanceToCursor(particle) <= particle.getRadius() + HIT_PADDING * scale
      );
    });
    if (!star) {
      return;
    }

    // Исчезают самые тусклые из далёких: в момент минимального мерцания это незаметно.
    const fading = container.particles
      .filter(
        (particle) =>
          particle !== star &&
          distanceToCursor(particle) > FAR_DISTANCE * scale,
      )
      .sort((a, b) => a.getOpacity().opacity - b.getOpacity().opacity)
      .slice(0, REMOVED_COUNT);
    if (fading.length < REMOVED_COUNT) {
      return;
    }

    lastSplitAt = now;

    const startAngle = Math.random() * Math.PI * 2;
    for (let index = 0; index < CHIPS_COUNT; index++) {
      const direction = startAngle + (index * Math.PI * 2) / CHIPS_COUNT;
      const chip = container.particles.addParticle({
        x: star.position.x,
        y: star.position.y,
      });
      if (chip) {
        chip.velocity.x = Math.cos(direction) * CHIP_BURST;
        chip.velocity.y = Math.sin(direction) * CHIP_BURST;
        baseSpeeds.set(
          chip,
          MIN_BASE_SPEED + Math.random() * (1 - MIN_BASE_SPEED),
        );
        cooldowns.set(chip, now);
      }
    }

    container.particles.remove(star);
    fading.forEach((particle) => container.particles.remove(particle));
  };

  const tick = () => {
    // Вкладка скрыта — звёзд никто не видит, считать нечего.
    if (container.destroyed || container.pageHidden || document.hidden) {
      return;
    }

    refreshMetrics();

    stars.length = 0;
    for (let index = 0; index < container.particles.count; index++) {
      const star = container.particles.get(index);
      if (star && !star.destroyed) {
        stars.push(star);
      }
    }
    if (stars.length === 0) {
      return;
    }

    const radius = CROWD_RADIUS * scale;
    const radiusSquared = radius * radius;
    const { width, height } = container.canvas.size;
    // Сколько соседей было бы у звезды при равномерном разбросе — с этим сравниваем.
    const expectedNeighbors =
      (stars.length * Math.PI * radiusSquared) / (width * height);

    // Сетка с ячейкой размером в радиус: соседей ищем только в 9 ячейках вокруг,
    // а не перебираем все звёзды между собой.
    const columns = Math.floor(width / radius) + 1;
    const rows = Math.floor(height / radius) + 1;
    if (cells.length === columns * rows) {
      cells.forEach((cell) => {
        cell.length = 0;
      });
    } else {
      cells = Array.from({ length: columns * rows }, () => []);
    }
    const columnOf = (star: Particle) =>
      clamp(Math.floor(star.position.x / radius), 0, columns - 1);
    const rowOf = (star: Particle) =>
      clamp(Math.floor(star.position.y / radius), 0, rows - 1);
    for (const star of stars) {
      cells[rowOf(star) * columns + columnOf(star)].push(star);
    }

    for (const star of stars) {
      const column = columnOf(star);
      const row = rowOf(star);
      let neighbors = 0;
      let awayX = 0;
      let awayY = 0;

      for (
        let r = Math.max(row - 1, 0);
        r <= Math.min(row + 1, rows - 1);
        r++
      ) {
        for (
          let c = Math.max(column - 1, 0);
          c <= Math.min(column + 1, columns - 1);
          c++
        ) {
          for (const other of cells[r * columns + c]) {
            if (other === star) {
              continue;
            }
            const dx = star.position.x - other.position.x;
            const dy = star.position.y - other.position.y;
            if (dx * dx + dy * dy < radiusSquared) {
              neighbors++;
              awayX += dx;
              awayY += dy;
            }
          }
        }
      }

      const velocity = star.velocity;
      let baseSpeed = baseSpeeds.get(star);
      if (baseSpeed === undefined) {
        baseSpeed = Math.max(velocity.length, MIN_BASE_SPEED);
        baseSpeeds.set(star, baseSpeed);
      }

      // 1 — обычная плотность или реже (скорость обычная). Случайные колебания
      // плотности (до CROWD_DEAD_ZONE от нормы) игнорируем, разгон начинается с настоящей гущи.
      const density = neighbors / expectedNeighbors;
      const crowding = clamp(
        1 + (density - CROWD_DEAD_ZONE) * CROWD_GAIN,
        1,
        CROWD_MAX_BOOST,
      );

      velocity.angle += (Math.random() - 0.5) * 2 * WANDER_ANGLE;
      if (crowding > 1 && (awayX !== 0 || awayY !== 0)) {
        velocity.angle +=
          angleDiff(velocity.angle, Math.atan2(awayY, awayX)) * FLEE_STEER;
      }

      const targetSpeed = baseSpeed * crowding;
      velocity.length =
        targetSpeed + (velocity.length - targetSpeed) * SPEED_EASE;
    }
  };

  const timer = window.setInterval(tick, TICK_MS);
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("resize", refreshMetrics);

  return () => {
    window.clearInterval(timer);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("resize", refreshMetrics);
  };
};
