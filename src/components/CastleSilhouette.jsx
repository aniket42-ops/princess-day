/** Original fairytale castle SVG — no copyrighted characters */
export default function CastleSilhouette({ className = '', variant = 'full' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Magical fairytale castle"
    >
      <defs>
        <linearGradient id="castleGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4e4bc" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7b2f" />
        </linearGradient>
        <linearGradient id="castleWall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5eef8" />
          <stop offset="100%" stopColor="#dcc9e8" />
        </linearGradient>
        <filter id="castleGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {variant === 'full' && (
        <ellipse cx="400" cy="300" rx="380" ry="40" fill="#e8ddf5" opacity="0.5" />
      )}
      <g filter="url(#castleGlow)">
        <path
          d="M120 280V180h40v40h20V140h30l15-50 15 50h30v80h20v60H120z"
          fill="url(#castleWall)"
          stroke="#c9b8d9"
          strokeWidth="1"
        />
        <path
          d="M250 280V160h35v30h15V100h25l12-40 12 40h25v90h15v50H250z"
          fill="url(#castleWall)"
        />
        <rect x="320" y="120" width="160" height="160" rx="4" fill="url(#castleWall)" />
        <path d="M360 120V70h40v50M440 120V70h40v50" stroke="url(#castleGold)" strokeWidth="6" />
        <path d="M400 70L385 30h30L400 70zM400 70L415 30H385" fill="url(#castleGold)" />
        <rect x="370" y="180" width="60" height="100" rx="30" fill="#5c4a6e" opacity="0.35" />
        <path
          d="M480 280V150h40v40h25V90h30l18-55 18 55h30v110h20v45H480z"
          fill="url(#castleWall)"
        />
        <path
          d="M620 280V170h45v35h20V120h28l14-45 14 45h28v85h18v60H620z"
          fill="url(#castleWall)"
        />
        {variant === 'full' && (
          <>
            <circle cx="200" cy="95" r="4" fill="#ffeaa7" className="animate-pulse" />
            <circle cx="400" cy="55" r="5" fill="#fff8dc" />
            <circle cx="600" cy="100" r="4" fill="#ffeaa7" />
          </>
        )}
      </g>
    </svg>
  )
}