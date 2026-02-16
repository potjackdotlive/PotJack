"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useAnimationFrame } from "motion/react";
import { useMousePosition } from "pages/Play/components/Hero/components/Coins/useMousePosition";

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
  unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

interface FloatingProps {
  children: ReactNode;
  className?: string;
  sensitivity?: number;
  easingFactor?: number;
}

export const Floating = ({ children, className, sensitivity = 1, easingFactor = 0.05, ...props }: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement;
        depth: number;
        currentPosition: { x: number; y: number; z: number };
      }
    >(),
  );
  const mousePositionRef = useMousePosition(containerRef);

  const registerElement = useCallback((id: string, element: HTMLDivElement, depth: number) => {
    elementsMap.current.set(id, {
      element,
      depth,
      currentPosition: { x: 0, y: 0, z: 0 },
    });
  }, []);

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id);
  }, []);

  useAnimationFrame(() => {
    // if (import.meta.env.DEV || !containerRef.current) return;
    if (!containerRef.current) return;

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20;

      // Calculate new target position
      const newTargetX = mousePositionRef.x * strength;
      const newTargetY = mousePositionRef.y * strength;
      const newTargetZ = (newTargetX - newTargetY * 2) * sensitivity; // negative to push into the screen

      // Check if we need to update
      const dx = newTargetX - data.currentPosition.x;
      const dy = newTargetY - data.currentPosition.y;
      const dz = newTargetZ - (data.currentPosition.z ?? 0);

      // Update position only if we're still moving
      data.currentPosition.x += dx * easingFactor;
      data.currentPosition.y += dy * easingFactor;
      data.currentPosition.z += dz * easingFactor;

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, ${data.currentPosition.z}px)`;
    });
  });

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: -1;
          perspective: 50px;
        `}
        className={className}
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  );
};

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export const FloatingElement = ({ children, className, depth = 1 }: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(FloatingContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;

    const nonNullDepth = depth ?? 0.01;

    context.registerElement(idRef.current, elementRef.current, nonNullDepth);
    return () => context.unregisterElement(idRef.current);
  }, [depth]);

  return (
    <div
      ref={elementRef}
      css={css`
        position: absolute;
        will-change: transform;
        transform-style: preserve-3d;
      `}
      className={className}
    >
      {children}
    </div>
  );
};
