import { createClient } from '@supabase/supabase-js'


const token = import.meta.env.VITE_TOKEN
export const supabaseUrl = 'https://rfhtbdhpgwsvvxfkcyvu.supabase.co'
const supabaseKey = token
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

