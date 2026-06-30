export default function Loading() {
  return (
    <main className="bg-background min-h-screen pt-24 px-4 md:px-16 max-w-[1440px] mx-auto pb-24">
      <div className="flex gap-3 mb-10 border-b border-outline-variant/40 pb-4">
        {[1,2,3,4,5].map(i => <div key={i} className="h-9 w-24 bg-surface-container-low rounded animate-pulse" />)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-surface-container-low rounded animate-pulse" />)}
      </div>
      <div className="h-96 bg-surface-container-low rounded animate-pulse" />
    </main>
  );
}