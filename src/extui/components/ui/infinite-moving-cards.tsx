// "use client";

// import { cn } from "../../utils/cn";
// import React, { useEffect, useState } from "react";

// export const InfiniteMovingCards = ({
//   items,
//   direction = "left",
//   speed = "fast",
//   pauseOnHover = true,
//   className,
// }: {
//   items: {
//     itemType: string;
//     name: string;
//     title: string;
//   }[];
//   direction?: "left" | "right";
//   speed?: "fast" | "normal" | "slow";
//   pauseOnHover?: boolean;
//   className?: string;
// }) => {
//   const containerRef = React.useRef<HTMLDivElement>(null);
//   const scrollerRef = React.useRef<HTMLUListElement>(null);

//   useEffect(() => {
//     addAnimation();
//   }, []);
//   const [start, setStart] = useState(false);
//   function addAnimation() {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);

//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         if (scrollerRef.current) {
//           scrollerRef.current.appendChild(duplicatedItem);
//         }
//       });

//       getDirection();
//       getSpeed();
//       setStart(true);
//     }
//   }
//   const getDirection = () => {
//     if (containerRef.current) {
//       if (direction === "left") {
//         containerRef.current.style.setProperty(
//           "--animation-direction",
//           "forwards"
//         );
//       } else {
//         containerRef.current.style.setProperty(
//           "--animation-direction",
//           "reverse"
//         );
//       }
//     }
//   };
//   const getSpeed = () => {
//     if (containerRef.current) {
//       if (speed === "fast") {
//         containerRef.current.style.setProperty("--animation-duration", "20s");
//       } else if (speed === "normal") {
//         containerRef.current.style.setProperty("--animation-duration", "40s");
//       } else {
//         containerRef.current.style.setProperty("--animation-duration", "100s");
//       }
//     }
//   };
//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
//         className
//       )}
//     >
//       <ul
//         ref={scrollerRef}
//         className={cn(
//           " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
//           start && "animate-scroll ",
//           pauseOnHover && "hover:[animation-play-state:paused]"
//         )}
//       >
//        {items.map((item, idx) => (
//           <li
//             key={idx}
//             className="  relative rounded-2xl border border-b-0 flex-shrink-0 px-2 py-6 md:w-[450px]"
//             style={{
//               background: "linear-gradient(180deg, var(--indigo-300), var(--indigo-300)",
//             }}
//           >
//             <blockquote>
//               <div
//                 aria-hidden="true"
//                 className="user-select-none -z-1 pointer-events-none absolute "
//               ></div>
//               <span className="relative z-20 md:text-sm md:leading-[1.6] text-gray-600 font-semibold italic">
//                 {item.itemType} - {item.category}
//               </span>
//               <div className="relative z-20 mt-6 flex flex-col items-start">
//                 <p className="text-sm leading-[1.6] text-gray-800 font-normal">
//                   <span className="font-semibold">Location:</span> {item.location}
//                 </p>
//                 <p className="text-sm leading-[1.6] text-gray-800 font-normal">
//                   <span className="font-semibold">Specification:</span> {item.specification}
//                 </p>
//                 <p className="text-sm leading-[1.6] text-gray-800 font-normal">
//                   <span className="font-semibold">Found On:</span> {item.foundOn}
//                 </p>
//                 <p className="text-sm leading-[1.6] text-gray-800 font-normal">
//                   <span className="font-semibold">Status:</span> {item.reportStatus}
//                 </p>
//                 <p className="text-sm leading-[1.6] text-gray-800 font-normal">
//                   <span className="font-semibold">Reported By:</span> {item.reportedBy}
//                 </p>
//               </div>
//             </blockquote>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


"use client";

import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "down",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    itemType: string;
    location: string;
    specification: string;
    foundOn: string;
    reportStatus: string;
    reportedBy: string;
    category: string;
  }[];
  direction?: "down" | "up";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Clone items for infinite scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLLIElement;

        // Add click event listener to cloned items
        duplicatedItem.addEventListener("click", () => {
          const idx =
            Array.from(scrollerRef.current!.children).indexOf(duplicatedItem) % items.length;
          navigate(`/item/${idx}`);
        });

        scrollerRef.current.appendChild(duplicatedItem);
      });

      applyDirection();
      applySpeed();
      setStart(true);
    }
  }

  const applyDirection = () => {
    if (containerRef.current) {
      const animationDirection = direction === "up" ? "normal" : "reverse";
      containerRef.current.style.setProperty("--animation-direction", animationDirection);
    }
  };

  const applySpeed = () => {
    if (containerRef.current) {
      const animationSpeed =
        speed === "fast" ? "10s" : speed === "normal" ? "20s" : "40s";
      containerRef.current.style.setProperty("--animation-duration", animationSpeed);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 h-[300px] md:max-h-[400px] overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex flex-col gap-2 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:pause-animation"
        )}
        style={{
          animation: `scroll var(--animation-duration, 20s) linear infinite var(--animation-direction, normal)`,
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative rounded-2xl cursor-pointer bg-white/10 border-[.2px] px-2 py-3"
            style={{
              pointerEvents: "auto", // Ensure clicks are registered
              willChange: "transform", // Optimize for animations
              zIndex: 10, // Ensure it's on top
            }}
            onClick={() => {
              console.log(`Clicked item ${idx}`);
              navigate(`/item/${idx}`);
            }}
          >
            <blockquote>
              <span className="relative z-20 text-2xl font-bold text-white">
                {item.itemType}
              </span>
              <div className="relative z-20 mt-1 flex flex-col items-start">
                <p className="text-sm text-white">
                  <span className="font-semibold">Location:</span> {item.location}
                </p>
                <p className="text-sm hidden md:block text-white">
                  <span className="font-semibold">Specification:</span> {item.specification}
                </p>
                <p className="text-sm text-white">
                  <span className="font-semibold">Found On:</span> {item.foundOn}
                </p>
                <p className="text-sm text-white">
                  <span className="font-semibold">Status:</span>
                  <span className="text-red-500 pl-1 font-extrabold">
                    {item.reportStatus}
                  </span>
                </p>
                <p className="text-sm hidden md:block text-white">
                  <span className="font-semibold">Reported By:</span> {item.reportedBy}
                </p>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
