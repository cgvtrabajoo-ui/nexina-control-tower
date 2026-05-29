import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, CalendarDays, CheckCircle2, DollarSign, LogOut, RefreshCw, Shield, Truck, Warehouse, Boxes, Gauge, Clock, UserRound } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import './styles.css';

const demoRows = {
  kpi_administracion: [
    { fecha:'2026-05-15', pedidos_entregados:95, pedidos_entregados_a_tiempo:88, pedidos_completos:91, pedidos_otif:84, remitos_pendientes:9, cambios_estado_pendientes:6 },
    { fecha:'2026-05-16', pedidos_entregados:105, pedidos_entregados_a_tiempo:94, pedidos_completos:99, pedidos_otif:91, remitos_pendientes:7, cambios_estado_pendientes:4 },
    { fecha:'2026-05-17', pedidos_entregados:87, pedidos_entregados_a_tiempo:78, pedidos_completos:83, pedidos_otif:74, remitos_pendientes:11, cambios_estado_pendientes:8 },
    { fecha:'2026-05-18', pedidos_entregados:112, pedidos_entregados_a_tiempo:103, pedidos_completos:107, pedidos_otif:99, remitos_pendientes:5, cambios_estado_pendientes:3 },
    { fecha:'2026-05-19', pedidos_entregados:108, pedidos_entregados_a_tiempo:100, pedidos_completos:103, pedidos_otif:96, remitos_pendientes:6, cambios_estado_pendientes:2 },
    { fecha:'2026-05-20', pedidos_entregados:120, pedidos_entregados_a_tiempo:109, pedidos_completos:115, pedidos_otif:105, remitos_pendientes:8, cambios_estado_pendientes:5 },
    { fecha:'2026-05-21', pedidos_entregados:89, pedidos_entregados_a_tiempo:76, pedidos_completos:84, pedidos_otif:72, remitos_pendientes:13, cambios_estado_pendientes:7 }
  ],
  kpi_deposito: [
    { fecha:'2026-05-15', pedidos_a_preparar:120, pedidos_preparados:112, pedidos_pendientes:22, posiciones_ocupadas:3680, posiciones_totales:5000, incidencias_abiertas:6, incidencias_cerradas:16 },
    { fecha:'2026-05-16', pedidos_a_preparar:130, pedidos_preparados:124, pedidos_pendientes:18, posiciones_ocupadas:3710, posiciones_totales:5000, incidencias_abiertas:5, incidencias_cerradas:18 },
    { fecha:'2026-05-17', pedidos_a_preparar:115, pedidos_preparados:103, pedidos_pendientes:27, posiciones_ocupadas:3745, posiciones_totales:5000, incidencias_abiertas:8, incidencias_cerradas:13 },
    { fecha:'2026-05-18', pedidos_a_preparar:142, pedidos_preparados:135, pedidos_pendientes:16, posiciones_ocupadas:3810, posiciones_totales:5000, incidencias_abiertas:4, incidencias_cerradas:20 },
    { fecha:'2026-05-19', pedidos_a_preparar:136, pedidos_preparados:129, pedidos_pendientes:17, posiciones_ocupadas:3840, posiciones_totales:5000, incidencias_abiertas:6, incidencias_cerradas:19 },
    { fecha:'2026-05-20', pedidos_a_preparar:148, pedidos_preparados:139, pedidos_pendientes:20, posiciones_ocupadas:3890, posiciones_totales:5000, incidencias_abiertas:7, incidencias_cerradas:21 },
    { fecha:'2026-05-21', pedidos_a_preparar:126, pedidos_preparados:110, pedidos_pendientes:38, posiciones_ocupadas:3925, posiciones_totales:5000, incidencias_abiertas:11, incidencias_cerradas:15 }
  ],
  kpi_transporte: [
    { fecha:'2026-05-15', viajes_programados:8, viajes_realizados:8, viajes_demorados:1, viajes_cumplidos:7, costo_transporte:950000, facturacion_despachada:14500000 },
    { fecha:'2026-05-16', viajes_programados:9, viajes_realizados:9, viajes_demorados:1, viajes_cumplidos:8, costo_transporte:1010000, facturacion_despachada:15800000 },
    { fecha:'2026-05-17', viajes_programados:7, viajes_realizados:7, viajes_demorados:2, viajes_cumplidos:5, costo_transporte:880000, facturacion_despachada:12200000 },
    { fecha:'2026-05-18', viajes_programados:10, viajes_realizados:10, viajes_demorados:1, viajes_cumplidos:9, costo_transporte:1120000, facturacion_despachada:17600000 },
    { fecha:'2026-05-19', viajes_programados:9, viajes_realizados:9, viajes_demorados:1, viajes_cumplidos:8, costo_transporte:1060000, facturacion_despachada:16600000 },
    { fecha:'2026-05-20', viajes_programados:11, viajes_realizados:11, viajes_demorados:2, viajes_cumplidos:9, costo_transporte:1320000, facturacion_despachada:19100000 },
    { fecha:'2026-05-21', viajes_programados:8, viajes_realizados:8, viajes_demorados:2, viajes_cumplidos:6, costo_transporte:990000, facturacion_despachada:13900000 }
  ],
  kpi_inventario: [
    { fecha:'2026-05-15', skus_controlados:80, skus_con_diferencia:3, unidades_teoricas:5900, unidades_fisicas:5878, diferencias_detectadas:3, diferencias_resueltas:2 },
    { fecha:'2026-05-16', skus_controlados:92, skus_con_diferencia:4, unidades_teoricas:6200, unidades_fisicas:6172, diferencias_detectadas:4, diferencias_resueltas:4 },
    { fecha:'2026-05-17', skus_controlados:75, skus_con_diferencia:5, unidades_teoricas:5100, unidades_fisicas:5062, diferencias_detectadas:5, diferencias_resueltas:3 },
    { fecha:'2026-05-18', skus_controlados:100, skus_con_diferencia:2, unidades_teoricas:7300, unidades_fisicas:7289, diferencias_detectadas:2, diferencias_resueltas:2 },
    { fecha:'2026-05-19', skus_controlados:86, skus_con_diferencia:3, unidades_teoricas:6800, unidades_fisicas:6775, diferencias_detectadas:3, diferencias_resueltas:3 },
    { fecha:'2026-05-20', skus_controlados:95, skus_con_diferencia:3, unidades_teoricas:7100, unidades_fisicas:7078, diferencias_detectadas:3, diferencias_resueltas:3 },
    { fecha:'2026-05-21', skus_controlados:72, skus_con_diferencia:5, unidades_teoricas:5300, unidades_fisicas:5261, diferencias_detectadas:5, diferencias_resueltas:2 }
  ]
};

