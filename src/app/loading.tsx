"use client";

import React from "react";

interface LoadingProps {
  /**
   * Testo da mostrare sotto lo spinner
   */
  text?: string;
  /**
   * Dimensione del componente di loading
   */
  size?: "small" | "medium" | "large";
  /**
   * Se true, mostra un bordo attorno al componente
   */
  withBorder?: boolean;
  /**
   * Se true, mostra un'ombra neobrutalist
   */
  withShadow?: boolean;
  /**
   * Colore personalizzato (usa le variabili CSS)
   */
  color?: string;
  /**
   * Classe CSS aggiuntiva
   */
  className?: string;
}

export function Loading({
  text = "Caricamento in corso...",
  size = "medium",
  withBorder = true,
  withShadow = true,
  color,
  className = "",
}: LoadingProps) {
  // Determina le dimensioni in base alla prop size
  const sizeMap = {
    small: {
      container: "p-2",
      spinner: "w-6 h-6 border-2",
      text: "text-sm mt-1",
    },
    medium: {
      container: "p-4",
      spinner: "w-12 h-12 border-3",
      text: "text-base mt-2",
    },
    large: {
      container: "p-6",
      spinner: "w-16 h-16 border-4",
      text: "text-lg mt-3",
    },
  };

  const selectedSize = sizeMap[size];

  // Stile per il contenitore
  const containerClasses = [
    "flex flex-col items-center justify-center",
    selectedSize.container,
    withBorder ? "border-2 border-black rounded" : "",
    withShadow ? "shadow-neo" : "",
    color ? "" : "bg-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Stile per lo spinner
  const spinnerClasses = [
    selectedSize.spinner,
    "rounded-full border-black",
    "border-t-transparent",
    "animate-spin",
  ]
    .filter(Boolean)
    .join(" ");

  // Stile per il testo
  const textClasses = [
    selectedSize.text,
    "font-bold",
    color ? "" : "text-primary-foreground",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={containerClasses}
      style={color ? { backgroundColor: color } : {}}
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        {/* Spinner principale */}
        <div className={spinnerClasses}></div>

        {/* Elemento decorativo neobrutalist */}
        <div className="absolute top-[-4px] left-[-4px] w-3 h-3 bg-secondary border-2 border-black"></div>
      </div>

      {text && <div className={textClasses}>{text}</div>}

      <span className="sr-only">Caricamento in corso</span>
    </div>
  );
}

/**
 * Variante fullscreen del componente Loading
 */
export default function LoadingFullscreen({
  text = "Caricamento in corso...",
  color,
}: {
  text?: string;
  color?: string;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative">
        <Loading
          text={text}
          size="large"
          withBorder={true}
          withShadow={true}
          color={color}
        />
      </div>
    </div>
  );
}
