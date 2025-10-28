-- Enable the vector extension
create extension if not exists vector;

-- Create the docs table if it doesn't exist
create table if not exists public.docs (
  id text primary key,
  source text not null,
  content text not null,
  embedding vector(1536) not null,
  created_at timestamptz default now()
);

-- Create index for vector similarity search
create index if not exists idx_docs_embedding
  on public.docs using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Create the search function
create or replace function public.match_docs(
  query_embedding vector(1536),
  match_count int default 5,
  match_threshold float default 0.7
) returns table(
  id text,
  source text,
  content text,
  similarity float,
  created_at timestamptz
)
language sql stable as $$
  select d.id, d.source, d.content,
         1 - (d.embedding <=> query_embedding) as similarity,
         d.created_at
  from public.docs d
  where 1 - (d.embedding <=> query_embedding) >= match_threshold
  order by d.embedding <=> query_embedding
  limit match_count;
$$;

-- Enable RLS (Row Level Security) but allow all operations for now
alter table public.docs enable row level security;

-- Create policy to allow all operations (you may want to restrict this in production)
create policy "Allow all operations on docs" on public.docs
  for all using (true);

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.docs to anon, authenticated;
grant execute on function public.match_docs to anon, authenticated;