const sectorFields = {
  Deposito: ['pedidos_a_preparar','pedidos_preparados','pedidos_pendientes','posiciones_ocupadas','posiciones_totales','incidencias_abiertas','incidencias_cerradas'],
  Transporte: ['viajes_programados','viajes_realizados','viajes_demorados','viajes_cumplidos','costo_transporte','facturacion_despachada'],
  Inventario: ['skus_controlados','skus_con_diferencia','unidades_teoricas','unidades_fisicas','diferencias_detectadas','diferencias_resueltas','diferencias_pendientes_actuales','skus_totales_activos','skus_con_diferencia_pendiente','unidades_teoricas_totales','unidades_con_diferencia_pendiente'],
  Administracion: ['pedidos_entregados','pedidos_entregados_a_tiempo','pedidos_completos','pedidos_otif','remitos_pendientes','cambios_estado_pendientes']
};
const sectorTable = { Deposito:'kpi_deposito', Transporte:'kpi_transporte', Inventario:'kpi_inventario', Administracion:'kpi_administracion' };

function normalizeSectorName(value){
  const v = String(value || '').trim().toLowerCase();
  if(['deposito','depósito','almacen','almacén'].includes(v)) return 'Deposito';
  if(['transporte','trafico','tráfico'].includes(v)) return 'Transporte';
  if(['inventario','stock'].includes(v)) return 'Inventario';
  if(['administracion','administración','admin'].includes(v)) return 'Administracion';
  if(['gerencia','gerente'].includes(v)) return 'Gerencia';
  return value || 'General';
}
function fallbackProfileFromEmail(email){
  const map = {
    'cgvtrabajoo@gmail.com': {nombre:'Gabriel Velarde', sector:'Gerencia', sectores:['Deposito','Transporte','Inventario','Administracion'], rol:'gerente'},
    'rflores@nexina.com.ar': {nombre:'Gabriel Flores', sector:'Deposito', sectores:['Deposito'], rol:'usuario'},
    'lldesma@nexina.com.ar': {nombre:'Luis Ledesma', sector:'Transporte', sectores:['Transporte'], rol:'usuario'},
    'lledesma@nexina.com.ar': {nombre:'Luis Ledesma', sector:'Transporte', sectores:['Transporte'], rol:'usuario'},
    'marina.blanco@nexina.com.ar': {nombre:'Marina Blanco', sector:'Administracion', sectores:['Transporte','Administracion'], rol:'usuario'},
    'mwalker@nexina.com.ar': {nombre:'Marcelo Walker', sector:'Inventario', sectores:['Inventario'], rol:'usuario'},
    'dpierotti@nexina.com.ar': {nombre:'Daiana Pierotti', sector:'Administracion', sectores:['Administracion'], rol:'usuario'},
  };
  const base = map[String(email || '').toLowerCase()] || {nombre: email || 'Usuario', sector:'General', sectores:[], rol:'usuario'};
  return { email, ...base };
}
function accessSectors(perfil){
  if(!perfil) return [];
  if(perfil.rol === 'gerente') return Object.keys(sectorFields);
  if(Array.isArray(perfil.sectores) && perfil.sectores.length) return perfil.sectores.map(normalizeSectorName).filter(s => sectorFields[s]);
  const s = normalizeSectorName(perfil.sector);
  return sectorFields[s] ? [s] : [];
}

