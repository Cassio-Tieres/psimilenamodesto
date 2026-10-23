# Acesso ao painel do blog

O login usa Supabase Auth, mas uma conta autenticada só pode administrar o blog se também estiver em `public.blog_admins`. A associação fica no banco, não em uma lista de UUIDs no código.

## Aplicar as políticas

Execute `supabase/policies.sql` no SQL Editor do Supabase. O script cria `blog_admins`, permite que cada usuário autenticado consulte apenas a própria associação e restringe escrita de posts e imagens aos usuários listados.

## Adicionar uma conta administradora

Depois de criar ou convidar a conta em **Authentication → Users**, execute no SQL Editor, trocando o e-mail pelo da conta:

```sql
insert into public.blog_admins (user_id)
select id
from auth.users
where email = 'admin@example.com'
on conflict (user_id) do nothing;
```

Se nenhuma linha for inserida, confirme que a conta já existe em Authentication → Users e que o e-mail está correto. Para remover o acesso, remova a linha correspondente em **Table Editor → public.blog_admins**. A remoção da conta em Auth também remove a associação pela chave estrangeira.

A tabela não permite escrita pelo site. Gerencie as associações pelo painel do Supabase, com uma conta administrativa do projeto.
