const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testSupabase() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    console.log('Connecting to Supabase...');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test connection with a simple query
    console.log('Testing connection...');
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      console.log('This might be expected if the profiles table does not exist yet.');
    } else {
      console.log('Successfully connected to Supabase!');
      console.log('Profiles table data:', data);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSupabase();
