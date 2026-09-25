// Aplicacion sencilla de control de gastos
// Practica: Proceso de configuracion Docker - IDSM41

// Suma una lista de gastos y regresa el total
function calcularTotal(gastos) {
  if (!Array.isArray(gastos)) {
    throw new TypeError('Los gastos deben ser una lista');
  }
  let total = 0;
  for (const gasto of gastos) {
    if (typeof gasto !== 'number' || !Number.isFinite(gasto)) {
      throw new TypeError('Cada gasto debe ser un numero');
    }
    if (gasto < 0) {
      throw new RangeError('Un gasto no puede ser negativo');
    }
    total += gasto;
  }
  return total;
}

// Gastos de ejemplo de la practica: 100 + 50 + 100 = 250
const gastosEjemplo = [100, 50, 100];

function manejador(req, res) {
  if (req.url === '/salud') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ estado: 'ok' }));
    return;
  }
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      nombre: 'Control de gastos',
      total: calcularTotal(gastosEjemplo)
    }));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
}

module.exports = { calcularTotal, manejador };

// Si se ejecuta directamente, arranca el servidor
if (require.main === module) {
  const http = require('http');
  const puerto = process.env.PORT || 3000;
  http.createServer(manejador).listen(puerto, () => {
    console.log(`Servidor de control de gastos escuchando en el puerto ${puerto}`);
  });
}
