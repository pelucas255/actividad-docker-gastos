// Pruebas unitarias de la aplicacion de control de gastos
const { test } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const { calcularTotal, manejador } = require('../src.js');

// 1) Suma de tres gastos: 100 + 50 + 100 = 250
test('suma de tres gastos da el total correcto', () => {
  assert.strictEqual(calcularTotal([100, 50, 100]), 250);
});

// 2) Una lista vacia regresa 0
test('lista vacia regresa total 0', () => {
  assert.strictEqual(calcularTotal([]), 0);
});

// 3) Se rechaza una cantidad negativa
test('rechaza un gasto negativo', () => {
  assert.throws(() => calcularTotal([100, -20]), RangeError);
});

// 4) La ruta /salud responde con estado ok
test('la ruta /salud responde con estado ok', async () => {
  const servidor = http.createServer(manejador);
  await new Promise((resuelve) => servidor.listen(0, resuelve));
  const puerto = servidor.address().port;
  const cuerpo = await new Promise((resuelve, rechaza) => {
    http.get(`http://127.0.0.1:${puerto}/salud`, (resp) => {
      let datos = '';
      resp.on('data', (trozo) => { datos += trozo; });
      resp.on('end', () => resuelve(datos));
    }).on('error', rechaza);
  });
  servidor.close();
  assert.deepStrictEqual(JSON.parse(cuerpo), { estado: 'ok' });
});
