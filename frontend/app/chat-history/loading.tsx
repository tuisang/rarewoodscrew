export default function Loading() {
  return (
    <main className="bg-background min-h-screen pt-40 px-4 md:px-16 max-w-[1440px] mx-auto pb-24">
      <div className="h-6 w-40 bg-surface-container-low rounded mb-4 animate-pulse" />
      <div className="h-12 w-72 bg-surface-container-low rounded mb-10 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
        <div className="lg:col-span-4 bg-surface-container-low rounded animate-pulse" />
        <div className="lg:col-span-8 bg-surface-container-low rounded animate-pulse" />
      </div>
    </main>
  );
}