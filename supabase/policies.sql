-- Public readers can view posts. Only users explicitly listed in blog_admins
-- can write posts or manage images in the blog-images bucket.

create table if not exists public.blog_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.blog_admins enable row level security;
revoke all on table public.blog_admins from anon, authenticated;
grant select on table public.blog_admins to authenticated;

drop policy if exists "Admins can read own membership" on public.blog_admins;
create policy "Admins can read own membership"
on public.blog_admins
for select
to authenticated
using ((select auth.uid()) = user_id);

alter table public.posts enable row level security;

drop policy if exists "Public can read posts" on public.posts;
create policy "Public can read posts"
on public.posts
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated can insert posts" on public.posts;
drop policy if exists "Blog admins can insert posts" on public.posts;
create policy "Blog admins can insert posts"
on public.posts
for insert
to authenticated
with check (
  exists (
    select 1
    from public.blog_admins
    where user_id = (select auth.uid())
  )
);

drop policy if exists "Authenticated can update posts" on public.posts;
drop policy if exists "Blog admins can update posts" on public.posts;
create policy "Blog admins can update posts"
on public.posts
for update
to authenticated
using (
  exists (
    select 1
    from public.blog_admins
    where user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.blog_admins
    where user_id = (select auth.uid())
  )
);

drop policy if exists "Authenticated can delete posts" on public.posts;
drop policy if exists "Blog admins can delete posts" on public.posts;
create policy "Blog admins can delete posts"
on public.posts
for delete
to authenticated
using (
  exists (
    select 1
    from public.blog_admins
    where user_id = (select auth.uid())
  )
);

drop policy if exists "Authenticated can upload blog images" on storage.objects;
drop policy if exists "Blog admins can upload blog images" on storage.objects;
create policy "Blog admins can upload blog images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'blog-images'
  and exists (
    select 1
    from public.blog_admins
    where user_id = (select auth.uid())
  )
);

drop policy if exists "Authenticated can delete blog images" on storage.objects;
drop policy if exists "Blog admins can delete blog images" on storage.objects;
create policy "Blog admins can delete blog images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'blog-images'
  and exists (
    select 1
    from public.blog_admins
    where user_id = (select auth.uid())
  )
);
