const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkTables() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('Checking database tables...');
    
    // Check if profiles table exists
    const { data: tables, error } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');

    if (error) {
      console.error('Error checking tables:', error);
      return;
    }

    console.log('\nAvailable tables in public schema:');
    tables.forEach(table => console.log(`- ${table.tablename}`));
    
    // Check if profiles table exists
    const profilesTableExists = tables.some(table => table.tablename === 'profiles');
    
    if (profilesTableExists) {
      console.log('\nProfiles table exists! Checking structure...');
      
      // Get table structure
      const { data: columns, error: columnError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type')
        .eq('table_name', 'profiles')
        .eq('table_schema', 'public');

      if (columnError) {
        console.error('Error checking table structure:', columnError);
        return;
      }

      console.log('\nProfiles table structure:');
      columns.forEach(col => console.log(`- ${col.column_name} (${col.data_type})`));
    } else {
      console.log('\nProfiles table does not exist. Please run the migration first.');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkTables();
