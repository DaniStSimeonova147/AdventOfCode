module.exports = (input) => {
    const inputExample = `
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
`;

    const connections = input.trim().split("\n").map(connection => connection.split("-"));

    const triads = [];

    for (let i = 0; i < connections.length; i++) {
        const [a, b] = connections[i];
        for (let j = i + 1; j < connections.length; j++) {
            const [c, d] = connections[j];

            const shared = [a, b].filter(node => [c, d].includes(node));
            if (shared.length === 1) {
                const third1 = [a, b].find(node => !shared.includes(node));
                const third2 = [c, d].find(node => !shared.includes(node));

                if (connections.some(([x, y]) =>
                    (x === third1 && y === third2) || (x === third2 && y === third1)
                )) {
                    const triad = [shared[0], third1, third2].sort();

                    if (!triads.some(existing => existing.join(",") === triad.join(","))) {
                        triads.push(triad);
                    }
                }
            }
        }
    }

    const filteredTriads = triads.filter(triad =>
        triad.some(computer => computer.startsWith("t"))
    );

    console.log('Total triads', triads.length);
    console.log('Triads with a name that starts with t', filteredTriads.length);
}