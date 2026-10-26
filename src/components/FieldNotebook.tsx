import React, { useEffect, useState } from 'react';
import { Download, NotebookPen, CheckCircle2 } from 'lucide-react';
import { ProtectedArea } from '../types';

type Entry = { observation: string; hypothesis: string; evidence: string; proposal: string };
const empty: Entry = { observation: '', hypothesis: '', evidence: '', proposal: '' };
const fields: { key: keyof Entry; label: string; hint: string }[] = [
  { key: 'observation', label: '1. ¿Qué observas?', hint: 'Describe un patrón visible: cobertura, cursos de agua, vías o asentamientos. Separa observación e interpretación.' },
  { key: 'hypothesis', label: '2. ¿Cómo lo explicarías?', hint: 'Formula una hipótesis que relacione el paisaje con la biodiversidad. ¿Qué dato necesitarías para comprobarla?' },
  { key: 'evidence', label: '3. ¿Cuál es tu evidencia?', hint: 'Anota la fuente, enlace, fecha de consulta, capa y escala. Si la fecha de la imagen es desconocida, indícalo.' },
  { key: 'proposal', label: '4. ¿Qué propones?', hint: 'Propón una acción de conservación y explica qué limitaciones tiene tu análisis.' },
];
export const FieldNotebook: React.FC<{ area: ProtectedArea }> = ({ area }) => {
  const storageKey = 'biosig-notebook-v1:' + area.id;
  const [entry, setEntry] = useState<Entry>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return Object.fromEntries(fields.map(field => [field.key, typeof parsed?.[field.key] === 'string' ? parsed[field.key] : ''])) as Entry;
    } catch { return { ...empty }; }
  });
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(entry)); setSaved(true); }
    catch { setSaved(false); }
  }, [entry, storageKey]);
  const count = fields.filter(field => entry[field.key].trim()).length;
  const download = () => {
    const lines = ['# Bitácora de exploración · BIOSIG Ecuador', '', 'Área de referencia: ' + area.name, 'Coordenadas WGS84 (latitud, longitud): ' + area.coordinates.join(', '), 'Fecha de exportación: ' + new Date().toISOString(), '', 'Ejercicio formativo. Ubicación orientativa del catálogo; no delimita un área protegida ni acredita un análisis oficial.', '', ...fields.flatMap(field => ['## ' + field.label, entry[field.key] || '(Sin registrar)', ''])];
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'biosig-bitacora-' + area.id + '.md'; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <section className="atlas-notebook" aria-labelledby="notebook-title">
    <div className="atlas-section-heading"><div><span className="atlas-eyebrow"><NotebookPen size={15} /> INVESTIGA Y REGISTRA</span><h2 id="notebook-title">Mi bitácora de exploración</h2><p>{area.name} · {count}/4 apartados con anotaciones</p></div><button className="atlas-button atlas-button-primary" onClick={download} disabled={!count}><Download size={17} /> Descargar bitácora</button></div>
    <div className="atlas-notebook-fields">{fields.map(field => <div key={field.key}><label htmlFor={'note-' + field.key}>{field.label}</label><p id={'hint-' + field.key}>{field.hint}</p><textarea id={'note-' + field.key} aria-describedby={'hint-' + field.key} value={entry[field.key]} onChange={event => setEntry(previous => ({ ...previous, [field.key]: event.target.value }))} rows={4} maxLength={6000} placeholder="Escribe tus ideas aquí…" /></div>)}</div>
    <p className="atlas-storage-note" role="status"><CheckCircle2 size={15} /> {saved ? 'Guardado en este navegador. Descarga una copia antes de cambiar de dispositivo o borrar sus datos.' : 'El navegador no permite guardar. Descarga tu bitácora para conservarla.'} No se envía a un docente ni recibe una calificación automática.</p>
  </section>;
};
