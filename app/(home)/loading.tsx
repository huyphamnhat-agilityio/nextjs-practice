export default function Loading() {
  return (
    <main>
      <div className="flex items-center justify-center h-[100vh]">
        <div
          className="w-12 h-12 rounded-full animate-spin
                    border-y-2 border-solid border-primary border-t-transparent"
        ></div>
      </div>
    </main>
  );
}
