export interface CleanAITextOptions {
    removeInvisibleChars?: boolean;
    trimTrailingWhitespace?: boolean;
    replaceNbsp?: boolean;
    normalizeDashes?: boolean;
    normalizeQuotes?: boolean;
    applyCommonFixes?: boolean;
    restrictToKeyboardChars?: boolean;
}

export interface CleanAITextResult {
    text: string;
    changes: number;
}
