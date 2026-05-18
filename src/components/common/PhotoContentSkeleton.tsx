// components/lines/PhotoContentSkeleton.tsx

export default function PhotoContentSkeleton() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-white/10">
      <div className="absolute inset-0 animate-pulse bg-white/10" />

      <div className="absolute left-6 top-6 h-8 w-32 animate-pulse rounded-full bg-white/20" />

      <div className="absolute bottom-6 left-6 right-6 space-y-3">
        <div className="h-8 w-3/4 animate-pulse rounded-full bg-white/25" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-white/15" />
      </div>
    </div>
  );
}