-- Jalankan seluruh SQL ini di Supabase > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.players (
  id uuid primary key,
  nickname text not null check (char_length(nickname) <= 30),
  class_code text not null default 'UMUM' check (char_length(class_code) <= 20),
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  score integer not null default 0,
  total integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  question_id text not null,
  category text not null,
  answer text not null,
  correct boolean not null default false
);

-- Akses basis data dilakukan melalui API server dengan service-role key.
-- Jangan pernah menaruh SUPABASE_SERVICE_ROLE_KEY di variabel NEXT_PUBLIC.
alter table public.players enable row level security;
alter table public.attempts enable row level security;
alter table public.attempt_answers enable row level security;
