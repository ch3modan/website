// Initialize Lucide icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // --- Main App Logic from original script.js ---
    const mainHeader = document.getElementById('mainHeader');
    const scrollContainer = document.getElementById('scrollContainer');
    const navLinksElements = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    let isScrolled = false;
    let activeSection = 'home';
    let isPaused = false;

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
        let scrollTimeout;
        const throttledScrollHandler = throttle(() => {
            handleScroll();
            isPaused = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isPaused = false;
            }, 150);
        }, 100);
        scrollContainer.addEventListener('scroll', throttledScrollHandler);
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
            if (!isPaused) {
                ferns.forEach(fern => {
                    // Draw a batch of points for each fern per frame for performance
                    for (let i = 0; i < 25; i++) {
                        drawPoint(fern);
                        nextPoint(fern);
                    }
                });
            }
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
            if (!isPaused) {
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
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
    }

    // --- Conway's Game of Life ---
    class GameOfLife {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) {
                console.error(`Canvas with id ${canvasId} not found.`);
                return;
            }
            this.ctx = this.canvas.getContext('2d');
            this.cellSize = 10;
            this.width = 500;
            this.height = 300;
            this.cols = Math.floor(this.width / this.cellSize);
            this.rows = Math.floor(this.height / this.cellSize);
            this.aliveColor = '#10B981';
            this.deadColor = '#1f2937';

            this.canvas.width = this.width;
            this.canvas.height = this.height;

            this.grid = this.createGrid();
            this.isRunning = false;
            this.animationFrameId = null;
            this.generationCount = 0;
            this.currentRules = 'classic'; // 'classic' or 'highlife'
            this.speed = 10; // updates per second
            this.lastUpdateTime = 0;
            this.updateInterval = 1000 / this.speed;

            this.startPauseButton = document.getElementById('gol-start-pause');
            this.startPauseText = document.getElementById('gol-start-pause-text');
            this.playIcon = document.getElementById('gol-play-icon');
            this.pauseIcon = document.getElementById('gol-pause-icon');
            this.resetButton = document.getElementById('gol-reset');
            this.randomizeButton = document.getElementById('gol-randomize');
            this.generationCounter = document.getElementById('gol-generation');
            this.classicRulesButton = document.getElementById('gol-rules-classic');
            this.highlifeRulesButton = document.getElementById('gol-rules-highlife');
            this.speedSlider = document.getElementById('gol-speed');
            this.patternSelector = document.getElementById('gol-pattern');

            this.init();
        }

        createGrid() {
            return new Array(this.cols).fill(null).map(() => new Array(this.rows).fill(0));
        }

        randomizeGrid() {
            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    this.grid[i][j] = Math.random() > 0.8 ? 1 : 0;
                }
            }
        }

        loadPattern(patternName) {
            this.grid = this.createGrid();
            const patterns = {
                'gosper-glider-gun': [
                    [24,0],[22,1],[24,1],[12,2],[13,2],[20,2],[21,2],[34,2],[35,2],[11,3],[15,3],[20,3],[21,3],[34,3],[35,3],[0,4],[1,4],[10,4],[16,4],[20,4],[21,4],[0,5],[1,5],[10,5],[14,5],[16,5],[17,5],[22,5],[24,5],[10,6],[16,6],[24,6],[11,7],[15,7],[12,8],[13,8]
                ],
                'blinker': [[1,0],[1,1],[1,2]],
                'penta-decathlon': [[-4,-1],[-3,-1],[-2,0],[-1,-1],[0,-1],[1,-1],[2,-1],[3,0],[4,-1],[5,-1]]
            };
            const pattern = patterns[patternName];
            if (!pattern) return;

            const offsetX = Math.floor(this.cols / 2);
            const offsetY = Math.floor(this.rows / 2);

            pattern.forEach(([x, y]) => {
                const gridX = x + offsetX;
                const gridY = y + offsetY;
                if (gridX >= 0 && gridX < this.cols && gridY >= 0 && gridY < this.rows) {
                    this.grid[gridX][gridY] = 1;
                }
            });
        }

        drawGrid() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.drawFullGrid();
        }

        drawFullGrid() {
            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    this.drawCell(i, j);
                }
            }
        }

        drawChangedCells(changedCells) {
            changedCells.forEach(({ x, y }) => {
                this.drawCell(x, y);
            });
        }

        drawCell(x, y) {
            this.ctx.fillStyle = this.grid[x][y] ? this.aliveColor : this.deadColor;
            this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }

        getNextGeneration() {
            const nextGrid = this.createGrid();
            const changedCells = [];
            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    const neighbors = this.countNeighbors(i, j);
                    const isAlive = this.grid[i][j] === 1;
                    let nextState = this.grid[i][j];

                    if (this.currentRules === 'classic') {
                        if (isAlive && (neighbors < 2 || neighbors > 3)) {
                            nextState = 0;
                        } else if (!isAlive && neighbors === 3) {
                            nextState = 1;
                        }
                    } else if (this.currentRules === 'highlife') {
                        if (isAlive && (neighbors < 2 || neighbors > 3)) {
                            nextState = 0;
                        } else if (!isAlive && (neighbors === 3 || neighbors === 6)) {
                            nextState = 1;
                        }
                    }
                    nextGrid[i][j] = nextState;
                    if (nextState !== this.grid[i][j]) {
                        changedCells.push({ x: i, y: j });
                    }
                }
            }
            this.grid = nextGrid;
            return changedCells;
        }

        countNeighbors(x, y) {
            let count = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    const col = (x + i + this.cols) % this.cols;
                    const row = (y + j + this.rows) % this.rows;
                    count += this.grid[col][row];
                }
            }
            return count;
        }

        gameLoop(timestamp) {
            this.animationFrameId = requestAnimationFrame((t) => this.gameLoop(t));
            if (!this.isRunning) return;

            const elapsed = timestamp - this.lastUpdateTime;

            if (elapsed > this.updateInterval) {
                this.lastUpdateTime = timestamp - (elapsed % this.updateInterval);
                const changedCells = this.getNextGeneration();
                this.drawChangedCells(changedCells);
                this.generationCount++;
                this.generationCounter.textContent = this.generationCount;
            }
        }

        toggleCellState(e) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const col = Math.floor(x / this.cellSize);
            const row = Math.floor(y / this.cellSize);
            if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
                this.grid[col][row] = this.grid[col][row] ? 0 : 1;
                this.drawCell(col, row);
                this.generationCount = 0;
                this.generationCounter.textContent = this.generationCount;
            }
        }

        updateButtonState() {
            if (this.isRunning) {
                this.startPauseText.textContent = 'Pause';
                this.playIcon.classList.add('hidden');
                this.pauseIcon.classList.remove('hidden');
            } else {
                this.startPauseText.textContent = 'Start';
                this.playIcon.classList.remove('hidden');
                this.pauseIcon.classList.add('hidden');
            }
        }

        resetSimulation() {
            this.isRunning = false;
            this.loadPattern(this.patternSelector.value);
            this.drawGrid();
            this.generationCount = 0;
            this.generationCounter.textContent = this.generationCount;
            this.updateButtonState();
        }

        init() {
            this.startPauseButton.addEventListener('click', () => {
                this.isRunning = !this.isRunning;
                this.updateButtonState();
            });

            this.resetButton.addEventListener('click', () => this.resetSimulation());

            this.randomizeButton.addEventListener('click', () => {
                this.isRunning = false;
                this.grid = this.createGrid();
                this.randomizeGrid();
                this.drawGrid();
                this.generationCount = 0;
                this.generationCounter.textContent = this.generationCount;
                this.updateButtonState();
            });

            this.classicRulesButton.addEventListener('click', () => {
                this.currentRules = 'classic';
                this.classicRulesButton.classList.add('bg-green-600', 'text-white');
                this.classicRulesButton.classList.remove('text-gray-400');
                this.highlifeRulesButton.classList.remove('bg-green-600', 'text-white');
                this.highlifeRulesButton.classList.add('text-gray-400');
                this.resetSimulation();
            });

            this.highlifeRulesButton.addEventListener('click', () => {
                this.currentRules = 'highlife';
                this.highlifeRulesButton.classList.add('bg-green-600', 'text-white');
                this.highlifeRulesButton.classList.remove('text-gray-400');
                this.classicRulesButton.classList.remove('bg-green-600', 'text-white');
                this.classicRulesButton.classList.add('text-gray-400');
                this.resetSimulation();
            });

            this.canvas.addEventListener('click', (e) => this.toggleCellState(e));

            this.speedSlider.addEventListener('input', (e) => {
                this.speed = parseInt(e.target.value, 10);
                this.updateInterval = 1000 / this.speed;
            });

            this.patternSelector.addEventListener('change', () => this.resetSimulation());

            this.loadPattern(this.patternSelector.value);
            this.drawGrid();
            this.gameLoop(0);
        }
    }

    if (document.getElementById('gameOfLifeCanvas')) {
        new GameOfLife('gameOfLifeCanvas');
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
