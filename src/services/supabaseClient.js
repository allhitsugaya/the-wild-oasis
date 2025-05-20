import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'YOUR_URL'
const supabaseKey = 'YOUR_TOKEN'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

