V6 - Permisos por sector

1) Reemplazar la carpeta anterior por esta.
2) Copiar el .env de la versión anterior, si ya lo tenías configurado.
3) Ejecutar:
   npm install
   npm run dev

Supabase:
- Ya deberías haber corrido RUN_01_SCHEMA.sql, RUN_02_PERFILES.sql y RUN_03_SEED_DEMO.sql.
- Si al loguearte aparece un perfil incorrecto o vacío, corré RUN_04_FIX_PERFILES_RLS.sql.

Comportamiento esperado:
- Gabriel gerente: ve todos los sectores y selector Deposito/Transporte/Inventario/Administracion en carga diaria.
- Depósito: solo carga Depósito.
- Transporte: solo carga Transporte.
- Inventario: solo carga Inventario.
- Administración: solo carga Administración.
- Marina: ve Transporte y Administración.
