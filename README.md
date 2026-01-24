# DevKit Backend

Backend server for the Developers Kit CLI tool. This server provides the core functionality and services required by the CLI application.

## Overview

DevKit Backend is a Node.js/TypeScript backend that powers the Developers Kit CLI tool. It handles server-side operations, API endpoints, and business logic required by the CLI application.

## Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher) - JavaScript runtime and package manager
- Node.js (v18 or higher) - For compatibility
- TypeScript knowledge

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devkit-Backend
```

2. Install dependencies:
```bash
bun install
```

## Development

### Running in Development Mode

Start the development server with hot-reload:

```bash
bun run dev
```

This will run the TypeScript source files directly using Bun.

### Building for Production

Build the project to JavaScript:

```bash
bun run build
```

The compiled output will be in the `dist/` directory.

### Running the Built Version

After building, you can run the compiled version:

```bash
node dist/index.js
```

Or use the CLI command (if installed globally):

```bash
devkit
```

## Project Structure

```
devkit-Backend/
├── src/
│   └── index.ts          # Main entry point
├── dist/                 # Compiled output (generated)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Scripts

- `bun run dev` - Run the development server
- `bun run build` - Build the project for production
- `bun run test` - Run tests (currently not implemented)

## Technology Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Build Tool**: Bun (built-in bundler)

## Configuration

TypeScript configuration is defined in `tsconfig.json`. The project uses:
- ES2020 target
- CommonJS modules
- Strict type checking
- Source maps for debugging

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License

## Author

Debojeet Karmakar

## Support

For issues and questions, please open an issue on the repository.
