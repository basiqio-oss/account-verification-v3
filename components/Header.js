export function Header({ children }) {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-40 flex w-full h-1/6 bg-header shadow-shead">
        {children}
      </div>
    </>
  );
}