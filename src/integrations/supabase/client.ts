// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://goucigwcepxyiwluubcc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdWNpZ3djZXB4eWl3bHV1YmNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NDczOTEsImV4cCI6MjA2NDQyMzM5MX0.az9WLJ70b277mXY_Q9U2dds4ba8WKzIKatGCpD77VqY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);