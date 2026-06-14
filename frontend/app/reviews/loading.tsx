export default function Loading() {
  return (
    <main className="bg-[#131313] min-h-screen pt-40 px-4 md:px-16 max-w-[1440px] mx-auto pb-24">
      <div className="h-6 w-40 bg-[#20201f] rounded mb-4 animate-pulse" />
      <div className="h-12 w-80 bg-[#20201f] rounded mb-12 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-[#20201f] p-6 rounded-xl space-y-3 animate-pulse">
            <div className="h-4 w-24 bg-[#2a2a2a] rounded" />
            <div className="h-6 w-3/4 bg-[#2a2a2a] rounded" />
            <div className="h-20 bg-[#2a2a2a] rounded" />
            <div className="h-4 w-1/2 bg-[#2a2a2a] rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}