/**
 * Namespace-based logger for filtered debug output.
 *
 * Usage:
 *   import { createLogger } from '../utils/logger';
 *   const log = createLogger('Auth');
 *
 *   log.debug('Signing in...', data);    // Filtered by namespace
 *   log.warn('Retry attempt 3');          // Filtered + suppressible
 *   log.error('Critical failure!', err);  // Always prints
 *
 * Filtering:
 *   ENABLED_NAMESPACES = 'Auth'           → Only [Auth] logs
 *   ENABLED_NAMESPACES = 'Auth,Search'    → Multiple namespaces
 *   ENABLED_NAMESPACES = '*'              → Show all logs
 *   ENABLED_NAMESPACES = ''               → Suppress all (errors still print)
 */

// ========================================
// LOG FILTER CONFIGURATION
// ========================================

// Comma-separated namespaces to show. '*' = all, '' = none.
const ENABLED_NAMESPACES = '*';

// Set to true to hide all warnings globally
const SUPPRESS_WARNINGS = false;

// Available namespaces in this project:
// (Add namespaces here as you create them)
//   - App: General application logs
//   - Auth: Authentication flow
//   - Search: Property search
//   - Map: Map rendering and geo queries
//   - API: Backend API calls

// ========================================
// Logger Implementation
// ========================================

const IS_DEV = typeof __DEV__ !== 'undefined' ? __DEV__ : true;

const shouldLog = (namespace: string): boolean => {
  if (ENABLED_NAMESPACES === '*') return true;
  if (!ENABLED_NAMESPACES) return false;

  const prefixes = ENABLED_NAMESPACES.split(',').map((ns) => ns.trim());
  return prefixes.some((prefix) => namespace.startsWith(prefix));
};

interface Logger {
  debug: (...args: unknown[]) => void;
  log: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

export const createLogger = (namespace: string): Logger => {
  const prefix = `[${namespace}]`;

  return {
    debug: (...args: unknown[]) => {
      if (!IS_DEV) return;
      if (shouldLog(namespace)) console.log(prefix, ...args);
    },

    log: (...args: unknown[]) => {
      if (!IS_DEV) return;
      if (shouldLog(namespace)) console.log(prefix, ...args);
    },

    info: (...args: unknown[]) => {
      if (!IS_DEV) return;
      if (shouldLog(namespace)) console.log(prefix, ...args);
    },

    warn: (...args: unknown[]) => {
      if (!IS_DEV) return;
      if (SUPPRESS_WARNINGS) return;
      if (shouldLog(namespace)) console.warn(prefix, ...args);
    },

    error: (...args: unknown[]) => {
      console.error(prefix, ...args);
    },
  };
};

export const logger = createLogger('App');
