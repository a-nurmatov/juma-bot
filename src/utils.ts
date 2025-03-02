export function log(type: 'info' | 'warn' | 'error', message: string, error?: any) {
  const prefix = type === 'info' ? 'ℹ️' : type === 'warn' ? '⚠️' : '❌';
  if (type === 'info' || type === 'warn') {
    console.log(`${prefix} ${message}`);
  } else {
    console.error(`${prefix} ${message}`, error instanceof Error ? error.message : error);
  }
}