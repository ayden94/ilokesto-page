export const resolveWhen = (value) => Array.isArray(value) ? value.every(Boolean) : !!value;
