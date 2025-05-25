# Clean AI Text Library

A TypeScript/JavaScript library for cleaning AI-generated text by removing or transforming various artifacts and formatting issues.

## Installation

### Via npm (for Node.js/bundlers):
```bash
npm install clean-ai-text-lib
```

### Via CDN (for browsers):
```html
<!-- Minified production version -->
<script src="https://cdn.jsdelivr.net/npm/clean-ai-text-lib/dist/clean-ai-text.min.js"></script>

<!-- Development version with source maps -->
<!-- <script src="https://cdn.jsdelivr.net/npm/clean-ai-text-lib/dist/clean-ai-text.dev.js"></script> -->
```

## Usage

### In Node.js/TypeScript:

```typescript
import { cleanAIText, CleanAITextOptions } from 'clean-ai-text-lib';

const options: CleanAITextOptions = {
    removeInvisibleChars: true,     // Remove hidden unicode characters
    trimTrailingWhitespace: true,   // Remove trailing whitespace
    replaceNbsp: true,              // Replace non-breaking spaces
    normalizeDashes: true,          // Normalize dashes
    normalizeQuotes: true,          // Normalize quotes
    applyCommonFixes: true,         // Other common fixes
    restrictToKeyboardChars: false  // Remove non-keyboard typable characters
};

const result = cleanAIText('Your AI-generated text here', options);
console.log(result.text);       // Cleaned text
console.log(result.changes);    // Number of changes made
```

### In Browser (Global Variable):

```html
<script src="path/to/clean-ai-text.min.js"></script>
<script>
    const result = window.cleanAIText('Your AI-generated text here');
    console.log(result.text);    // Cleaned text
    console.log(result.changes); // Number of changes made
</script>
```

## Build Outputs

The build process generates the following files in the `dist` directory:

- `clean-ai-text.lib.js` - UMD module for Node.js and bundlers
- `clean-ai-text.min.js` - Minified production version for browsers
- `clean-ai-text.dev.js` - Development version with source maps
- TypeScript type definitions (`.d.ts` files)

## Options

All options are optional and default to `true`:

- `removeInvisibleChars`: Remove hidden unicode characters (zero-width spaces, etc.)
- `trimTrailingWhitespace`: Remove trailing whitespace
- `replaceNbsp`: Replace non-breaking spaces with regular spaces
- `normalizeDashes`: Normalize different types of dashes to a regular dash
- `normalizeQuotes`: Normalize different types of quotes to standard ASCII quotes
- `applyCommonFixes`: Apply other common fixes (ellipsis, multiple spaces, etc.)
- `restrictToKeyboardChars`: Remove all non-keyboard typable characters (use with caution)

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the library: `npm run build`
4. Run tests: `npm test`

## Building for Production

```bash
npm run build
```

This will generate optimized builds in the `dist` directory.
