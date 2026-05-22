create table if not exists perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  nombre text,
  sector text,
  sectores text[] default '{}',
  rol text default 'usuario',
  created_at timestamp default now()
);

create table if not exists kpi_deposito (
  id uuid primary key default gen_random_uuid(), fecha date not null, responsable text,
  pedidos_a_preparar integer default 0, pedidos_preparados integer default 0, pedidos_pendientes integer default 0,
  posiciones_ocupadas integer default 0, posiciones_totales integer default 0,
  incidencias_abiertas integer default 0, incidencias_cerradas integer default 0,
  observaciones text, created_at timestamp default now()
);
create table if not exists kpi_transporte (
  id uuid primary key default gen_random_uuid(), fecha date not null, responsable text,
  viajes_programados integer default 0, viajes_realizados integer default 0, viajes_demorados integer default 0, viajes_cumplidos integer default 0,
  costo_transporte numeric default 0, facturacion_despachada numeric default 0,
  observaciones text, created_at timestamp default now()
);
create table if not exists kpi_inventario (
  id uuid primary key default gen_random_uuid(), fecha date not null, responsable text,
  skus_controlados integer default 0, skus_con_diferencia integer default 0,
  unidades_teoricas integer default 0, unidades_fisicas integer default 0,
  diferencias_detectadas integer default 0, diferencias_resueltas integer default 0,
  observaciones text, created_at timestamp default now()
);
create table if not exists kpi_administracion (
  id uuid primary key default gen_random_uuid(), fecha date not null, responsable text,
  pedidos_entregados integer default 0, pedidos_entregados_a_tiempo integer default 0, pedidos_completos integer default 0, pedidos_otif integer default 0,
  remitos_pendientes integer default 0, cambios_estado_pendientes integer default 0,
  observaciones text, created_at timestamp default now()
);

alter table perfiles enable row level security;
alter table kpi_deposito enable row level security;
alter table kpi_transporte enable row level security;
alter table kpi_inventario enable row level security;
alter table kpi_administracion enable row level security;

drop policy if exists "perfiles select" on perfiles;
create policy "perfiles select" on perfiles for select using (auth.uid() = id or exists (select 1 from perfiles p where p.id = auth.uid() and p.rol = 'gerente'));
drop policy if exists "kpi deposito all" on kpi_deposito;
create policy "kpi deposito all" on kpi_deposito for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "kpi transporte all" on kpi_transporte;
create policy "kpi transporte all" on kpi_transporte for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "kpi inventario all" on kpi_inventario;
create policy "kpi inventario all" on kpi_inventario for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "kpi administracion all" on kpi_administracion;
create policy "kpi administracion all" on kpi_administracion for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
