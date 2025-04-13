import { useState, useEffect, useRef } from 'react';
import TitleHeader from "../components/TitleHeader.jsx";
import { expCards } from "../constants/index.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin - MUST be outside the component
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function TimelineExperience() {
    const [isMobile, setIsMobile] = useState(false);
    const timelineRef = useRef(null);
    const titleRef = useRef(null);
    const itemRefs = useRef([]);

    // Reset refs on each render to avoid stale references
    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, expCards.length);
    }, [expCards]);

    // Check for mobile viewport on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize GSAP animations
    useEffect(() => {
        // Ensure both DOM is ready and refs are populated
        if (!timelineRef.current || typeof window === "undefined") return;

        // Force a small delay to ensure DOM is fully ready
        const animationTimeout = setTimeout(() => {

            // Create a timeline for better control
            const mainTimeline = gsap.timeline({
                defaults: {
                    ease: "power2.out",
                }
            });

            // Title animation
            if (titleRef.current) {
                mainTimeline.fromTo(titleRef.current, {
                    opacity: 0,
                    y: -30,
                    duration: 20,
                } , {
                    opacity:1,
                    y: 0,
                    ease: "power2.inOut",
                });
            }

            // Timeline line animation
            const lineElement = document.querySelector(".timeline-line");
            if (lineElement) {
                ScrollTrigger.create({
                    trigger: timelineRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        gsap.to(lineElement, {
                            height: `${Math.max(1, progress * 100)}%`,
                            duration: 0.1,
                        });
                    },
                });
            }

            // For each timeline item
            itemRefs.current.forEach((item, index) => {
                if (!item) return;

                console.log(`Setting up animation for item ${index}`); // Debugging

                const isEven = index % 2 === 0;
                const direction = isMobile ? -1 : (isEven ? 1 : -1);

                // Create a separate timeline for each item
                const itemTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reset",
                        // markers: true, // For debugging - remove in production
                    }
                });

                // Find the logo circle in this item
                const logoCircle = item.querySelector(".logo-circle");
                if (logoCircle) {
                    itemTL.from(logoCircle, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.6,
                    });
                }

                // Find the content container in this item
                const contentContainer = item.querySelector(".content-container");
                if (contentContainer) {
                    itemTL.fromTo(contentContainer, {
                        opacity: 0,
                        x: direction * 50,
                        duration: 0.5,
                    },{
                        opacity: 1,
                        x: direction * 15,
                        duration: 0.1,
                    }); // Start a bit before previous animation ends
                }

                // Find all responsibility items
                const responsibilities = item.querySelectorAll(".responsibility-item");
                if (responsibilities.length) {
                    itemTL.fromTo(responsibilities, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        stagger: 0.1,
                    },{
                        opacity: 1,
                        y: 20,
                        duration: 0.5,
                        stagger: 0.1,
                    }, "-=0.4"); // Start a bit before previous animation ends
                }
            });
        }, 100); // Small delay to ensure DOM is ready

        // Cleanup function
        return () => {
            clearTimeout(animationTimeout);
            if (typeof window !== "undefined") {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    }, [isMobile, expCards]);

    return (
        <div id = "Experience" className="flex flex-col w-full bg-black text-white py-8 md:py-16 px-4">
            <div ref={titleRef}>
                <TitleHeader title="Professional Work Experience" sub="💼 My Career Overview"/>
            </div>
            <div className="max-w-6xl mx-auto mt-10 w-full">
                {/* Timeline container */}
                <div ref={timelineRef} className="relative">
                    {/* Vertical Timeline Line - A thin line with gradient effect */}
                    <div className={`
                        timeline-line
                        absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600
                        ${isMobile ? 'left-4 md:left-1/2' : 'left-1/2'} 
                    `} style={{ height: '0%' }}></div>

                    {/* Experience Entries */}
                    {expCards.map((exp, index) => (
                        <div
                            key={index}
                            ref={el => itemRefs.current[index] = el}
                            className={`
                                relative mb-20 md:mb-32
                                ${isMobile ? 'flex' : `flex ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                            `}
                        >
                            {/* Logo Circle on Timeline */}
                            <div className={`
                                logo-circle
                                ${isMobile ? 'relative' : 'absolute left-1/2 transform -translate-x-1/2'} 
                                z-10
                            `}>
                                <div className={`
                                    rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-1 
                                    flex items-center justify-center shadow-lg shadow-purple-500/30
                                    ${isMobile ? 'w-12 h-12 mr-4' : 'w-16 h-16'}
                                    transition-all duration-300 hover:scale-110
                                `}>
                                    <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center">
                                        <img
                                            src={exp.logoPath}
                                            alt={`${exp.title} logo`}
                                            className="w-3/4 h-3/4 object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className={`
                                content-container
                                ${isMobile ? 'flex-1' : `w-5/12 ${index % 2 === 0 ? 'ml-auto pl-1' : 'mr-auto pr-1 text-right'}`}
                                transition-all duration-300 hover:translate-y-1
                            `}>
                                {/* Title and Date */}
                                <div className="mb-6">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{exp.title}</h3>
                                    <div className={`
                                        flex items-center text-gray-400 
                                        ${!isMobile && index % 2 === 1 ? 'justify-end' : ''}
                                    `}>
                                        <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-sm md:text-base">{exp.date}</span>
                                    </div>
                                </div>

                                {/* Responsibilities Section */}
                                <div>
                                    <h4 className="text-lg italic text-gray-500 mb-4">Responsibilities</h4>
                                    <ul className="space-y-3">
                                        {exp.responsibility.map((item, i) => (
                                            <li
                                                key={i}
                                                className={`
                                                    responsibility-item
                                                    flex items-start
                                                    ${!isMobile && index % 2 === 1 ? 'flex-row-reverse' : ''}
                                                `}
                                            >
                                                <span className={`
                                                    text-purple-400 text-lg mt-0.5
                                                    ${!isMobile && index % 2 === 1 ? 'ml-3' : 'mr-3'}
                                                `}>•</span>
                                                <span className="text-sm md:text-base text-gray-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}