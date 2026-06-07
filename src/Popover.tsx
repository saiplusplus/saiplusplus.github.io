import { useState, useRef, useEffect } from 'react';
import './Popover.css';

interface PopoverProps {
  label: string;           // the trigger word
  items?: string[];        // list of text items (optional)
  image?: string;          // image src to show instead of a list (optional)
  imageAlt?: string;       // alt text for the image
  className?: string;
}

export default function Popover({ label, items, image, imageAlt, className }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Detect touch device — skip hover behaviour on touch screens
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  // Close when tapping/clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open]);

  // Clamp popover so it never overflows the viewport edges
  useEffect(() => {
    if (!open || !boxRef.current) return;
    const box = boxRef.current;
    const rect = box.getBoundingClientRect();
    const padding = 12; // min gap from screen edge

    if (rect.right > window.innerWidth - padding) {
      const overflow = rect.right - (window.innerWidth - padding);
      box.style.transform = `translateX(calc(-50% - ${overflow}px))`;
    } else if (rect.left < padding) {
      const overflow = padding - rect.left;
      box.style.transform = `translateX(calc(-50% + ${overflow}px))`;
    }
  }, [open]);

  const hoverProps = isTouch ? {} : {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
  };

  const boxHoverProps = isTouch ? {} : {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
  };

  return (
    <span className={`popover-wrap ${className ?? ''}`} ref={ref}>
      <span
        className="popover-trigger"
        onClick={() => setOpen(o => !o)}
        {...hoverProps}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(o => !o)}
        aria-expanded={open}
      >
        {label}
        <span className="popover-caret" aria-hidden="true">↗</span>
      </span>

      {open && (
        <div
          ref={boxRef}
          className="popover-box"
          {...boxHoverProps}
          role="tooltip"
        >
          {image ? (
            <img src={image} alt={imageAlt ?? label} className="popover-image" />
          ) : (
            <ul className="popover-list">
              {items?.map((item, i) => (
                <li key={i} className="popover-item">{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </span>
  );
}
