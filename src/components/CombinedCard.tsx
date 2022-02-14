import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

type Props = {
  cardItems: { title: string; text: string }[];
  className?: string;
};
const CombinedCard = ({
  cardItems,
  className = '',
}: Props): React.ReactElement => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const animation = gsap.from(cardRef.current, {
      // scale: 1.2,
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
      },
    });
    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div className="w-full md:w-auto" ref={cardRef}>
      <ul
        className={`${className} card flex flex-col divide-y-2 divide-accent md:flex-row md:divide-y-0 md:divide-x-2`}
      >
        {cardItems.map((item) => (
          <li className="p-4" key={item.title}>
            <h5 className="mb-2">{item.title}</h5>
            <span className="text-zinc-400">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CombinedCard;