const labels = {
  pedidos_a_preparar:'Pedidos a preparar', pedidos_preparados:'Pedidos preparados', pedidos_pendientes:'Pedidos pendientes', posiciones_ocupadas:'Posiciones ocupadas', posiciones_totales:'Posiciones totales', incidencias_abiertas:'Incidencias abiertas', incidencias_cerradas:'Incidencias cerradas',
  viajes_programados:'Viajes programados', viajes_realizados:'Viajes realizados', viajes_demorados:'Viajes demorados', viajes_cumplidos:'Viajes cumplidos', costo_transporte:'Costo transporte', facturacion_despachada:'Facturación despachada',
  skus_controlados:'SKUs controlados', skus_con_diferencia:'SKUs con diferencia', unidades_teoricas:'Unidades teóricas', unidades_fisicas:'Unidades físicas', diferencias_detectadas:'Diferencias detectadas', diferencias_resueltas:'Diferencias resueltas', diferencias_pendientes_actuales:'Diferencias pendientes actuales', skus_totales_activos:'SKUs totales activos', skus_con_diferencia_pendiente:'SKUs con diferencia pendiente', unidades_teoricas_totales:'Unidades teóricas totales', unidades_con_diferencia_pendiente:'Unidades con diferencia pendiente',
  pedidos_entregados:'Pedidos entregados', pedidos_entregados_a_tiempo:'Pedidos entregados a tiempo', pedidos_completos:'Pedidos completos', pedidos_otif:'Pedidos OTIF', remitos_pendientes:'Remitos pendientes', cambios_estado_pendientes:'Cambios de estado pendientes'
};

