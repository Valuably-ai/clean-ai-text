import { CleanAITextOptions, CleanAITextResult } from './types';

const defaults: Required<CleanAITextOptions> = {
    removeInvisibleChars: true,
    trimTrailingWhitespace: true,
    replaceNbsp: true,
    normalizeDashes: true,
    normalizeQuotes: true,
    applyCommonFixes: true,
    restrictToKeyboardChars: false
};

/**
 * Cleans AI-generated text by removing or transforming various artifacts and formatting issues.
 * @param {string} text - The input text to clean
 * @param {Partial<CleanAITextOptions>} options - Configuration options for the cleaning process
 * @returns {CleanAITextResult} Object containing the cleaned text and number of changes made
 */
export function cleanAIText(text: string, options: Partial<CleanAITextOptions> = {}): CleanAITextResult {
    const settings = { ...defaults, ...options };
    let result = text;
    let changes = 0;
    
    // Helper function to count changes
    const replaceWithCount = (pattern: RegExp, replacement: string): void => {
        const before = result;
        result = result.replace(pattern, replacement);
        changes += (before !== result) ? 1 : 0;
    };
    
    // Remove hidden unicode symbols
    if (settings.removeInvisibleChars) {
        // Invisible formatting characters, zero-width spaces, etc.
        replaceWithCount(/[\u00AD\u180E\u200B-\u200F\u202A-\u202E\u2060\u2066-\u2069\uFEFF]/g, '');
    }
    
    // Fix quotes (both single and double)
    if (settings.normalizeQuotes) {
        replaceWithCount(/[“”«»„]/g, '"'); // Replace fancy double quotes
        replaceWithCount(/[‘’ʼ]/g, "'");   // Replace fancy single quotes
    }
    
    // Fix dashes (em and en dashes)
    if (settings.normalizeDashes) {
        replaceWithCount(/[—–]/g, '-');   // Replace em-dash and en-dash with regular dash
    }
    
    // Fix non-breaking spaces
    if (settings.replaceNbsp) {
        replaceWithCount(/\u00A0/g, ' '); // Replace non-breaking space with regular space
    }
    
    // Fix trailing whitespace
    if (settings.trimTrailingWhitespace) {
        replaceWithCount(/[ \t\x0B\f]+$/gm, ''); // Remove trailing whitespace
    }
    
    // Other common AI artifacts
    if (settings.applyCommonFixes) {
        replaceWithCount(/…/g, '...');    // Replace ellipsis
        
        // Handle multiple spaces but preserve line breaks
        replaceWithCount(/[^\S\r\n]+/g, ' '); // Replace multiple spaces/tabs with single space, but keep line breaks
        
        // Fix spaces around punctuation
        replaceWithCount(/\s+([.,;:!?])/g, '$1'); // Remove space before punctuation
        replaceWithCount(/([^\s])\s+([.,;:!?])/g, '$1$2'); // Fix spacing around punctuation
    }
    
    // Keyboard-only mode (removes non-keyboard typable characters)
    if (settings.restrictToKeyboardChars) {
        // Keep only letters, numbers, and common keyboard symbols
        const keyboardPattern = /[^\w\s~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/g;
        const beforeKeyboard = result;
        result = result.replace(keyboardPattern, '');
        if (beforeKeyboard !== result) {
            changes++;
        }
    }
    
    return {
        text: result,
        changes: changes
    };
}

// Export the types
export type { CleanAITextOptions, CleanAITextResult };

// For CommonJS default export support
const lib = {
    cleanAIText,
    default: cleanAIText
};

// For ES modules default import
export default cleanAIText;

// Export for UMD/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = lib;
}

declare global {
    interface Window {
        cleanAIText: typeof cleanAIText;
    }
}

if (typeof window !== 'undefined') {
    window.cleanAIText = cleanAIText;
}
