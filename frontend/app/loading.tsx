export default function Loading() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center gap-6">
      {/* Logo pulse */}
      <div className="animate-pulse">
        <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
          <polygon points="18,2 32,10 32,26 18,34 4,26 4,10" fill="var(--color-surface-container-low)" stroke="#994700" strokeWidth="1.5"/>
          <circle cx="18" cy="17" r="4" fill="none" stroke="#994700" strokeWidth="1.5"/>
          <circle cx="18" cy="17" r="1.5" fill="#994700"/>
        </svg>
      </div>
      {/* Copper loading bar */}
      <div className="w-48 h-[2px] bg-surface-container-low overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{
            animation: "loading-bar 1.5s ease-in-out infinite",
            width: "40%",
          }}
        />
      </div>
      <p className="text-xs text-outline tracking-[0.3em]" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
        RAREWOODS CREW
      </p>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}