function iso(d){ return d.toISOString().slice(0,10); }
function addDays(d,n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function rangeFor(period, custom){
  const today = new Date();
  if(period==='hoy') return { from: iso(today), to: iso(today), label:'Hoy' };
  if(period==='semana') return { from: iso(addDays(today,-6)), to: iso(today), label:'Últimos 7 días' };
  if(period==='mes') return { from: iso(addDays(today,-29)), to: iso(today), label:'Últimos 30 días' };
  return { from: custom.from || iso(addDays(today,-6)), to: custom.to || iso(today), label:'Personalizado' };
}
function sum(rows, key){ return rows.reduce((a,r)=>a+(Number(r[key])||0),0); }
function latest(rows, key){ return rows.length ? Number(rows[rows.length-1][key])||0 : 0; }
function pct(n,d){ return d ? +(n/d*100).toFixed(1) : 0; }
function avg(values){ return values.length ? +(values.reduce((a,b)=>a+b,0)/values.length).toFixed(1) : 0; }
function calc(rows){
  const a=rows.kpi_administracion||[], d=rows.kpi_deposito||[], t=rows.kpi_transporte||[], i=rows.kpi_inventario||[];

  const skusTotalesActivos = latest(i,'skus_totales_activos');
  const skusConDiferenciaPendiente = latest(i,'skus_con_diferencia_pendiente');
  const unidadesTeoricasTotales = latest(i,'unidades_teoricas_totales');
  const unidadesConDiferenciaPendiente = latest(i,'unidades_con_diferencia_pendiente');

  const exactitudSku = skusTotalesActivos > 0
    ? pct(skusTotalesActivos - skusConDiferenciaPendiente, skusTotalesActivos)
    : pct(sum(i,'skus_controlados')-sum(i,'skus_con_diferencia'), sum(i,'skus_controlados'));

  const exactitudUnidades = unidadesTeoricasTotales > 0
    ? +(100 - ((unidadesConDiferenciaPendiente / unidadesTeoricasTotales) * 100)).toFixed(1)
    : pct(sum(i,'unidades_fisicas'), sum(i,'unidades_teoricas'));

  return {
    otif: pct(sum(a,'pedidos_otif'), sum(a,'pedidos_entregados')),
    otd: pct(sum(a,'pedidos_entregados_a_tiempo'), sum(a,'pedidos_entregados')),
    pendientes: latest(d,'pedidos_pendientes'),
    preparados: sum(d,'pedidos_preparados'),
    despachados: sum(a,'pedidos_entregados'),
    ocupacion: pct(latest(d,'posiciones_ocupadas'), latest(d,'posiciones_totales')),
    precision: exactitudSku,
    precisionUnidades: exactitudUnidades,
    diferenciasPendientes: latest(i,'diferencias_pendientes_actuales'),
    incidenciasAbiertas: latest(d,'incidencias_abiertas'),
    costoTransporte: pct(sum(t,'costo_transporte'), sum(t,'facturacion_despachada')),
    cumplimientoTransportistas: pct(sum(t,'viajes_cumplidos'), sum(t,'viajes_programados'))
  };
}
function trendData(rows){
  const dates=[...new Set(Object.values(rows).flat().map(r=>r.fecha))].sort();
  return dates.map(fecha=>{
    const by={}; Object.keys(rows).forEach(k=>by[k]=rows[k].filter(r=>r.fecha===fecha));
    const c=calc(by); return { fecha: fecha.slice(5), OTIF:c.otif, OTD:c.otd, Ocupacion:c.ocupacion, Inventario:c.precision };
  });
}
function status(v, type){
  if(type==='inverse') return v<=6 ? 'ok' : v<=8 ? 'warn' : 'bad';
  if(type==='occupancy') return v<=75 ? 'ok' : v<=85 ? 'warn' : 'bad';
  return v>=95 ? 'ok' : v>=90 ? 'warn' : 'bad';
}
function diffText(current, previous, inverse=false){
  const diff = +(current-previous).toFixed(1);
  const good = inverse ? diff <= 0 : diff >= 0;
  return { diff, good, text: `${diff>=0?'+':''}${diff}% vs período anterior` };
}

function Login({onLogin}){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('');
  async function login(e){ e.preventDefault(); setErr(''); if(!supabase){setErr('Falta configurar Supabase en .env'); return} const {data,error}=await supabase.auth.signInWithPassword({email,password}); if(error) setErr(error.message); else onLogin(data.user); }
  return <div className="login-wrap"><form className="login-card" onSubmit={login}><div className="brand"><Activity/><div><small>NEXINA</small><h1>Control Tower</h1></div></div><p>Ingresá con tu usuario de Supabase Auth.</p><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><button>Ingresar</button>{err && <div className="error">{err}</div>} {!isSupabaseConfigured && <div className="warn-box">La app está sin Supabase configurado. Completá el archivo .env.</div>}</form></div>
}
function KpiCard({title,value,suffix='',icon:Icon,type='normal',previous}){
  const st=status(value,type); const dif=previous===undefined?null:diffText(value,previous,type==='inverse');
  return <div className={`kpi-card ${st}`}><div className="kpi-top"><span>{title}</span><Icon size={22}/></div><div className="kpi-value">{value}<small>{suffix}</small></div>{dif && <div className={`delta ${dif.good?'good':'bad'}`}>{dif.good?<ArrowUpRight size={16}/>:<ArrowDownRight size={16}/>} {dif.text}</div>}</div>
}
function PeriodSelector({period,setPeriod,custom,setCustom,range,onRefresh,loading}){
  return <div className="period-bar"><div className="period-buttons">{[['hoy','Hoy'],['semana','Semana'],['mes','Mes'],['custom','Personalizado']].map(([k,l])=><button key={k} className={period===k?'active':''} onClick={()=>setPeriod(k)}>{l}</button>)}</div>{period==='custom'&&<div className="custom-range"><input type="date" value={custom.from} onChange={e=>setCustom({...custom,from:e.target.value})}/><input type="date" value={custom.to} onChange={e=>setCustom({...custom,to:e.target.value})}/></div>}<div className="period-label"><CalendarDays size={17}/>{range.label}: {range.from} al {range.to}</div><button className="refresh" onClick={onRefresh}>{loading?<RefreshCw className="spin"/>:<RefreshCw/>} Actualizar</button></div>
}
function Dashboard({rows,prevRows,range,onRefresh,loading}){
  const k=calc(rows), p=calc(prevRows); const td=trendData(rows);
  const alerts=[];
  if(k.otif<90) alerts.push(['bad','OTIF crítico en el período seleccionado. Revisar causas de entregas incompletas o fuera de plazo.']);
  else if(k.otif<95) alerts.push(['warn','OTIF cerca de meta, pero requiere seguimiento.']);
  if(k.ocupacion>85) alerts.push(['bad','Ocupación crítica: riesgo de saturación operativa.']);
  else if(k.ocupacion>75) alerts.push(['warn','Ocupación alta: monitorear espacio y reubicaciones.']);
  if(k.incidenciasAbiertas>8) alerts.push(['bad','Incidencias abiertas elevadas. Priorizar cierre antes del fin del día.']);
  if(k.precision<98) alerts.push(['bad','Exactitud SKU debajo de 98%. Revisar diferencias pendientes de inventario.']);
  if(k.precisionUnidades<98) alerts.push(['bad','Exactitud por unidades debajo de 98%. Revisar unidades con diferencia pendiente.']);
  if(k.precision>=98 && k.precisionUnidades>=98) alerts.push(['ok','Exactitud de inventario dentro de objetivo ≥ 98%.']);
  return <main className="dashboard"><div className="kpi-grid"><KpiCard title="OTIF" value={k.otif} suffix="%" icon={CheckCircle2} previous={p.otif}/><KpiCard title="OTD" value={k.otd} suffix="%" icon={Clock} previous={p.otd}/><KpiCard title="Pendientes" value={k.pendientes} icon={AlertTriangle} type="inverse" previous={p.pendientes}/><KpiCard title="Preparados" value={k.preparados} icon={Boxes} previous={p.preparados}/><KpiCard title="Despachados" value={k.despachados} icon={Truck} previous={p.despachados}/><KpiCard title="Ocupación" value={k.ocupacion} suffix="%" icon={Warehouse} type="occupancy" previous={p.ocupacion}/><KpiCard title="Exactitud SKU" value={k.precision} suffix="%" icon={Shield} previous={p.precision}/><KpiCard title="Exactitud Unid." value={k.precisionUnidades} suffix="%" icon={Shield} previous={p.precisionUnidades}/><KpiCard title="Dif. Pendientes" value={k.diferenciasPendientes} icon={AlertTriangle} type="inverse" previous={p.diferenciasPendientes}/><KpiCard title="Incidencias" value={k.incidenciasAbiertas} icon={AlertTriangle} type="inverse" previous={p.incidenciasAbiertas}/><KpiCard title="Costo Transp." value={k.costoTransporte} suffix="%" icon={DollarSign} type="inverse" previous={p.costoTransporte}/><KpiCard title="Transportistas" value={k.cumplimientoTransportistas} suffix="%" icon={Gauge} previous={p.cumplimientoTransportistas}/></div><section className="panel-grid"><div className="panel wide"><h2>Tendencia del período</h2><ResponsiveContainer width="100%" height={310}><LineChart data={td}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)"/><XAxis dataKey="fecha" stroke="#94a3b8"/><YAxis stroke="#94a3b8"/><Tooltip contentStyle={{background:'#020617',border:'1px solid #334155',borderRadius:12}}/><Line dataKey="OTIF" stroke="#22d3ee" strokeWidth={3}/><Line dataKey="OTD" stroke="#a78bfa" strokeWidth={3}/><Line dataKey="Ocupacion" stroke="#34d399" strokeWidth={3}/><Line dataKey="Inventario" stroke="#facc15" strokeWidth={3}/></LineChart></ResponsiveContainer></div><div className="panel"><h2>Lectura gerencial</h2><div className="executive"><strong>{k.otif<90 && p.otif>=90?'Mal día/período puntual contra una base anterior mejor. No sobrerreaccionar, pero auditar causas.': k.otif>=95?'Performance saludable. Mantener foco en consistencia y costos.':'Performance aceptable, pero por debajo de excelencia. Buscar desvíos repetidos.'}</strong><p>Vista: {range.label}. El botón actualizar reconsulta Supabase y recalcula el período completo, no solo el día.</p></div><div className="alerts">{alerts.map((a,i)=><div className={`alert ${a[0]}`} key={i}>{a[0]==='ok'?<CheckCircle2/>:<AlertTriangle/>}<span>{a[1]}</span></div>)}</div></div><div className="panel"><h2>Performance por sector</h2><ResponsiveContainer width="100%" height={250}><BarChart data={[{sector:'Depósito',valor: avg(td.map(x=>x.Ocupacion))},{sector:'Transporte',valor:k.cumplimientoTransportistas},{sector:'Inventario',valor:k.precision},{sector:'Admin',valor:k.otif}]}><XAxis dataKey="sector" stroke="#94a3b8"/><YAxis stroke="#94a3b8"/><Tooltip contentStyle={{background:'#020617',border:'1px solid #334155',borderRadius:12}}/><Bar dataKey="valor" fill="#22d3ee" radius={[10,10,0,0]}/></BarChart></ResponsiveContainer></div><div className="panel"><h2>Incidencias</h2><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={[{name:'Cerradas',value:sum(rows.kpi_deposito||[],'incidencias_cerradas')},{name:'Abiertas',value:k.incidenciasAbiertas}]} dataKey="value" nameKey="name" outerRadius={88} label><Cell fill="#34d399"/><Cell fill="#f87171"/></Pie><Tooltip contentStyle={{background:'#020617',border:'1px solid #334155',borderRadius:12}}/></PieChart></ResponsiveContainer></div></section></main>
}
function DataEntry({perfil,onSaved}){
  const sectors = accessSectors(perfil);
  const [sector,setSector]=useState(sectors[0]||'Deposito'); const [form,setForm]=useState({fecha:iso(new Date()), responsable:perfil?.nombre||''}); const [msg,setMsg]=useState('');
  useEffect(()=>{ if(!sectors.includes(sector)) setSector(sectors[0]||'Deposito') },[perfil, sectors.join('|')]);
  async function save(){
    setMsg('');
    const payload={fecha:form.fecha,responsable:form.responsable,observaciones:form.observaciones||''};
    (sectorFields[sector]||[]).forEach(f=>payload[f]=Number(form[f])||0);
    if(!supabase){setMsg('Supabase no configurado.'); return}

    const table = sectorTable[sector];

    // Regla clave: 1 fecha + 1 responsable + 1 sector = 1 sola carga.
    // Si ya existe, actualiza. Si no existe, crea.
    const existing = await supabase
      .from(table)
      .select('id')
      .eq('fecha', payload.fecha)
      .eq('responsable', payload.responsable)
      .maybeSingle();

    let result;
    if(existing.data?.id){
      result = await supabase.from(table).update(payload).eq('id', existing.data.id);
    } else {
      result = await supabase.from(table).insert(payload);
    }

    if(result.error) setMsg(result.error.message);
    else {setMsg('Carga guardada/actualizada correctamente.'); onSaved();}
  }
  return <div className="entry"><div className="panel wide"><h2>Carga diaria</h2><p>{perfil?.rol === 'gerente' ? 'Gerencia puede cargar/ver todos los sectores.' : `Tu perfil tiene habilitado: ${sectors.join(' / ')}`}</p><div className="tabs">{sectors.map(s=><button key={s} className={sector===s?'active':''} onClick={()=>setSector(s)}>{s}</button>)}</div><div className="form-grid"><label>Fecha<input type="date" value={form.fecha||''} onChange={e=>setForm({...form,fecha:e.target.value})}/></label><label>Responsable<input value={form.responsable||''} onChange={e=>setForm({...form,responsable:e.target.value})}/></label>{(sectorFields[sector]||[]).map(f=><label key={f}>{labels[f]}<input type="number" value={form[f]||''} onChange={e=>setForm({...form,[f]:e.target.value})}/></label>)}<label className="full">Observaciones<textarea value={form.observaciones||''} onChange={e=>setForm({...form,observaciones:e.target.value})}/></label></div><button className="primary" onClick={save}>Guardar / Actualizar carga</button>{msg&&<div className="msg">{msg}</div>}</div></div>
}

