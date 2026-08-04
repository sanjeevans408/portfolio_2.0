export default function Aurora() {
  return (
    <>
      <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full blur-[150px] bg-cyan-500/20 pointer-events-none" />
      <div className="absolute bottom-0 -right-60 w-[600px] h-[600px] rounded-full blur-[180px] bg-violet-500/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[180px] bg-sky-500/20 pointer-events-none" />
    </>
  );
}
