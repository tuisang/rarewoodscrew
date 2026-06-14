export default function Loading() {
  return (
    <main className="bg-[#131313] min-h-screen pt-40 px-4 md:px-16 max-w-[1440px] mx-auto pb-24">
      <div className="h-6 w-40 bg-[#20201f] rounded mb-4 animate-pulse" />
      <div className="h-12 w-72 bg-[#20201f] rounded mb-10 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
        <div className="lg:col-span-4 bg-[#20201f] rounded animate-pulse" />
        <div className="lg:col-span-8 bg-[#20201f] rounded animate-pulse" />
      </div>
    </main>
  );
}