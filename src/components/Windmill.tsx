import { motion } from "framer-motion";

interface WindmillProps {
  size?: number;
  duration?: number;
  className?: string;
}

export default function Windmill({ size = 80, duration = 15, className = "" }: WindmillProps) {
  const bladeLength = size * 0.42;
  const cx = size / 2;
  const cy = size * 0.38;
  const baseTop = cy + size * 0.04;
  const baseBottomLeft = size * 0.38;
  const baseBottomRight = size * 0.62;
  const baseBottom = size * 0.95;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      fill="none"
    >
      {/* Tower / base */}
      <polygon
        points={`${cx - size * 0.03},${baseTop} ${cx + size * 0.03},${baseTop} ${baseBottomRight},${baseBottom} ${baseBottomLeft},${baseBottom}`}
        fill="hsl(82 30% 25%)"
        opacity="0.8"
      />
      {/* Platform line */}
      <rect
        x={baseBottomLeft - size * 0.05}
        y={baseBottom - size * 0.02}
        width={size * 0.34}
        height={size * 0.025}
        rx={2}
        fill="hsl(82 25% 20%)"
        opacity="0.6"
      />

      {/* Rotating blades group */}
      <motion.g
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[0, 90, 180, 270].map((angle) => (
          <g key={angle} transform={`rotate(${angle} ${cx} ${cy})`}>
            <ellipse
              cx={cx}
              cy={cy - bladeLength * 0.55}
              rx={size * 0.045}
              ry={bladeLength * 0.5}
              fill="hsl(45 90% 55%)"
              opacity="0.7"
            />
          </g>
        ))}
        {/* Center hub */}
        <circle cx={cx} cy={cy} r={size * 0.05} fill="hsl(45 80% 50%)" opacity="0.9" />
      </motion.g>
    </svg>
  );
}
