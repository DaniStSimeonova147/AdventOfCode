const COOKIE_SESSION = '53616c7465645f5f3b8a4f7e7288680e75af35addef5c074ed0db13e952d87f9a05e2e21b713e47045314ddfeeb00e4f9510ff9196abfc77664969e3f1a32726';
const CURRENT_YEAR = new Date().getFullYear();
const fetchInput = async (day) => {
    const url = `https://adventofcode.com/${CURRENT_YEAR}/day/${day}/input`;

    try {
        const response = await fetch(url, {
            headers: {
                'Cookie': `session=${COOKIE_SESSION}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch input');
        }
        const input = await response.text();

        return input.trim();

    } catch (error) {
        console.log(`Error fetching input for day ${day}:`, error.message);
    }
};

module.exports = fetchInput;


// const fetchExampleInput = async () => {
//     const url = `https://adventofcode.com/${CURRENT_YEAR}/day/${CURRENT_DAY}`;

//     const response = await fetch(url);
//     const html = await response.text();

//     const matches = html.match(/<pre><code>([\s\S]*?)<\/code><\/pre>/g);

//     console.log(html

//     );


// }

// fetchExampleInput();