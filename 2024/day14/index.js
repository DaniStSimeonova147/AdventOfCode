module.exports = (input) => {
    const inputExample = `
p=99,5 v=2,1
`;

    const GRID_WIDTH = 101;
    const GRID_HEIGHT = 103;

    const robots = input.trim().split("\n").map(line => {
        const [p, v] = line.split(" ");
        const [px, py] = p.match(/p=(-?\d+),(-?\d+)/).slice(1).map(Number);
        const [vx, vy] = v.match(/v=(-?\d+),(-?\d+)/).slice(1).map(Number);
        return { px, py, vx, vy };

    });

    function findingPositions(robots, seconds) {
        return robots.map(robot => {
            let x = (robot.px + robot.vx * seconds) % GRID_WIDTH;
            let y = (robot.py + robot.vy * seconds) % GRID_HEIGHT;

            // Wrap-around 
            if (x < 0) x += GRID_WIDTH;
            if (y < 0) y += GRID_HEIGHT;

            return { x, y };
        });
    }

    function countQuadrants(robots) {
        const midX = Math.floor(GRID_WIDTH / 2);
        const midY = Math.floor(GRID_HEIGHT / 2);

        const quadrants = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };

        robots.forEach(({ x, y }) => {
            if (x === midX || y === midY) return;

            if (x > midX && y < midY) quadrants.Q1++;
            else if (x < midX && y < midY) quadrants.Q2++;
            else if (x < midX && y > midY) quadrants.Q3++;
            else if (x > midX && y > midY) quadrants.Q4++;
        });

        return quadrants;
    }

    function calculateSafetyFactor(quadrants) {
        return quadrants.Q1 * quadrants.Q2 * quadrants.Q3 * quadrants.Q4;
    }

    const finalPositions = findingPositions(robots, 2);

    const quadrants = countQuadrants(finalPositions);
    const safetyFactor = calculateSafetyFactor(quadrants);

    console.log("Роботи в квадрантите:", quadrants);
    console.log("Safety Factor:", safetyFactor);
}