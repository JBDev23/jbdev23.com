interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const halfContent = Array(10).fill(items.join(' * ') + ' * ').join('');

  return (
    <div className=" w-[110vw] whitespace-nowrap bg-accent text-black border-y-4 border-foreground py-2 flex pointer-events-none brutalist-shadow">
      <div className="animate-marquee font-black uppercase text-xl md:text-2xl">
        {halfContent}{halfContent}
      </div>
    </div>
  );
}


/*
export default function Marquee({ items }: MarqueeProps) {
  const halfContent = Array(10).fill(items.join(' * ') + ' * ').join('');

  return (
    <div className="absolute w-[110vw] top-1/2 left-1/2 -rotate-5 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-accent text-black border-y-4 border-foreground py-2 flex pointer-events-none brutalist-shadow">
      <div className="animate-marquee font-black uppercase text-xl md:text-2xl">
        {halfContent}{halfContent}
      </div>
    </div>
  );
}
*/


/*
export default function Marquee({ items }: MarqueeProps) {
  const halfContent = Array(10).fill(items.join(' * ') + ' * ').join('');

  return (
    <div className="absolute top-[85%] w-[90vw] whitespace-nowrap bg-accent text-black border-y-4 border-foreground py-2 flex pointer-events-none brutalist-shadow">
      <div className="animate-marquee font-black uppercase text-xl md:text-2xl">
        {halfContent}{halfContent}
      </div>
    </div>
  );
}
 */