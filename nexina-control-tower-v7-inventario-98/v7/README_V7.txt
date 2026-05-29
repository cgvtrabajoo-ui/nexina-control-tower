V7 - Inventario 98% + anti duplicados

1) Ejecutar en Supabase: RUN_05_INVENTARIO_EXACTITUD.sql
2) Reemplazar archivos o usar esta carpeta completa.
3) npm install
4) npm run dev
5) git add .
6) git commit -m "V7 exactitud inventario y actualizar carga diaria"
7) git push

Cambios:
- Inventario ahora carga campos de exactitud SKU y unidades.
- El panel muestra Exactitud SKU, Exactitud Unidades y Diferencias Pendientes.
- Guardar carga ahora actualiza la carga existente del mismo día/responsable en vez de insertar siempre.
- Fecha dinámica real.
