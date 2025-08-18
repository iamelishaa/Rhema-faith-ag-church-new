import { createClient } from '../src/lib/supabase/server';
import { readFileSync } from 'fs';
import { join } from 'path';

async function applyMigrations() {
  try {
    console.log('Starting migration...');
    
    const supabase = await createClient();
    
    // Read the SQL file
    const migrationPath = join(process.cwd(), 'migrations', '20230817123000_create_profiles_table.sql');
    const sql = readFileSync(migrationPath, 'utf8');
    
    console.log('Applying migration...');
    
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec', { query: sql });
    
    if (error) {
      console.error('Error applying migration:', error);
      process.exit(1);
    }
    
    console.log('Migration applied successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Unexpected error during migration:', error);
    process.exit(1);
  }
}

applyMigrations();
