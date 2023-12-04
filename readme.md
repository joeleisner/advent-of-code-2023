# Advent of Code with TypeScript x Bun by Joel Eisner

Joel Eisner's completed TypeScript x Bun code challenges for "Advent of Code" 2023.

## Installation

```bash
git clone git@github.com:joeleisner/advent-of-code-2023.git
cd advent-of-code-2023
bun install --production
bun run days
```

### Requirements

- [Bun@1.0.14](https://bun.sh/docs)

### Recommendations

- [Visual Studio Code](https://code.visualstudio.com/)
- [Bun for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode)
- [Prettier Formatter for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Or use [Visual Studio Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) to get up and running with zero configuration.

## Operation

### Run

```bash
# Run all completed code challenges
bun run days

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
