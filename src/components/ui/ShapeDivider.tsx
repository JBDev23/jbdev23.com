export default function ShapeDivider() {
  return (
    <div className="w-full py-16 md:py-24 border-foreground relative flex items-center justify-center">

      <div className="absolute w-full h-2 bg-foreground top-1/2 -translate-y-1/2"></div>

      <div className="z-10 transition-all duration-200 drop-shadow-[8px_8px_0px_var(--foreground)] hover:drop-shadow-[4px_4px_0px_var(--foreground)] hover:translate-x-1 hover:translate-y-1">
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 animate-[spin_12s_linear_infinite]"
        >
          <polygon
            points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30"
            fill="var(--primary)"
            stroke="var(--foreground)"
            strokeWidth="8"
          />
        </svg>
      </div>
    </div>
  );
}
