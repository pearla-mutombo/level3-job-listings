-- B4 practice: data types, defaults, and constraints
-- This file is for interview practice only and is not run on the live database.
-- This gives a simple example showing a data type, a default value, and a constraint.

create table public.job_listings_practice (
  id uuid primary key default gen_random_uuid(),
  company text not null check (length(btrim(company)) between 2 and 100),
  languages text[] not null default '{}'::text[]
);