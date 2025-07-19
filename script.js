// script.js

// --- Configuration ---
const personalInfo = {
    name: "Iaroslav Kosaretskii",
    tagline: "Aspiring Bioinformatician & Programming Enthusiast",
    location: "Frankfurt am Main, Germany",
    email: "cheemsthedoge@gmail.com",
    phone: "+49 174 184 8588",
    socials: {
        github: "https://github.com/your-username",
        linkedin: "https://linkedin.com/in/your-username"
    }
};

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

// --- Data for Sections ---
const aboutData = {
    introduction: "I am a dedicated student pursuing a Bachelor's degree in Bioinformatics at Johann Wolfgang Goethe-University Frankfurt am Main. With a strong foundation in both programming and academic excellence, I bring a blend of technical skills and scientific curiosity to my bioinformatics projects.",
    skills: ["Python", "NumPy", "Pandas", "Linux Administration", "Git", "HTML/CSS", "React", "JavaScript"],
    languages: ["Russian (Native)", "German (C1)", "English (C1)"],
    education: {
        degree: "Bachelor in Bioinformatics",
        university: "Johann Wolfgang Goethe-University Frankfurt am Main",
        years: "2024-2027"
    },
};

const projectData = [
    { title: "Project One: Bio-Data Analyzer", description: "A command-line tool developed in Python using Pandas and NumPy to process and analyze large biological datasets efficiently.", tags: ["Python", "Pandas", "NumPy", "CLI"], liveUrl: "#", repoUrl: "#" },
    { title: "Project Two: Personal Portfolio Website", description: "This very website, built with React and Tailwind CSS to create a modern, responsive, and professional online presence.", tags: ["React", "Tailwind CSS", "JavaScript", "HTML"], liveUrl: "#", repoUrl: "#" },
    { title: "Project Three: Coming Soon", description: "I am currently working on a new project that involves machine learning for protein structure prediction. More details will be available soon!", tags: ["Machine Learning", "Bioinformatics", "In Progress"], liveUrl: null, repoUrl: null }
];

// --- Generative Critter Component (JavaScript version) ---
function createGenerativeCritter(container, seed) {
    const canvas = document.createElement('canvas');
    canvas.className = "w-full h-full generative-critter-canvas";
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const size = 10;
    canvas.width = size;
    canvas.height = size;

    let currentSeed = seed;
    let random = () => {
        var x = Math.sin(currentSeed++) * 10000;
        return x - Math.floor(x);
    };

    const r = Math.floor(random() * 256);
    const g = Math.floor(random() * 256);
    const b = Math.floor(random() * 256);
    const bodyColor = `rgb(${r}, ${g}, ${b})`;
    const accentColor = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;

    ctx.clearRect(0, 0, size, size);
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < Math.ceil(size / 2); x++) {
            if (random() > 0.5) {
                ctx.fillStyle = bodyColor;
                ctx.fillRect(x, y, 1, 1);
                ctx.fillRect(size - 1 - x, y, 1, 1);
            }
        }
    }
    if (random() > 0.3) {
        const eyeX = Math.floor(random() * (size / 2 - 1)) + 1;
        const eyeY = Math.floor(random() * (size - 2)) + 1;
        ctx.fillStyle = accentColor;
        ctx.fillRect(eyeX, eyeY, 1, 1);
        ctx.fillRect(size - 1 - eyeX, eyeY, 1, 1);
    }
}

// --- Critter Corner ---
const critterGreetings = ["Welcome to the digital ecosystem!", "Analyzing visitor data... you seem friendly.", "01001000 01100101 01101100 01101100 01101111!", "I was just generated. What are the odds?", "Greetings, carbon-based lifeform."];

function setupCritterCorner() {
    const critterCornerDiv = document.getElementById('critterCorner');
    if (!critterCornerDiv) return;

    let bubbleVisible = false;
    let critterSeed = Math.random();
    let greeting = critterGreetings[Math.floor(Math.random() * critterGreetings.length)];

    const renderCritterCorner = () => {
        critterCornerDiv.innerHTML = `
            <div class="fixed bottom-4 right-4 z-50 flex items-end gap-3 pointer-events-none">
                <div id="critterBubble" class="transition-all duration-500 ${bubbleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
                    <div class="relative bg-white text-gray-800 p-4 rounded-lg shadow-lg max-w-xs font-mono border-2 border-green-400 pointer-events-auto">
                        <p class="text-sm">${greeting}</p>
                        <div class="absolute right-0 bottom-2 transform translate-x-1/2 rotate-45 w-4 h-4 bg-white border-r-2 border-b-2 border-green-400"></div>
                        <button id="closeCritterBubble" class="absolute top-1 right-1 text-gray-400 hover:text-gray-800" aria-label="Close greeting">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>
                </div>
                <div id="critterCanvasContainer" class="w-24 h-24 cursor-pointer transition-transform duration-300 hover:scale-110 animate-wiggle pointer-events-auto" title="Say hi!"></div>
            </div>
        `;

        const critterCanvasContainer = document.getElementById('critterCanvasContainer');
        if (critterCanvasContainer) {
            critterCanvasContainer.innerHTML = ''; // Clear previous critter
            createGenerativeCritter(critterCanvasContainer, critterSeed);
            critterCanvasContainer.onclick = () => {
                bubbleVisible = !bubbleVisible;
                renderCritterCorner();
            };
        }

        const closeButton = document.getElementById('closeCritterBubble');
        if (closeButton) {
            closeButton.onclick = () => {
                bubbleVisible = false;
                renderCritterCorner();
            };
        }
        lucide.createIcons(); // Re-create icons after DOM update
    };

    setTimeout(() => {
        critterCornerDiv.style.display = 'block'; // Make visible
        setTimeout(() => {
            bubbleVisible = true;
            renderCritterCorner();
        }, 1000); // Delay bubble appearance
    }, 1500); // Delay critter appearance

    renderCritterCorner(); // Initial render
}


