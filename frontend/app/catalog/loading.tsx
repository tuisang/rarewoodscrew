export default function Loading() {
  return (
    <main className="bg-[#131313] min-h-screen pt-40 px-4 md:px-16 max-w-[1440px] mx-auto">
      <div className="h-8 w-32 bg-[#20201f] rounded mb-4 animate-pulse" />
      <div className="h-14 w-1/2 bg-[#20201f] rounded mb-8 animate-pulse" />
      <div className="h-12 w-full bg-[#20201f] rounded mb-4 animate-pulse" />
      <div className="flex gap-3 mb-8">
        {[1,2,3,4,5].map(i => <div key={i} className="h-9 w-28 bg-[#20201f] rounded animate-pulse" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-64 bg-[#20201f] rounded-xl animate-pulse" />)}
        </div>
        <div className="lg:col-span-7 h-[600px] bg-[#20201f] rounded-xl animate-pulse" />
      </div>
    </main>
  );
}