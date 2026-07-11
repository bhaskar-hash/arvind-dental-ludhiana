'use client';

import { useState, useRef, MouseEvent, TouchEvent } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title: string;
  description: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After Treatment',
  title,
  description,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="bg-luxury-900 border border-gold-400/10 rounded-[2rem] p-6 shadow-xl flex flex-col md:flex-row gap-6 items-center luxury-glow">
      {/* Visual Slider */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-800 shadow-inner flex-shrink-0"
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="After treatment"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute right-4 bottom-4 bg-gold-600/90 text-white text-[10px] px-2.5 py-1 rounded font-semibold tracking-widest uppercase backdrop-blur-sm z-20 font-display">
          {afterLabel}
        </div>

        {/* Before Image (Overlayed) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden z-10"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before treatment"
            className="absolute inset-0 w-[420px] h-full object-cover max-w-none pointer-events-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
          />
          <div className="absolute left-4 bottom-4 bg-luxury-950/95 text-slate-400 text-[10px] px-2.5 py-1 rounded font-semibold tracking-widest uppercase backdrop-blur-sm">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Handle Line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-gold-400/80 z-30 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="h-9 w-9 bg-luxury-950 text-gold-400 rounded-full flex items-center justify-center shadow-2xl border border-gold-400/30 pointer-events-none font-bold text-xs select-none">
            ↔
          </div>
        </div>
      </div>

      {/* Info Block */}
      <div className="flex-1 space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-gold-450">
          Clinical Case Showcase
        </span>
        <h4 className="text-xl font-bold text-white leading-snug font-display">{title}</h4>
        <p className="text-sm text-slate-405 leading-relaxed font-light">{description}</p>
        <div className="pt-2 flex items-center text-xs text-slate-500 space-x-4">
          <span className="flex items-center font-light">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 flex-shrink-0"></span>
            Laser Tissue Contouring
          </span>
          <span className="flex items-center font-light">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mr-2 flex-shrink-0"></span>
            7-Day Expat Rehab
          </span>
        </div>
      </div>
    </div>
  );
}

