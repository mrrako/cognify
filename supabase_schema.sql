-- 1. Enable pgvector extension
create extension if not exists vector;

-- 2. Create table for notes (metadata)
create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  summary text,
  flashcards jsonb,
  quiz jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create table for document sections (chunks)
create table if not exists note_sections (
  id uuid primary key default gen_random_uuid(),
  note_id uuid references notes on delete cascade not null,
  content text not null,
  embedding vector(1536) -- OpenAI embeddings are 1536 dimensions
);

-- 4. Create function for similarity search
create or replace function match_note_sections (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  p_note_id uuid
)
returns table (
  id uuid,
  note_id uuid,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    note_sections.id,
    note_sections.note_id,
    note_sections.content,
    1 - (note_sections.embedding <=> query_embedding) as similarity
  from note_sections
  where note_sections.note_id = p_note_id
  and 1 - (note_sections.embedding <=> query_embedding) > match_threshold
  order by note_sections.embedding <=> query_embedding
  limit match_count;
end;
$$;
