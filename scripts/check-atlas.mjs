import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const server = spawn('bun', ['run', 'preview', '--host', '127.0.0.1', '--port', '4173'], { stdio: 'inherit' });
let browser;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch('http://127.0.0.1:4173')).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, 'El servidor de producción debe arrancar');
  browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
  await mkdir('artifacts', { recursive: true });
  for (const width of [390, 820, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 960 }, acceptDownloads: true });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    // Deterministic tiles: tests cover UI, not third-party service uptime.
    await page.route(/tile\.openstreetmap\.org/, route => route.fulfill({
      status: 200, contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="#dfe7d6"/><path d="M0 180Q90 30 256 80M0 210Q140 80 256 120" stroke="#acbda3" fill="none"/></svg>'
    }));
    await page.goto('http://127.0.0.1:4173');
    await page.getByRole('heading', { name: /El territorio/ }).waitFor();
    assert.equal(await page.getByRole('button', { name: /Mi progreso: 0 de 4/ }).count(), 1);
    await page.screenshot({ path: 'artifacts/inicio-' + width + '.png', fullPage: true });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Inicio sin desbordamiento a ' + width);
    await page.getByRole('button', { name: 'Explorar el mapa', exact: true }).last().click();
    await page.getByRole('heading', { name: /Lee el territorio/ }).waitFor();
    await page.getByRole('textbox', { name: 'Buscar área o provincia' }).fill('Cotopaxi');
    await page.getByRole('button', { name: /Parque Nacional Cotopaxi/ }).click();
    await page.getByLabel('1. ¿Qué observas?', { exact: true }).fill('Observo una transición de cobertura que requiere contraste.');
    await page.getByLabel('3. ¿Cuál es tu evidencia?', { exact: true }).fill('Mapa base de prueba; fecha de imagen no verificada.');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Descargar bitácora' }).click();
    const download = await downloadPromise;
    assert.match(download.suggestedFilename(), /pn-cotopaxi\.md$/);
    const originalHeight = await page.locator('.atlas-map-canvas').evaluate(element => element.clientHeight);
    await page.getByRole('button', { name: 'Ampliar mapa', exact: true }).click();
    assert.ok(await page.locator('.atlas-map-canvas').evaluate(element => element.clientHeight) > originalHeight, 'El mapa ampliado debe ofrecer más espacio');
    await page.getByRole('button', { name: 'Reducir mapa', exact: true }).click();
    await page.locator('.leaflet-control-attribution').getByRole('link', { name: 'OpenStreetMap', exact: true }).waitFor();
    assert.ok(await page.locator('.leaflet-tile').first().getAttribute('src').then(src => src.startsWith('https://tile.openstreetmap.org/')), 'Usa el servidor de mapas abiertos');

    // Selection replaces the previous surface; its projected bounds fit inside the map.
    const surface = page.locator('.atlas-selected-surface');
    assert.equal(await surface.count(), 1, 'Solo debe existir una superficie resaltada');
    const cotopaxiPath = await surface.getAttribute('d');
    await page.getByRole('textbox', { name: 'Buscar área o provincia' }).fill('Yasuní');
    await page.getByRole('button', { name: /Parque Nacional Yasuní/ }).click();
    assert.equal(await surface.count(), 1, 'El cambio de área debe retirar el polígono anterior');
    assert.notEqual(await surface.getAttribute('d'), cotopaxiPath, 'Debe cambiar el contorno seleccionado');
    await page.locator('.atlas-map-sketch').getByText('Parque Nacional Yasuní', { exact: true }).waitFor();
    assert.ok(await page.locator('.atlas-map-canvas').evaluate(container => {
      const shape = container.querySelector('.atlas-selected-surface').getBoundingClientRect();
      const frame = container.getBoundingClientRect();
      return shape.left >= frame.left && shape.top >= frame.top && shape.right <= frame.right && shape.bottom <= frame.bottom;
    }), 'La superficie completa debe caber dentro del mapa');
    // Return to the original notebook to also verify per-area persistence.
    await page.getByRole('textbox', { name: 'Buscar área o provincia' }).fill('Cotopaxi');
    await page.getByRole('button', { name: /Parque Nacional Cotopaxi/ }).click();

    await page.getByRole('textbox', { name: 'Buscar área o provincia' }).fill('noexiste123');
    await page.getByText('No hay coincidencias.', { exact: false }).waitFor();
    await page.getByRole('button', { name: 'Restablecer filtros' }).click();
    await page.screenshot({ path: 'artifacts/mapa-' + width + '.png', fullPage: true });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Mapa sin desbordamiento a ' + width);
    // Remount the map and notebook through navigation.
    await page.getByRole('button', { name: 'BIOSIG Ecuador, inicio' }).click();
    await page.getByRole('button', { name: 'Explorar el mapa', exact: true }).last().click();
    assert.equal(await page.getByLabel('1. ¿Qué observas?', { exact: true }).inputValue(), 'Observo una transición de cobertura que requiere contraste.');
    await page.getByRole('button', { name: 'BIOSIG Ecuador, inicio' }).click();
    if (width <= 900) await page.getByRole('button', { name: 'Abrir menú' }).click();
    const nav = page.getByRole('navigation', { name: width <= 900 ? 'Navegación móvil' : 'Navegación principal', exact: true });
    await nav.getByRole('button', { name: 'Aprender', exact: true }).click();
    await page.getByRole('button', { name: /Unidad 2: Ecuador Megadiverso/ }).waitFor();
    if (width <= 900) await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.getByRole('navigation', { name: width <= 900 ? 'Navegación móvil' : 'Navegación principal', exact: true }).getByRole('button', { name: 'Mi aprendizaje', exact: true }).click();
    await page.getByRole('button', { name: 'Rúbricas de Desempeño', exact: true }).click();
    const rubric = page.getByRole('region', { name: 'Rúbrica de aprendizaje para docentes de Química y Biología' });
    await rubric.waitFor();
    assert.equal(await rubric.getByRole('article').count(), 4);
    await rubric.getByText('Ver niveles de desempeño', { exact: true }).first().click();
    await rubric.getByText('Necesita acompañamiento para ubicar el lugar y reconocer elementos del mapa.', { exact: true }).waitFor();
    assert.ok(!(await rubric.innerText()).includes('Rigor Cartográfico'));
    assert.deepEqual(errors, [], 'Sin errores JavaScript a ' + width);
    await context.close();
  }
  // A failed map must remain recoverable without losing the rest of the UI.
  const errorPage = await browser.newPage();
  let failTiles = true;
  await errorPage.route(/tile\.openstreetmap\.org/, route => failTiles ? route.abort() : route.fulfill({
    status: 200, contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="#dfe7d6"/></svg>'
  }));
  await errorPage.goto('http://127.0.0.1:4173');
  await errorPage.getByRole('button', { name: 'Reintentar', exact: true }).waitFor();
  await errorPage.getByRole('link', { name: 'Abrir en OpenStreetMap', exact: true }).waitFor();
  failTiles = false;
  await errorPage.getByRole('button', { name: 'Reintentar', exact: true }).click();
  await errorPage.getByText('Mapa abierto · puntos de referencia educativos', { exact: true }).waitFor();
  await errorPage.close();
  // Invalid persisted progress must not crash the application.
  const page = await browser.newPage();
  await page.addInitScript(() => localStorage.setItem('biosig_completed_guides', '{"invalid":true}'));
  await page.route(/tile\.openstreetmap\.org/, route => route.abort());
  await page.goto('http://127.0.0.1:4173');
  await page.getByRole('heading', { name: /El territorio/ }).waitFor();
  console.log('Atlas verificado: navegación, filtros, notas, descarga y tamaños de pantalla.');
} finally { await browser?.close(); server.kill(); }
