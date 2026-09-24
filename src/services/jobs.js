import { supabase } from '../lib/supabase'

export async function getJobs() {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}
