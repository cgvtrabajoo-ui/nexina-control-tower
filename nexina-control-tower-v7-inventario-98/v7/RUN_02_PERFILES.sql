insert into perfiles (id, email, nombre, sector, sectores, rol)
select id, email,
  case
    when email = 'cgvtrabajoo@gmail.com' then 'Gabriel Velarde'
    when email = 'rflores@nexina.com.ar' then 'Gabriel Flores'
    when email = 'lldesma@nexina.com.ar' then 'Luis Ledesma'
    when email = 'marina.blanco@nexina.com.ar' then 'Marina Blanco'
    when email = 'mwalker@nexina.com.ar' then 'Marcelo Walker'
    when email = 'dpierotti@nexina.com.ar' then 'Daiana Pierotti'
    else email end,
  case
    when email = 'cgvtrabajoo@gmail.com' then 'Gerencia'
    when email = 'rflores@nexina.com.ar' then 'Deposito'
    when email = 'lldesma@nexina.com.ar' then 'Transporte'
    when email = 'marina.blanco@nexina.com.ar' then 'Administracion'
    when email = 'mwalker@nexina.com.ar' then 'Inventario'
    when email = 'dpierotti@nexina.com.ar' then 'Administracion'
    else 'General' end,
  case
    when email = 'cgvtrabajoo@gmail.com' then array['Deposito','Transporte','Inventario','Administracion']
    when email = 'marina.blanco@nexina.com.ar' then array['Transporte','Administracion']
    when email = 'rflores@nexina.com.ar' then array['Deposito']
    when email = 'lldesma@nexina.com.ar' then array['Transporte']
    when email = 'mwalker@nexina.com.ar' then array['Inventario']
    when email = 'dpierotti@nexina.com.ar' then array['Administracion']
    else array['General'] end,
  case when email = 'cgvtrabajoo@gmail.com' then 'gerente' else 'usuario' end
from auth.users
where email in ('cgvtrabajoo@gmail.com','rflores@nexina.com.ar','lldesma@nexina.com.ar','marina.blanco@nexina.com.ar','mwalker@nexina.com.ar','dpierotti@nexina.com.ar')
on conflict (email) do update set
  nombre = excluded.nombre,
  sector = excluded.sector,
  sectores = excluded.sectores,
  rol = excluded.rol;
