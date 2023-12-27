# Advent of Code with TypeScript x Bun by Joel Eisner

Joel Eisner's completed TypeScript x Bun code challenges for "Advent of Code" 2023.

## Installation

```bash
git clone git@github.com:joeleisner/advent-of-code-2023.git
cd advent-of-code-2023
bun install --production
bun run days
```

### Zero configuration

Use [GitHub Codespaces](https://docs.github.com/en/codespaces) in your browser or [Visual Studio Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) leveraging Docker to get up and running with zero configuration.

### Requirements

- [Bun@1.0.14](https://bun.sh/docs)

### Recommendations

- [Visual Studio Code](https://code.visualstudio.com/)
- [Bun for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode)
- [Prettier Formatter for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Structure

Each day can be found under the `days` directory and is roughly structured identically to other days in the project. Here are files to look out for:

1. `bench.ts` - **Where the logic is benchmarked.** This script is called when running `bun run bench <number>`.
2. `index.ts` - **Where the logic is ran.** This script is ran when running `bun run days <number>`.
3. `input_test.txt` or `input_test.*.txt` - Example inputs usually pulled directly from the AoC website and used while testing.
4. `input.txt` - The actual, personalized input from the AoC website.
5. `mod_test.ts` - **Where the logic is tested.** This script is called when running `bun test days/<number>`.
6. `mod.ts` - **Where the logic lives.** This usually includes 2 functions for each part of the code challenge, along with other functions and helpers.
7. `readme.md` - Day-specific instructions on how to run, test, and benchmark the code.

Shared code can be found under the `lib` directory, which includes useful utilities for grids, math, and matrices. The `scripts` directory contains the code for creating, running, and benchmarking any day in the project.

## Operation

### Run

```bash
# Run all completed code challenges
bun run days

# Run all but some completed code challenges
bun run days 1! 2! 3!

# Run a set of completed code challenges
bun run days 1 2 3
bun run days 01 02 03

# Run a specific completed code challenge
bun run days 1
bun run days 01
bun run days 2
bun run days 02
bun run days 3
bun run days 03
# ...
```

### Test

```bash
# Test all completed code challenges
bun test days

# Test a specifc completed code challenge
bun test days/01
bun test days/02
bun test days/03
# ...

# Test each library
bun test lib

# Test all code
bun test
```

### Benchmark

```bash
# Benchmark all completed code challenges
bun run bench

# Benchmark all but some completed code challenges
bun run bench 1! 2! 3!

# Benchmark a set of completed code challenge
bun run bench 1 2 3
bun run bench 01 02 03

# Benchmark a specific completed code challenge
bun run bench 1
bun run bench 01
bun run bench 2
bun run bench 02
bun run bench 3
bun run bench 03
# ...
```
