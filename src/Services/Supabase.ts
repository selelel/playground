import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hjvuzqiulgfhivjzwxor.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdnV6cWl1bGdmaGl2anp3eG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwMjA1NTYsImV4cCI6MjAxNzU5NjU1Nn0.xcE_c0WOfIHxxjeJK9KT43zWUFObYzaJBXbaEykoBo0";
export const supabase = createClient(supabaseUrl, supabaseKey);
