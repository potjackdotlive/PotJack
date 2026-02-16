# proof-of-luck

A modern React web application built with TypeScript, Vite, and blockchain integration capabilities.

## Features

- 🚀 **Modern Stack**: Built with React 18, TypeScript, and Vite for fast development and builds
- 🔗 **Blockchain Integration**: Ethereum integration with ethers.js, viem, and wagmi
- 🎨 **UI Components**: Ant Design for consistent and accessible UI components
- 📊 **Data Visualization**: ECharts integration for interactive charts and graphs
- 🌍 **Internationalization**: i18next for multi-language support
- 🎭 **Animations**: React Spring and Motion for smooth animations
- 📱 **Responsive Design**: Modern styling with Emotion and utility classes
- 🔍 **Developer Experience**: ESLint, Prettier, TypeScript, and Husky for code quality

## Tech Stack

### Core

- **React** 18.3.1 - UI library
- **TypeScript** ~5.8.3 - Type safety
- **Vite** 6.3.1 - Build tool and dev server

### Blockchain

- **ethers.js** 6.14.0 - Ethereum library
- **viem** 2.29.0 - TypeScript Ethereum interface
- **wagmi** 2.15.5 - React hooks for Ethereum
- **TypeChain** 8.3.2 - TypeScript bindings for smart contracts

### UI & Styling

- **Ant Design** 5.25.3 - Component library
- **Emotion** 11.14.0 - CSS-in-JS
- **React Spring** 9.7.5 - Animation library
- **Motion** 12.11.0 - Animation library
- **Geist Font** - Modern typography

### Data & State

- **TanStack Query** 5.77.2 - Data fetching and caching
- **Big.js** 7.0.1 - Arbitrary precision arithmetic
- **Lodash ES** 4.17.12 - Utility functions
- **date-fns** 4.1.0 - Date manipulation

### Visualization

- **ECharts** 5.6.0 - Charting library
- **React CountUp** 6.5.3 - Animated counters
- **React Blockies** 1.4.1 - Ethereum address identicons

## Prerequisites

- Node.js (version 16 or higher recommended)
- Yarn 1.22.22 (managed by packageManager field)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd proof-of-luck

# Install dependencies
yarn install
```

## Development

```bash
# Start development server
yarn dev

# Type checking
yarn tsc

# Linting
yarn lint

# Generate TypeScript types for smart contracts
yarn generateTypes
```

## Building

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

## Smart Contract Integration

This project includes TypeChain integration for generating TypeScript types from smart contract ABIs:

1. Place your contract JSON files in `src/contractsRaw/`
2. Run `yarn generateTypes` to generate TypeScript bindings
3. Generated types will be available in `src/contracts/Lottery/`
4. Export generated abi by adding "export" in the "Lottery__factory.ts" file
5. Update contract addresses in the "src/utils/contractAddresses.ts"

## Project Structure

```
src/
├── contracts/        # Generated contract types
├── contractsRaw/     # Contract ABI JSON files
└── ...              # Application source code
```

## Code Quality

The project enforces code quality through:

- **ESLint** - Code linting with React, TypeScript, and i18next rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files
- **branch-name-lint** - Enforce branch naming conventions

Pre-commit hooks automatically:

- Fix ESLint issues
- Format code with Prettier
- Ensure zero ESLint warnings
