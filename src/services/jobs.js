import { supabase } from "../lib/supabase";

export async function getJobs() {
  const { data, error } = await supabase
    .from("job_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function createJob(job) {
  const { data, error } = await supabase
    .from("job_listings")
    .insert(job)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getJobById(id) {
  const { data, error } = await supabase
    .from("job_listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
// CRUD: Update
export async function updateJob(id, updates) {
  const { data, error } = await supabase
    .from("job_listings")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
// CRUD : Delete
export async function deleteJob(id) {
  const { error } = await supabase.from("job_listings").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
