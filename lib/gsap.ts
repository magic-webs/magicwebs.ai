"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registering twice is harmless, but keeping it in one module means every
// consumer gets the same configured instance.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
