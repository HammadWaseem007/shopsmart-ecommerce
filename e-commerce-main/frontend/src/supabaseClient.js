import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://evautumfkudquqhdeeyt.supabase.co";
// 👇 PASTE YOUR LEGACY anon public key HERE
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2YXV0dW1ma3VkcXVxaGRlZXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzI3MDQsImV4cCI6MjA5MTg0ODcwNH0.ArAVihSiDLSp_PT5GFED6w7PmetUq5HTumvSSJa3ZmE";

export const supabase = createClient(supabaseUrl, supabaseKey);