# Text-to-Voice Conversion: OpenAI-Speech

## Introduction

OpenAI-Speech is a Node.js library designed to transform textual input into realistic voice outputs using advanced text-to-speech technologies from providers like OpenAI and Google. This module is built to be easily integrated into various projects needing spoken output capabilities.

## Setup Instructions

### Installation Process

1. First, ensure Node.js is installed on your system.

2. To install the OpenAI-Speech module, run the following command:

```bash
npm install openai-speech
```

## How to Use

The module offers two styles of interaction – a functional interface and an object-oriented interface:
- **Functional Interface**: Ideal for applications requiring a single text-to-speech configuration across the entire application.
- **Object-Oriented Interface**: Best for applications needing different configurations or multiple service providers.

### Functional Interface Usage

This simpler, singleton-based interface suits applications using a uniform configuration:

```js
const openaiSpeech = require('openai-speech');

// Example text
const text = "Experience OpenAI-Speech in action.";

// Initialization with API key
openaiSpeech.initialize(process.env.API_KEY);

// Convert text to speech
openaiSpeech.quickSpeech(text)
    .then(audio => {
        // Work with the audio output
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

### Object-Oriented Interface Usage

This interface allows for multiple configurations and providers within the same application:

```js
const { OpenAISpeech, createProvider } = require('openai-speech');

// Repeating a text to extend its length
const longText = "Experience OpenAI-Speech in action. ".repeat(50);

// Initializing with a specific provider
const speechService = new OpenAISpeech(createProvider("Google", process.env.GOOGLE_CREDENTIALS));

// Convert longer text to speech
speechService.extendedSpeech(longText)
    .then(audio => {
        // Manage the audio output
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

### Configuring Providers

Use the `createProvider` factory to configure different providers as needed. If additional configuration is necessary, direct imports from `openai-speech/providers` may be required.

### Command Line Interface (CLI) Usage

For direct command line use, the following command converts text from a file to speech:

```bash
cat your-text-file.txt | ./bin/openai-speech-cli --provider OpenAI > output.mp3
```

## API Overview

Functions available:
- `quickSpeech(text: string, options = {}): Promise<Buffer>` – Converts text into speech quickly.
- `extendedSpeech(text: string, options = {}): Promise<Buffer>` – Handles longer text by breaking it into manageable parts.

## Example Usage

For an example setup, see the `main.js` in the project repository. Run it using your API key:

```bash
OPENAI_API_KEY="your-api-key" node main.js --provider OpenAI
```

Alternatively, you can store and use your API key from an environment file:

```bash
echo 'OPENAI_API_KEY="your-api-key"' > .env
source .env
node main.js --provider OpenAI
```

## Support and Enhancements

For any problems or improvement suggestions, please [create an issue](https://github.com/aresobus/openai-speech/issues/new) on the GitHub repository.

## Licensing

OpenAI-Speech is made available under the [MIT License](https://opensource.org/licenses/MIT), supporting free usage and distribution with appropriate credit.
