import type { ComponentType } from 'react';

// ============================================================
// EASTER EGG REGISTRY
// Each egg is self-contained below — component + styles in one place.
// To disable: set active: false
// To add a new egg: write the component below, add an entry to EASTER_EGGS
// ============================================================

// ── Pride Rainbow ────────────────────────────────────────────
const prideGlideStyle = `
@keyframes pride-glide {
  0%   { transform: rotate(-35deg) translateY(-120%); opacity: 0; }
  15%  { opacity: 0.28; }
  85%  { opacity: 0.28; }
  100% { transform: rotate(-35deg) translateY(800%); opacity: 0; }
}
@keyframes pride-glide-mobile {
  0%   { transform: rotate(-45deg) translateY(-120%); opacity: 0; }
  15%  { opacity: 0.32; }
  85%  { opacity: 0.32; }
  100% { transform: rotate(-45deg) translateY(600%); opacity: 0; }
}
.pride-rainbow {
  position: fixed;
  top: -20vh; left: -80vw;
  width: 260vw; height: 22vh;
  display: flex; flex-direction: column;
  transform: rotate(-35deg);
  transform-origin: center center;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.28;
  animation: pride-glide 3.5s cubic-bezier(0.4,0,0.2,1) forwards;
}
@media (max-width: 600px) {
  .pride-rainbow {
    top: -10vh; left: -50vw;
    width: 200vw; height: 18vh;
    animation: pride-glide-mobile 3.5s cubic-bezier(0.4,0,0.2,1) forwards;
  }
}`;

function PrideRainbow() {
  const colors = ['#FF0018', '#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D'];
  return (
    <>
      <style>{prideGlideStyle}</style>
      <div className="pride-rainbow" aria-hidden="true">
        {colors.map(c => (
          <div key={c} style={{ flex: 1, background: c }} />
        ))}
      </div>
    </>
  );
}
// ─────────────────────────────────────────────────────────────

// Add new eggs above this line, then register them below ↓

interface EasterEgg {
  id: string;
  component: ComponentType;
  active: boolean;
}

const EASTER_EGGS: EasterEgg[] = [
  { id: 'pride-rainbow', component: PrideRainbow, active: false },
  // { id: 'my-next-egg', component: MyNextEgg, active: false },
];

export default EASTER_EGGS;
