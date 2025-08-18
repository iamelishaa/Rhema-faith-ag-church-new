export default function TestPage() {
  return (
    <div>
      <h1>Environment Variables Test</h1>
      <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not Set'}</p>
      <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not Set'}</p>
    </div>
  );
}
