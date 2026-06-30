export default function Loading() {
  return (
    <main className="bg-background min-h-screen pt-40 px-4 md:px-16 max-w-[1440px] mx-auto">
      <div className="h-8 w-32 bg-surface-container-low rounded mb-4 animate-pulse" />
      <div className="h-16 w-2/3 bg-surface-container-low rounded mb-12 animate-pulse" />
      <div className="flex gap-3 mb-8">
        {[1,2,3,4,5].map(i => <div key={i} className="h-9 w-28 bg-surface-container-low rounded animate-pulse" />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 h-[600px] bg-surface-container-low rounded-xl animate-pulse" />
        <div className="md:col-span-4 h-[600px] bg-surface-container-low rounded-xl animate-pulse" />
        <div className="md:col-span-12 h-[500px] bg-surface-container-low rounded-xl animate-pulse" />
      </div>
    </main>
  );
}