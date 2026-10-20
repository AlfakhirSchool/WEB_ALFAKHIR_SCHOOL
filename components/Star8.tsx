type Props = { size?: number; className?: string; stroke?: string; fill?: string; strokeWidth?: number; fill2?: string };
/** 8-point star (Rub el Hizb): two overlapping squares, the second rotated 45deg. */
export function Star8({ size = 48, className, stroke = "none", fill = "currentColor", fill2, strokeWidth = 2 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect x="15" y="15" width="70" height="70" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <rect x="15" y="15" width="70" height="70" fill={fill2 ?? fill} stroke={stroke} strokeWidth={strokeWidth} transform="rotate(45 50 50)" />
    </svg>
  );
}
