NEXINA CONTROL TOWER V5 - GERENCIAL

1) En la carpeta correr:
   npm install
   npm run dev

2) En Supabase > SQL Editor ejecutar en este orden:
   RUN_01_SCHEMA.sql
   RUN_02_PERFILES.sql
   RUN_03_SEED_DEMO.sql  (opcional, solo para datos de prueba)

3) En Supabase > Project Settings > API copiar:
   Project URL
   anon public key

4) Pegar esos datos en el archivo .env:
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...

5) Reiniciar la app:
   Ctrl+C
   npm run dev

NOVEDADES V5:
- Login Supabase Auth
- Perfiles por sector
- Gerente con vista completa
- Selector Hoy / Semana / Mes / Personalizado
- KPIs acumulados por período
- Comparativa vs período anterior
- Alertas inteligentes
- Carga diaria sectorizada