function SectorDashboard({perfil, rows}){
  const sectors = accessSectors(perfil);
  const cards = [];
  if(sectors.includes('Deposito')){
    const d = rows.kpi_deposito || [];
    cards.push(['Pedidos preparados', sum(d,'pedidos_preparados'), Boxes], ['Pedidos pendientes', latest(d,'pedidos_pendientes'), AlertTriangle], ['Ocupación', pct(latest(d,'posiciones_ocupadas'), latest(d,'posiciones_totales')) + '%', Warehouse], ['Incidencias abiertas', latest(d,'incidencias_abiertas'), AlertTriangle]);
  }
  if(sectors.includes('Transporte')){
    const t = rows.kpi_transporte || [];
    cards.push(['Viajes realizados', sum(t,'viajes_realizados'), Truck], ['Cumplimiento', pct(sum(t,'viajes_cumplidos'), sum(t,'viajes_programados')) + '%', Gauge], ['Viajes demorados', sum(t,'viajes_demorados'), Clock], ['Costo transp.', pct(sum(t,'costo_transporte'), sum(t,'facturacion_despachada')) + '%', DollarSign]);
  }
  if(sectors.includes('Inventario')){
    const i = rows.kpi_inventario || [];
    const k = calc({kpi_inventario:i});
    cards.push(['SKUs controlados', sum(i,'skus_controlados'), Boxes], ['Exactitud SKU', k.precision + '%', Shield], ['Exactitud Unid.', k.precisionUnidades + '%', Shield], ['Dif. pendientes', k.diferenciasPendientes, AlertTriangle], ['Diferencias detectadas', sum(i,'diferencias_detectadas'), AlertTriangle], ['Diferencias resueltas', sum(i,'diferencias_resueltas'), CheckCircle2]);
  }
  if(sectors.includes('Administracion')){
    const a = rows.kpi_administracion || [];
    cards.push(['Pedidos entregados', sum(a,'pedidos_entregados'), CheckCircle2], ['OTIF', pct(sum(a,'pedidos_otif'), sum(a,'pedidos_entregados')) + '%', Gauge], ['Remitos pendientes', latest(a,'remitos_pendientes'), AlertTriangle], ['Cambios estado pend.', latest(a,'cambios_estado_pendientes'), Clock]);
  }
  return <main className="dashboard"><div className="panel wide"><h2>Panel sectorial</h2><p>Vista limitada según perfil: <strong>{sectors.join(' / ') || 'Sin sector asignado'}</strong></p></div><div className="kpi-grid">{cards.map(([title,value,Icon],i)=><div className="kpi ok" key={i}><div><small>{title}</small><strong>{value}</strong></div><Icon/></div>)}</div></main>
}

