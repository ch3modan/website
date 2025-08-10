// Initialize Lucide icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    // --- Main App Logic from original script.js ---
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
        handleScroll();
    }

    // --- Generative Critter Component ---
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
    function setupCritterCorner() {
        const critterCornerDiv = document.getElementById('critterCorner');
        if (!critterCornerDiv) return;

        critterCornerDiv.innerHTML = `
            <div id="seal" style="position: absolute; width: 100px; height: 100px; z-index: 50;">
                <img src="https://camp2.rectangle.zone/subwikifiles/wc2/images/thumb/9/93/Irascible_Y.png/297px-Irascible_Y.png" alt="A cute seal" style="width: 100%; height: 100%; border-radius: 50%;">
            </div>
        `;
    }

    // --- Barnsley Fern Bush Background ---
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

        const numFerns = 8;
        const ferns = [];
        const edges = ['left', 'right', 'top', 'bottom'];

        for (let i = 0; i < numFerns; i++) {
            const edge = edges[i % 4]; // Cycle through edges to get variety
            let originX, originY, rotation;

            switch (edge) {
                case 'left':
                    originX = 0;
                    originY = Math.random() * canvas.height;
                    rotation = -Math.PI / 2; // Pointing right
                    break;
                case 'right':
                    originX = canvas.width;
                    originY = Math.random() * canvas.height;
                    rotation = Math.PI / 2; // Pointing left
                    break;
                case 'top':
                    originX = Math.random() * canvas.width;
                    originY = 0;
                    rotation = Math.PI; // Pointing down
                    break;
                case 'bottom':
                default:
                    originX = Math.random() * canvas.width;
                    originY = canvas.height;
                    rotation = 0; // Pointing up
                    break;
            }

            ferns.push({
                x: 0,
                y: 0,
                originX: originX,
                originY: originY,
                rotation: rotation,
                scale: Math.random() * 0.8 + 0.6, // Slightly larger for a "closer" feel
                color: `rgba(57, ${Math.floor(Math.random() * 100 + 155)}, 20, 0.5)`
            });
        }

        const drawPoint = (fern) => {
            ctx.fillStyle = fern.color;
            const canvasScale = canvas.height / 10; // Adjust overall size of ferns

            // Apply rotation to the point
            const cosR = Math.cos(fern.rotation);
            const sinR = Math.sin(fern.rotation);
            const rotatedX = fern.x * cosR - fern.y * sinR;
            const rotatedY = fern.x * sinR + fern.y * cosR;

            // The fern naturally grows "up" (positive Y). For canvas, positive Y is down.
            // So we subtract the Y component to make it grow up on the screen.
            const px = fern.originX + (rotatedX * canvasScale * fern.scale);
            const py = fern.originY - (rotatedY * canvasScale * fern.scale);

            ctx.fillRect(px, py, 1, 1);
        };

        const nextPoint = (fern) => {
            const r = Math.random();
            let nextX, nextY;
            if (r < 0.01) {
                nextX = 0;
                nextY = 0.16 * fern.y;
            } else if (r < 0.86) {
                nextX = 0.85 * fern.x + 0.04 * fern.y;
                nextY = -0.04 * fern.x + 0.85 * fern.y + 1.6;
            } else if (r < 0.93) {
                nextX = 0.2 * fern.x - 0.26 * fern.y;
                nextY = 0.23 * fern.x + 0.22 * fern.y + 1.6;
            } else {
                nextX = -0.15 * fern.x + 0.28 * fern.y;
                nextY = 0.26 * fern.x + 0.24 * fern.y + 0.44;
            }
            fern.x = nextX;
            fern.y = nextY;
        };

        const render = () => {
            ferns.forEach(fern => {
                // Draw a batch of points for each fern per frame for performance
                for (let i = 0; i < 25; i++) {
                    drawPoint(fern);
                    nextPoint(fern);
                }
            });
            animationFrameId = requestAnimationFrame(render);
        };
        render();
    }

    // --- Floating Critters ---
    function setupFloatingCritters() {
        const container = document.getElementById('floatingCritters');
        if (!container) return;

        let critters = [];
        const maxCritters = 15;

        function createCritter() {
            const size = Math.random() * 40 + 20;
            const critterEl = document.createElement('div');
            critterEl.className = 'floating-critter';
            critterEl.style.width = `${size}px`;
            critterEl.style.height = `${size}px`;
            critterEl.style.pointerEvents = 'auto';
            container.appendChild(critterEl);

            const critter = {
                el: critterEl,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                size: size,
                seed: Math.random() * 1000,
            };
            critters.push(critter);
            createGenerativeCritter(critterEl, critter.seed);

            critterEl.addEventListener('click', (e) => {
                const rect = critterEl.getBoundingClientRect();
                const origin = {
                    x: (rect.left + rect.right) / 2 / window.innerWidth,
                    y: (rect.top + rect.bottom) / 2 / window.innerHeight
                };

                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: origin
                });

                critterEl.remove();
                critters = critters.filter(c => c !== critter);
            });
        }

        for (let i = 0; i < maxCritters; i++) {
            createCritter();
        }

        setInterval(() => {
            if (critters.length < maxCritters) {
                createCritter();
            }
        }, 2000);

        let animationFrameId;
        const animate = () => {
            critters.forEach(c => {
                c.x += c.vx;
                c.y += c.vy;
                c.rotation += c.rotationSpeed;
                if (c.x < -c.size) c.x = window.innerWidth + c.size;
                if (c.x > window.innerWidth + c.size) c.x = -c.size;
                if (c.y < -c.size) c.y = window.innerHeight + c.size;
                if (c.y > window.innerHeight + c.size) c.y = -c.size;
                c.el.style.transform = `translate(${c.x}px, ${c.y}px) rotate(${c.rotation}deg)`;
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
    }

    // --- Conway's Game of Life ---
    const golCanvas = document.getElementById('gameOfLifeCanvas');
    if (golCanvas) {
        const ctx = golCanvas.getContext('2d');
        const cellSize = 10;
        const width = 500;
        const height = 300;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);
        const aliveColor = '#10B981';
        const deadColor = '#1f2937';

        golCanvas.width = width;
        golCanvas.height = height;

        let grid;
        let isRunning = false;
        let animationFrameId;
        let generationCount = 0;
        let currentRules = 'classic'; // 'classic' or 'highlife'

        const startPauseButton = document.getElementById('gol-start-pause');
        const startPauseText = document.getElementById('gol-start-pause-text');
        const playIcon = document.getElementById('gol-play-icon');
        const pauseIcon = document.getElementById('gol-pause-icon');
        const resetButton = document.getElementById('gol-reset');
        const randomizeButton = document.getElementById('gol-randomize');
        const generationCounter = document.getElementById('gol-generation');
        const classicRulesButton = document.getElementById('gol-rules-classic');
        const highlifeRulesButton = document.getElementById('gol-rules-highlife');


        const createGrid = () => new Array(cols).fill(null).map(() => new Array(rows).fill(0));

        const randomizeGrid = (g) => {
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    g[i][j] = Math.random() > 0.8 ? 1 : 0;
                }
            }
        };

        const setGliderGunPattern = (g) => {
            const pattern = [
                [24,0],[22,1],[24,1],[12,2],[13,2],[20,2],[21,2],[34,2],[35,2],[11,3],[15,3],[20,3],[21,3],[34,3],[35,3],[0,4],[1,4],[10,4],[16,4],[20,4],[21,4],[0,5],[1,5],[10,5],[14,5],[16,5],[17,5],[22,5],[24,5],[10,6],[16,6],[24,6],[11,7],[15,7],[12,8],[13,8]
            ];
            pattern.forEach(([x, y]) => {
                if (x + 1 < cols && y + 3 < rows) {
                    g[x + 1][y + 3] = 1;
                }
            });
        };

        const drawGrid = (g) => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    ctx.fillStyle = g[i][j] ? aliveColor : deadColor;
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                }
            }
        };

        const getNextGeneration = (g) => {
            const nextGrid = createGrid();
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const neighbors = countNeighbors(g, i, j);
                    const isAlive = g[i][j] === 1;

                    if (currentRules === 'classic') {
                        // Classic B3/S23 rules
                        if (isAlive && (neighbors < 2 || neighbors > 3)) {
                            nextGrid[i][j] = 0; // Dies
                        } else if (!isAlive && neighbors === 3) {
                            nextGrid[i][j] = 1; // Born
                        } else {
                            nextGrid[i][j] = g[i][j]; // Stays the same
                        }
                    } else if (currentRules === 'highlife') {
                        // HighLife B36/S23 rules
                        if (isAlive && (neighbors < 2 || neighbors > 3)) {
                            nextGrid[i][j] = 0; // Dies
                        } else if (!isAlive && (neighbors === 3 || neighbors === 6)) {
                            nextGrid[i][j] = 1; // Born
                        } else {
                            nextGrid[i][j] = g[i][j]; // Stays the same
                        }
                    }
                }
            }
            return nextGrid;
        };

        const countNeighbors = (g, x, y) => {
            let count = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    const col = (x + i + cols) % cols;
                    const row = (y + j + rows) % rows;
                    count += g[col][row];
                }
            }
            return count;
        };

        const gameLoop = () => {
            if (!isRunning) return;
            grid = getNextGeneration(grid);
            drawGrid(grid);
            generationCount++;
            generationCounter.textContent = generationCount;
            animationFrameId = setTimeout(() => {
                requestAnimationFrame(gameLoop);
            }, 100);
        };

        const toggleCellState = (e) => {
            const rect = golCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const col = Math.floor(x / cellSize);
            const row = Math.floor(y / cellSize);
            if (col >= 0 && col < cols && row >= 0 && row < rows) {
                grid[col][row] = grid[col][row] ? 0 : 1;
                drawGrid(grid);
                generationCount = 0;
                generationCounter.textContent = generationCount;
            }
        };

        const updateButtonState = () => {
            if (isRunning) {
                startPauseText.textContent = 'Pause';
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            } else {
                startPauseText.textContent = 'Start';
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            }
        };

        const resetSimulation = () => {
            grid = createGrid();
            setGliderGunPattern(grid);
            drawGrid(grid);
            generationCount = 0;
            generationCounter.textContent = generationCount;
            if (isRunning) {
                isRunning = false;
                updateButtonState();
                clearTimeout(animationFrameId);
            }
        };

        startPauseButton.addEventListener('click', () => {
            isRunning = !isRunning;
            updateButtonState();
            if (isRunning) gameLoop();
            else clearTimeout(animationFrameId);
        });

        resetButton.addEventListener('click', resetSimulation);

        randomizeButton.addEventListener('click', () => {
            grid = createGrid();
            randomizeGrid(grid);
            drawGrid(grid);
            generationCount = 0;
            generationCounter.textContent = generationCount;
        });

        classicRulesButton.addEventListener('click', () => {
            currentRules = 'classic';
            classicRulesButton.classList.add('bg-green-600', 'text-white');
            classicRulesButton.classList.remove('text-gray-400');
            highlifeRulesButton.classList.remove('bg-green-600', 'text-white');
            highlifeRulesButton.classList.add('text-gray-400');
            resetSimulation();
        });

        highlifeRulesButton.addEventListener('click', () => {
            currentRules = 'highlife';
            highlifeRulesButton.classList.add('bg-green-600', 'text-white');
            highlifeRulesButton.classList.remove('text-gray-400');
            classicRulesButton.classList.remove('bg-green-600', 'text-white');
            classicRulesButton.classList.add('text-gray-400');
            resetSimulation();
        });

        golCanvas.addEventListener('click', toggleCellState);

        const initGol = () => {
            grid = createGrid();
            setGliderGunPattern(grid);
            drawGrid(grid);
        };
        initGol();
    }

    // --- Initialize everything ---
    setupBarnsleyFernCanvas();
    setupFloatingCritters();
    setupCritterCorner();
    animateSeal();

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    function animateSeal() {
        const seal = document.getElementById('seal');
        if (!seal) return;

        let x = window.innerWidth - 100;
        let y = window.innerHeight - 100;
        let angle = 0;
        let direction = 'left';

        function move() {
            const speed = 2;
            switch (direction) {
                case 'left':
                    x -= speed;
                    if (x <= 0) {
                        x = 0;
                        direction = 'up';
                    }
                    break;
                case 'up':
                    y -= speed;
                    if (y <= 0) {
                        y = 0;
                        direction = 'right';
                    }
                    break;
                case 'right':
                    x += speed;
                    if (x >= window.innerWidth - 100) {
                        x = window.innerWidth - 100;
                        direction = 'down';
                    }
                    break;
                case 'down':
                    y += speed;
                    if (y >= window.innerHeight - 100) {
                        y = window.innerHeight - 100;
                        direction = 'left';
                    }
                    break;
            }

            angle = (angle + 2) % 360;

            seal.style.left = `${x}px`;
            seal.style.top = `${y}px`;
            seal.style.transform = `rotate(${angle}deg)`;

            requestAnimationFrame(move);
        }

        seal.addEventListener('click', () => {
            let scale = 1;
            const interval = setInterval(() => {
                scale += 0.1;
                seal.style.transform = `scale(${scale}) rotate(${angle}deg)`;
                if (scale >= 2) {
                    clearInterval(interval);
                    const rect = seal.getBoundingClientRect();
                    const origin = {
                        x: (rect.left + rect.right) / 2 / window.innerWidth,
                        y: (rect.top + rect.bottom) / 2 / window.innerHeight
                    };
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: origin,
                        colors: ['#0077be', '#00a1e0', '#80d4ff', '#b3e6ff', '#e6f7ff']
                    });
                    seal.style.transform = `scale(1) rotate(${angle}deg)`;
                }
            }, 50);
        });

        let isMoving = true;

        function move() {
            if(!isMoving) return;
            const speed = 2;
            switch (direction) {
                case 'left':
                    x -= speed;
                    if (x <= 0) {
                        x = 0;
                        direction = 'up';
                    }
                    break;
                case 'up':
                    y -= speed;
                    if (y <= 0) {
                        y = 0;
                        direction = 'right';
                    }
                    break;
                case 'right':
                    x += speed;
                    if (x >= window.innerWidth - 100) {
                        x = window.innerWidth - 100;
                        direction = 'down';
                    }
                    break;
                case 'down':
                    y += speed;
                    if (y >= window.innerHeight - 100) {
                        y = window.innerHeight - 100;
                        direction = 'left';
                    }
                    break;
            }

            angle = (angle + 2) % 360;

            seal.style.left = `${x}px`;
            seal.style.top = `${y}px`;
            seal.style.transform = `rotate(${angle}deg)`;

            requestAnimationFrame(move);
        }

        seal.addEventListener('click', () => {
            isMoving = false;
            let scale = 1;
            const interval = setInterval(() => {
                scale += 0.1;
                seal.style.transform = `scale(${scale}) rotate(${angle}deg)`;
                if (scale >= 2) {
                    clearInterval(interval);
                    const rect = seal.getBoundingClientRect();
                    const origin = {
                        x: (rect.left + rect.right) / 2 / window.innerWidth,
                        y: (rect.top + rect.bottom) / 2 / window.innerHeight
                    };
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: origin,
                        colors: ['#0077be', '#00a1e0', '#80d4ff', '#b3e6ff', '#e6f7ff']
                    });
                    seal.style.transform = `scale(1) rotate(${angle}deg)`;
                    isMoving = true;
                    requestAnimationFrame(move);
                }
            }, 50);
        });

        move();
    }

    // --- Easter Egg ---
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                console.log(`
    ,-----.
   ,'  _  \`.
  /   (_)   \\
 |   .-.   |
 |  \`---'  |
  \\       /
   \`.   ,'
     \`-'
Kweh! You found the secret Chocobo!
`);
            }
        } else {
            konamiIndex = 0;
        }
    });
});
