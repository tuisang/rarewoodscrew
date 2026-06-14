export default function Loading() {
  return (
    <main className="bg-[#0e0e0e] min-h-screen pt-24 px-4 md:px-16 max-w-[1440px] mx-auto pb-24">
      <div className="flex gap-3 mb-10 border-b border-[#4f453d]/40 pb-4">
        {[1,2,3,4,5].map(i => <div key={i} className="h-9 w-24 bg-[#20201f] rounded animate-pulse" />)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-[#20201f] rounded animate-pulse" />)}
      </div>
      <div className="h-96 bg-[#20201f] rounded animate-pulse" />
    </main>
  );
}