function App(){
  const [user,setUser]=useState(null), [perfil,setPerfil]=useState(null), [tab,setTab]=useState('dashboard'), [period,setPeriod]=useState('semana'), [custom,setCustom]=useState({from:'',to:''}), [rows,setRows]=useState(demoRows), [prevRows,setPrevRows]=useState(demoRows), [loading,setLoading]=useState(false);
  const range=useMemo(()=>rangeFor(period,custom),[period,custom]);
  async function loadUser(u){
    if(!u) return;
    const fallback = fallbackProfileFromEmail(u.email);
    if(!supabase){ setPerfil(fallback); return; }
    try {
      const {data,error}=await supabase.from('perfiles').select('*').eq('id',u.id).maybeSingle();
      if(error) { console.warn('No se pudo leer perfiles, uso fallback por email:', error.message); setPerfil(fallback); return; }
      setPerfil(data ? {...fallback, ...data, sectores: data.sectores || fallback.sectores} : fallback);
    } catch(e){ console.warn(e); setPerfil(fallback); }
  }
  async function fetchRows(){ setLoading(true); try{ if(!supabase){ setRows(demoRows); setPrevRows(demoRows); return; } const tables=Object.keys(demoRows); const next={}; const prev={}; const from=new Date(range.from+'T00:00:00'), to=new Date(range.to+'T00:00:00'); const days=Math.max(1,Math.round((to-from)/86400000)+1); const prevTo=iso(addDays(from,-1)), prevFrom=iso(addDays(from,-days)); for(const tbl of tables){ const {data,error}=await supabase.from(tbl).select('*').gte('fecha',range.from).lte('fecha',range.to).order('fecha'); if(error) throw error; next[tbl]=data||[]; const p=await supabase.from(tbl).select('*').gte('fecha',prevFrom).lte('fecha',prevTo).order('fecha'); prev[tbl]=p.data||[]; } setRows(next); setPrevRows(prev); } catch(e){ console.error(e); alert('Error leyendo Supabase: '+e.message); } finally{ setLoading(false); }}
  useEffect(()=>{ if(supabase){ supabase.auth.getSession().then(({data})=>{ if(data.session?.user){ setUser(data.session.user); loadUser(data.session.user); } }); }},[]);
  useEffect(()=>{ fetchRows(); },[range.from,range.to]);
  async function logout(){ if(supabase) await supabase.auth.signOut(); setUser(null); setPerfil(null); }
  if(isSupabaseConfigured && !user) return <Login onLogin={(u)=>{setUser(u); loadUser(u);}}/>;
  return <div className="app"><header className="header"><div className="brand"><Activity/><div><small>NEXINA</small><h1>Logistics Control Tower V6</h1></div></div><div className="userbox"><UserRound size={18}/><div><strong>{perfil?.nombre || 'Modo demo'}</strong><span>{perfil?.rol || 'sin login'} · {(accessSectors(perfil).join(' / ') || perfil?.sector || 'sin sector')}</span></div>{user&&<button onClick={logout}><LogOut size={16}/></button>}</div></header>{!isSupabaseConfigured&&<div className="warn-box">Modo demo: completá .env para conectar Supabase. Igual podés ver la lógica gerencial.</div>}<PeriodSelector period={period} setPeriod={setPeriod} custom={custom} setCustom={setCustom} range={range} onRefresh={fetchRows} loading={loading}/><nav className="mainnav"><button className={tab==='dashboard'?'active':''} onClick={()=>setTab('dashboard')}>Panel gerencial</button><button className={tab==='entry'?'active':''} onClick={()=>setTab('entry')}>Carga diaria</button></nav>{tab==='dashboard' ? (perfil?.rol === 'gerente' ? <Dashboard rows={rows} prevRows={prevRows} range={range} onRefresh={fetchRows} loading={loading}/> : <SectorDashboard perfil={perfil} rows={rows}/>) : <DataEntry perfil={perfil || fallbackProfileFromEmail(user?.email)} onSaved={fetchRows}/>}</div>
}

createRoot(document.getElementById('root')).render(<App/>);
