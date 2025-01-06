module.exports = (input) => {
    const inputExample = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

    const [patternsLine, designsLine] = input.split('\n\n');

    const patterns = patternsLine.split(', ');
    const designs = designsLine.split('\n');
    console.log(designs);


    let possibleDesigns = 0;

    const canConstructDesign = (design) => {
        const n = design.length;
        const dp = Array(n + 1).fill(false);
        dp[0] = true; // Base case: an empty design can always be constructed

        for (let i = 1; i <= n; i++) {
            for (const pattern of patterns) {
                const len = pattern.length;
                if (i >= len && design.slice(i - len, i) === pattern) {
                    dp[i] = dp[i] || dp[i - len];
                }
            }
        }

        return dp[n];
    };

    for (const design of designs) {
        if (canConstructDesign(design)) {
            possibleDesigns++;
        }
    }
    console.log('Possible designs: ', possibleDesigns);
}