export default function Loading() {
  return (
    <main className="bg-background min-h-screen pt-40 px-4 md:px-16 max-w-[1440px] mx-auto pb-24">
      <div className="h-6 w-32 bg-surface-container-low rounded mb-3 animate-pulse" />
      <div className="h-12 w-72 bg-surface-container-low rounded mb-10 animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-surface-container-low rounded animate-pulse" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="h-64 bg-surface-container-low rounded animate-pulse" />
          <div className="h-80 bg-surface-container-low rounded animate-pulse" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="h-72 bg-surface-container-low rounded animate-pulse" />
          <div className="h-64 bg-surface-container-low rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
}