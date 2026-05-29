-- V7: campos nuevos para medir exactitud real de inventario
alter table kpi_inventario
add column if not exists diferencias_pendientes_actuales integer default 0,
add column if not exists skus_totales_activos integer default 0,
add column if not exists skus_con_diferencia_pendiente integer default 0,
add column if not exists unidades_teoricas_totales integer default 0,
add column if not exists unidades_con_diferencia_pendiente integer default 0;
