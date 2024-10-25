import 'dotenv/config'

import { createClient } from '@supabase/supabase-js'

if (!process.env.DATABASE_HOST || !process.env.DATABASE_PASSWORD) {
    throw new Error("Missing Supabase environment variables.");
}
  

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.DATABASE_HOST, process.env.DATABASE_PASSWORD)

export const db = supabase
