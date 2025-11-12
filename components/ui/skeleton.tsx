export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-(--color-surface) via-(--color-surface-light) to-(--color-surface) ${className}`}
    />
  )
}
