-- B5 practice: grants and Row Level Security
-- This file is for interview practice only and is not run on the live database.

grant update
  on table public.job_listings_practice
  to authenticated;

create policy "Users can update their own practice job listings"
  on public.job_listings_practice
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);