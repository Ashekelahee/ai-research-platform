export default function ForestBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      style={{ pointerEvents: 'none' }}
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e8f4f8', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#d4e9f0', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#c0dce8', stopOpacity: 1 }} />
        </linearGradient>
        
        <linearGradient id="forestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2d5a3d', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#1a3a24', stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>

      {/* Sky background */}
      <rect width="1200" height="800" fill="url(#skyGradient)" />

      {/* Distant mountains/hills */}
      <path d="M 0 500 Q 150 400 300 450 T 600 400 T 900 450 T 1200 400 L 1200 800 L 0 800 Z" 
            fill="#4a7c59" opacity="0.3" />

      {/* Mid-distance forest */}
      <path d="M 0 550 Q 100 480 200 520 T 400 500 T 600 480 T 800 510 T 1000 490 T 1200 520 L 1200 800 L 0 800 Z" 
            fill="#3d6b4f" opacity="0.5" />

      {/* Back tree layer - tall trees */}
      <g opacity="0.6">
        {/* Tree 1 */}
        <polygon points="100,600 60,700 140,700" fill="#2d5a3d" />
        <rect x="95" y="680" width="10" height="120" fill="#3d4a2e" />
        
        {/* Tree 2 */}
        <polygon points="250,620 200,720 300,720" fill="#2d5a3d" />
        <rect x="245" y="700" width="10" height="100" fill="#3d4a2e" />
        
        {/* Tree 3 */}
        <polygon points="450,600 400,710 500,710" fill="#2d5a3d" />
        <rect x="445" y="690" width="10" height="110" fill="#3d4a2e" />
        
        {/* Tree 4 */}
        <polygon points="700,630 640,740 760,740" fill="#2d5a3d" />
        <rect x="695" y="720" width="10" height="80" fill="#3d4a2e" />
        
        {/* Tree 5 */}
        <polygon points="950,610 900,720 1000,720" fill="#2d5a3d" />
        <rect x="945" y="700" width="10" height="100" fill="#3d4a2e" />
        
        {/* Tree 6 */}
        <polygon points="1100,640 1050,750 1150,750" fill="#2d5a3d" />
        <rect x="1095" y="730" width="10" height="70" fill="#3d4a2e" />
      </g>

      {/* Front tree layer - closer, larger trees */}
      <g opacity="0.8">
        {/* Large tree left */}
        <polygon points="80,680 0,800 160,800" fill="#22c55e" />
        <polygon points="80,680 20,760 140,760" fill="#16a34a" />
        <rect x="75" y="750" width="10" height="50" fill="#3d4a2e" />
        
        {/* Large tree center-left */}
        <polygon points="350,700 250,800 450,800" fill="#22c55e" />
        <polygon points="350,700 280,780 420,780" fill="#16a34a" />
        <rect x="345" y="770" width="10" height="30" fill="#3d4a2e" />
        
        {/* Large tree center-right */}
        <polygon points="800,690 680,800 920,800" fill="#22c55e" />
        <polygon points="800,690 720,770 880,770" fill="#16a34a" />
        <rect x="795" y="760" width="10" height="40" fill="#3d4a2e" />
        
        {/* Large tree right */}
        <polygon points="1100,710 980,800 1220,800" fill="#22c55e" />
        <polygon points="1100,710 1020,780 1180,780" fill="#16a34a" />
        <rect x="1095" y="770" width="10" height="30" fill="#3d4a2e" />
      </g>

      {/* Foreground shrubs and undergrowth */}
      <g opacity="0.7">
        <ellipse cx="150" cy="750" rx="80" ry="40" fill="#1a8c3d" />
        <ellipse cx="500" cy="760" rx="100" ry="35" fill="#1a8c3d" />
        <ellipse cx="900" cy="755" rx="90" ry="38" fill="#1a8c3d" />
        <ellipse cx="1100" cy="765" rx="70" ry="30" fill="#1a8c3d" />
      </g>

      {/* Light rays/sun glow effect */}
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="20%">
          <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 0.4 }} />
          <stop offset="100%" style={{ stopColor: '#fef3c7', stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <circle cx="600" cy="150" r="300" fill="url(#sunGlow)" />
    </svg>
  );
}
