-- Ejecutar si los usuarios entran pero la app no lee su perfil.
-- Habilita políticas para que cada usuario pueda leer su perfil y gerencia pueda ver todos.

alter table perfiles enable row level security;

drop policy if exists "usuarios leen su propio perfil" on perfiles;
create policy "usuarios leen su propio perfil"
on perfiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "gerente lee todos los perfiles" on perfiles;
create policy "gerente lee todos los perfiles"
on perfiles for select
to authenticated
using (
  exists (
    select 1 from perfiles p
    where p.id = auth.uid()
      and p.rol = 'gerente'
  )
);

-- Este bloque corrige lldesma/lledesma si quedó creado con una variante.
update perfiles
set nombre = 'Luis Ledesma', sector = 'Transporte', sectores = array['Transporte'], rol = 'usuario'
where email in ('lldesma@nexina.com.ar','lledesma@nexina.com.ar');
