// B7 practice: cross-account Row Level Security test
// This file documents the RLS test performed with two authenticated users.
// No passwords, emails, or secret keys are stored here.

import { supabase } from "../../src/lib/supabase.js";

async function testCrossAccountUpdate(jobId) {
  const { data, error } = await supabase
    .from("job_listings")
    .update({ position: "RLS Test Update" })
    .eq("id", jobId)
    .select()
    .single();

  if (error) {
    console.log("Cross-account update was blocked:", error.message);
    return;
  }

  console.log("Updated row:", data);
}

export { testCrossAccountUpdate };
