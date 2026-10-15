"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface RingPhoto {
  src: string;
  alt: string;
  slug: string;
}

/** Serve textures through the Next image optimiser so they arrive small. */
const optimised = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=75`;

const RADIUS = 6.2;
const PANEL_H = 1.9;
const GAP = 0.09; // radians between panels

/**
 * A slowly turning ring of curved photo panels. Drag to spin it, hover a
 * panel to lift it, click to open that listing. The camera leans toward
 * the pointer and page scroll adds a little extra spin.
 */
export default function HeroRing({
  photos,
  onHover,
  active = true,
}: {
  photos: RingPhoto[];
  onHover?: (photo: RingPhoto | null) => void;
  /** Pause rendering while the hero is off screen. */
  active?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.4, 14.5], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0xffffff, 0)}
      style={{ touchAction: "pan-y" }}
    >
      <fog attach="fog" args={["#ffffff", 13, 22]} />
      <SceneBoundary>
        <Suspense fallback={null}>
          <Ring photos={photos} reduce={reduce} onHover={onHover} />
        </Suspense>
      </SceneBoundary>
    </Canvas>
  );
}

function Ring({
  photos,
  reduce,
  onHover,
}: {
  photos: RingPhoto[];
  reduce: boolean;
  onHover?: (photo: RingPhoto | null) => void;
}) {
  const router = useRouter();
  const textures = useLoader(
    THREE.TextureLoader,
    photos.map((p) => optimised(p.src)),
  );
  const group = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const { size, gl } = useThree();

  const count = photos.length;
  const arc = (Math.PI * 2) / count - GAP;
  const panelW = arc * RADIUS;

  // Motion state kept outside React to avoid re-renders every frame.
  const state = useRef({
    velocity: reduce ? 0 : 0.0016,
    base: reduce ? 0 : 0.0016,
    dragging: false,
    lastX: 0,
    moved: 0,
    lastScroll: 0,
    fade: 0,
  });
  const [hovered, setHovered] = useState<number | null>(null);

  const geometries = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const centre = (i / count) * Math.PI * 2;
        const geo = new THREE.PlaneGeometry(panelW, PANEL_H, 40, 1);
        const pos = geo.attributes.position;
        for (let v = 0; v < pos.count; v++) {
          const x = pos.getX(v);
          const angle = centre + x / RADIUS;
          pos.setXYZ(v, Math.sin(angle) * RADIUS, pos.getY(v), Math.cos(angle) * RADIUS);
        }
        geo.computeVertexNormals();
        return geo;
      }),
    [count, panelW],
  );

  // Crop every photo to the panel like CSS object-fit: cover.
  useMemo(() => {
    const panelAspect = panelW / PANEL_H;
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      const img = t.image as { width: number; height: number };
      const imgAspect = img.width / img.height;
      if (imgAspect > panelAspect) {
        t.repeat.set(panelAspect / imgAspect, 1);
        t.offset.set((1 - t.repeat.x) / 2, 0);
      } else {
        t.repeat.set(1, imgAspect / panelAspect);
        t.offset.set(0, (1 - t.repeat.y) / 2);
      }
      t.needsUpdate = true;
    });
  }, [textures, panelW]);

  // Shared rounded-corner mask so every panel reads as a soft card.
  const roundMask = useMemo(() => {
    const c = document.createElement("canvas");
    const w = 512;
    const h = Math.round((512 * PANEL_H) / panelW);
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.roundRect(0, 0, w, h, 34);
    ctx.fill();
    const t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    return t;
  }, [panelW]);

  const materials = useMemo(
    () =>
      textures.map(
        (map) =>
          new THREE.MeshBasicMaterial({
            map,
            alphaMap: roundMask,
            side: THREE.FrontSide,
            transparent: true,
            opacity: 0,
            toneMapped: false,
          }),
      ),
    [textures, roundMask],
  );

  // Drag to spin, with inertia. Listen on the canvas so page scroll still works.
  useEffect(() => {
    const el = gl.domElement;
    const s = state.current;
    const down = (e: PointerEvent) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.moved = 0;
    };
    const move = (e: PointerEvent) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      s.lastX = e.clientX;
      s.moved += Math.abs(dx);
      s.velocity = dx * 0.0032;
    };
    const up = () => {
      s.dragging = false;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  const scale = size.width < 640 ? 1.05 : size.width < 1024 ? 0.9 : 1;

  const frame = useRef(0);

  useFrame(({ pointer, events }, delta) => {
    const s = state.current;

    // Panels slide under a still pointer while the ring turns, so re-check
    // what the pointer is over a few times a second.
    if (++frame.current % 8 === 0) events.update?.();
    const g = group.current;
    const t = tilt.current;
    if (!g || !t) return;

    // Scroll adds a burst of spin that decays.
    const y = window.scrollY;
    const scrollDelta = y - s.lastScroll;
    s.lastScroll = y;
    if (!reduce) s.velocity += scrollDelta * 0.00006;

    if (!s.dragging) s.velocity += (s.base - s.velocity) * Math.min(1, delta * 1.6);
    g.rotation.y += s.velocity;

    // Lean toward the pointer.
    if (!reduce) {
      t.rotation.x += (0.16 - pointer.y * 0.08 - t.rotation.x) * 0.05;
      t.rotation.z += (-0.06 + pointer.x * 0.03 - t.rotation.z) * 0.05;
    }

    // Fade in once textures are ready.
    s.fade = Math.min(1, s.fade + delta * 0.9);
    materials.forEach((m) => (m.opacity = s.fade));
  });

  return (
    <group ref={tilt} rotation={[0.16, 0, -0.06]} position={[0, 0.15, 0]} scale={scale}>
      <group ref={group}>
        {geometries.map((geo, i) => (
          <Panel
            key={i}
            geometry={geo}
            material={materials[i]}
            active={hovered === i}
            onOver={() => {
              setHovered(i);
              onHover?.(photos[i]);
            }}
            onOut={() => {
              setHovered((h) => (h === i ? null : h));
              onHover?.(null);
            }}
            onClick={() => {
              if (state.current.moved < 6) router.push(`/properties/${photos[i].slug}`);
            }}
          />
        ))}
      </group>
    </group>
  );
}

function Panel({
  geometry,
  material,
  active,
  onOver,
  onOut,
  onClick,
}: {
  geometry: THREE.BufferGeometry;
  material: THREE.MeshBasicMaterial;
  active: boolean;
  onOver: () => void;
  onOut: () => void;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const target = active ? 1.06 : 1;
    m.scale.x += (target - m.scale.x) * 0.12;
    m.scale.y = m.scale.z = m.scale.x;
  });
  return (
    <mesh
      ref={ref}
      geometry={geometry}
      material={material}
      onPointerOver={(e) => {
        e.stopPropagation();
        onOver();
      }}
      onPointerOut={onOut}
      onClick={onClick}
    />
  );
}

/** If a photo fails to load, drop the ring quietly instead of breaking the page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
