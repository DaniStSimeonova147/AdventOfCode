module.exports = (input) => {
    function mix(secret, value) {
        return secret ^ value; // Bitwise XOR
    }

    // Helper function: Prunes the secret number
    function prune(secret) {
        return ((secret % 16777216) + 16777216) % 16777216;
    }

    // Transforms the secret number using the three steps
    function transform(secret) {
        secret = prune(mix(secret, secret * 64));

        secret = prune(mix(secret, Math.floor(secret / 32)));

        secret = prune(mix(secret, secret * 2048));

        return secret;
    }

    // Simulates the generation of a secret number for a given number of iterations
    function simulateBuyer(initialSecret, iterations) {
        let secret = initialSecret;

        for (let i = 0; i < iterations; i++) {
            secret = transform(secret);
        }

        return secret;
    }

    // Main function to calculate the sum of the 2000th secret numbers for all buyers
    function monkeyMarket(inputString, iterations) {
        const buyers = inputString.split('\n').map(Number);

        let total = 0;

        for (const buyer of buyers) {
            const finalSecret = simulateBuyer(buyer, iterations);
            total += finalSecret;
        }

        return total;
    }

    // Example input: String of initial secret numbers
    const inputString = `1
  10
  100
  2024`;
    const iterations = 2000;

    // Calculate and print the result
    const result = monkeyMarket(inputString, iterations);
    console.log("The sum of the 2000th secret numbers is:", result);
}
