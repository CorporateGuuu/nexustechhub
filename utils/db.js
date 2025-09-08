// Database utilities for Nexus TechHub using Supabase
// Re-exports from lib/db.js for consistency

export { pool, query, getConnection, supabase } from '../lib/db.js';

export default {
  pool,
  query,
  getConnection,
  supabase
};