// --- Barnsley Fern Background ---
function setupBarnsleyFernCanvas() {
    const canvas = document.getElementById('barnsleyFernCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let x = 0, y = 0;
    ctx.fillStyle = 'rgba(57, 255, 20, 0.7)'; // Green color with transparency

    const drawPoint = () => {
        // Scale and translate the fern to fit the canvas
        const px = (canvas.width / 11) * x + canvas.width / 2;
        const py = canvas.height - (canvas.height / 11) * y - 20; // Invert y-axis for typical fern orientation
        ctx.fillRect(px, py, 1, 1);
    };

    const nextPoint = () => {
        const r = Math.random();
        let nextX, nextY;

        // Barnsley Fern IFS (Iterated Function System) rules
        if (r < 0.01) { // Stem
            nextX = 0;
            nextY = 0.16 * y;
        } else if (r < 0.86) { // Successive smaller leaflets
            nextX = 0.85 * x + 0.04 * y;
            nextY = -0.04 * x + 0.85 * y + 1.6;
        } else if (r < 0.93) { // Left leaflet
            nextX = 0.2 * x - 0.26 * y;
            nextY = 0.23 * x + 0.22 * y + 1.6;
        } else { // Right leaflet
            nextX = -0.15 * x + 0.28 * y;
            nextY = 0.26 * x + 0.24 * y + 0.44;
        }
        x = nextX;
        y = nextY;
    };

    const render = () => {
        // Draw multiple points per frame for faster generation
        for (let i = 0; i < 100; i++) {
            drawPoint();
            nextPoint();
        }
        animationFrameId = requestAnimationFrame(render);
    };

    render(); // Start the animation

    // Cleanup function
    return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
    };
}

// --- Floating Critters ---
function setupFloatingCritters() {
    const container = document.getElementById('floatingCritters');
    if (!container) return;

    const critters = [];
    const numCritters = 15;

    for (let i = 0; i < numCritters; i++) {
        const size = Math.random() * 40 + 20; // Critter size between 20px and 60px
        const critterEl = document.createElement('div');
        critterEl.className = 'floating-critter';
        critterEl.style.width = `${size}px`;
        critterEl.style.height = `${size}px`;
        container.appendChild(critterEl);

        const critter = {
            id: i,
            seed: Math.random() * 1000,
            el: critterEl,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5, // Random velocity between -0.25 and 0.25
            vy: (Math.random() - 0.5) * 0.5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 0.2, // Random rotation speed
            size: size,
        };
        critters.push(critter);
        createGenerativeCritter(critterEl, critter.seed); // Create the critter canvas inside its container
    }

    let animationFrameId;

    const animate = () => {
        critters.forEach(c => {
            c.x += c.vx;
            c.y += c.vy;
            c.rotation += c.rotationSpeed;

            // Wrap around screen edges
            if (c.x < -c.size) c.x = window.innerWidth + c.size;
            if (c.x > window.innerWidth + c.size) c.x = -c.size;
            if (c.y < -c.size) c.y = window.innerHeight + c.size;
            if (c.y > window.innerHeight + c.size) c.y = -c.size;

            c.el.style.transform = `translate(${c.x}px, ${c.y}px) rotate(${c.rotation}deg)`;
        });
        animationFrameId = requestAnimationFrame(animate);
    };

    animate(); // Start the animation

    // Cleanup function
    return () => {
        cancelAnimationFrame(animationFrameId);
    };
}

// --- Main App Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('mainHeader');
    const scrollContainer = document.getElementById('scrollContainer');
    const navLinksElements = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    let isScrolled = false;
    let activeSection = 'home';

    const handleScroll = () => {
        // Header scroll effect
        const scrolled = scrollContainer.scrollTop > 10;
        if (scrolled !== isScrolled) {
            isScrolled = scrolled;
            if (isScrolled) {
                mainHeader.classList.add('bg-gray-900/90', 'shadow-lg', 'shadow-black/20', 'border-b', 'border-gray-800');
                mainHeader.classList.remove('bg-transparent');
            } else {
                mainHeader.classList.remove('bg-gray-900/90', 'shadow-lg', 'shadow-black/20', 'border-b', 'border-gray-800');
                mainHeader.classList.add('bg-transparent');
            }
        }

        // Active navigation link highlighting
        const scrollPosition = scrollContainer.scrollTop + window.innerHeight / 2; // Mid-viewport scroll position

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                const currentSectionId = section.id;
                if (currentSectionId !== activeSection) {
                    activeSection = currentSectionId;
                    navLinksElements.forEach(link => {
                        if (link.dataset.section === activeSection) {
                            link.classList.add('bg-green-500', 'text-gray-900');
                            link.classList.remove('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
                        } else {
                            link.classList.remove('bg-green-500', 'text-gray-900');
                            link.classList.add('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
                        }
                    });
                }
            }
        });
    };

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
        // Initial check on load
        handleScroll();
    }

    // Initialize background animations and critter corner
    setupBarnsleyFernCanvas();
    setupFloatingCritters();
    setupCritterCorner();
});
