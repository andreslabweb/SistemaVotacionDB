# Sistema de Votación - Frontend

Esta carpeta contiene la parte de **Persona 4 — Frontend / Vistas** del proyecto.

## Estructura

- `views/`
  - `index.ejs` — página principal de votación
  - `resultados.ejs` — página de resultados
- `public/`
  - `style.css` — estilos visuales
  - `app.js` — lógica de votos, resultados y navegación en el frontend

## Qué incluye

- Interfaz moderna y llamativa
- Botones de votación activos
- Listado de opciones con contador
- Barras de progreso animadas
- Resultados visibles con totales

## Cómo visualizar

### Opción recomendada: servidor local
1. Abre una terminal en esta carpeta:
   ```bash
   cd /home/andres/Frontend
   ```
2. Inicia un servidor local:
   ```bash
   python3 -m http.server 8000
   ```
3. Abre en el navegador:
   ```
   http://127.0.0.1:8000/views/index.ejs
   ```

> El proyecto usa plantillas `*.ejs` como vistas frontend temporales, pero funciona como frontend estático desde el navegador.

## Notas

- Este repositorio local es solo la parte de frontend; no incluye backend Node/Express.
- La lógica está basada en `localStorage` para que puedas votar y ver resultados sin servidor.
- Si quieres integrar el backend después, las vistas `index.ejs` y `resultados.ejs` ya están listas para usarse con Express.
