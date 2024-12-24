export function generateUniqueEmail(prefix = 'user') {
    const uniqueId = Date.now();
    return `${prefix}${uniqueId}@gmail.com`;
  }