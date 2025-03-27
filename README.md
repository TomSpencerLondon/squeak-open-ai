# SqueakJS with OpenAI Integration

This project integrates SqueakJS (Smalltalk in the browser) with OpenAI's API to provide intelligent error analysis and learning assistance for Smalltalk development.

## Features

- Browser-based Smalltalk development environment using SqueakJS
- Real-time error analysis using OpenAI
- WebSocket integration for live updates
- Modern web interface with responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TomSpencerLondon/squeak-open-ai.git
cd squeak-open-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Start the server:
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

- Use `Cmd-d` (Mac) or `Ctrl-d` (Windows/Linux) to execute Smalltalk code ("Do it")
- When errors occur, they will be automatically analyzed by OpenAI to provide helpful insights
- The interface provides both the Smalltalk development environment and AI-powered assistance

## Development

The project structure:
- `server.js` - Express server with OpenAI integration
- `public/` - Frontend files including SqueakJS implementation
- `public/index.html` - Main web interface

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
