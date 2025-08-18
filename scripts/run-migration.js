const { createClient } = require('@supabase/supabase-js');
const { readFileSync } = require('fs');
const { join } = require('path');
require('dotenv').config();

async function runMigration() {
  try {
    console.log('Starting migration...');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase URL or key. Please check your environment variables.');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Read the simplified SQL file
    const migrationPath = join(process.cwd(), 'migrations', 'simplified_create_profiles.sql');
    const sql = readFileSync(migrationPath, 'utf8');
    
    console.log('Applying migration...');
    
    // Split the SQL into individual statements and execute them one by one
    const statements = sql.split(';').filter(statement => statement.trim() !== '');
    
    for (const statement of statements) {
      if (statement.trim() === '') continue;
      console.log('Executing:', statement.substring(0, 100) + '...');
      
      const { error } = await supabase.rpc('exec', { query: statement });
      
      if (error && !error.message.includes('already exists')) {
        console.error('Error executing statement:', error);
        console.error('Statement:', statement);
        process.exit(1);
      } else if (error) {
        console.log('Notice (can be ignored):', error.message);
      }
    }
    
    console.log('Migration completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
