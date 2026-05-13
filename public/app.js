const STORAGE_KEY = 'votacionOpciones';

const defaultOpciones = [
  { id: '1', titulo: 'Próxima película', votos: 0 },
  { id: '2', titulo: 'Cena del fin de semana', votos: 0 },
  { id: '3', titulo: 'Actividad en grupo', votos: 0 },
];

const obtenerOpciones = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOpciones));
    return defaultOpciones;
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error leyendo las opciones:', error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOpciones));
    return defaultOpciones;
  }
};

const guardarOpciones = (opciones) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(opciones));
};

const renderOpciones = () => {
  const opciones = obtenerOpciones();
  const contenedor = document.getElementById('opcionesGrid');
  const mensaje = document.getElementById('mensajeForm');

  if (!contenedor) return;
  contenedor.innerHTML = '';

  if (opciones.length === 0) {
    mensaje.textContent = 'No hay opciones disponibles en este momento.';
    return;
  }

  mensaje.textContent = '';

  opciones.forEach((opcion) => {
    const label = document.createElement('label');
    label.className = 'opcion-item';
    label.innerHTML = `
      <input type="radio" name="opcionId" value="${opcion.id}" required />
      <div class="opcion-content">
        <span class="opcion-title">${opcion.titulo}</span>
        <span class="opcion-subtitle">Votos actuales: ${opcion.votos}</span>
      </div>
    `;
    contenedor.appendChild(label);
  });
};

const manejarVoto = (event) => {
  event.preventDefault();
  const seleccion = document.querySelector('input[name="opcionId"]:checked');
  const mensaje = document.getElementById('mensajeForm');

  if (!seleccion) {
    mensaje.textContent = 'Debes seleccionar una opción antes de votar.';
    return;
  }

  const opciones = obtenerOpciones();
  const opcion = opciones.find((item) => item.id === seleccion.value);
  if (!opcion) {
    mensaje.textContent = 'Ocurrió un error con la opción seleccionada.';
    return;
  }

  opcion.votos += 1;
  guardarOpciones(opciones);
  window.location.href = 'resultados.ejs';
};

const renderResultados = () => {
  const opciones = obtenerOpciones();
  const totalVotos = opciones.reduce((sum, opcion) => sum + opcion.votos, 0);
  const contenedor = document.getElementById('resultadosList');
  const totalLabel = document.getElementById('totalVotos');
  const opcionesLabel = document.getElementById('opcionesCount');

  if (!contenedor) return;

  totalLabel.textContent = totalVotos;
  opcionesLabel.textContent = opciones.length;

  if (opciones.length === 0) {
    contenedor.innerHTML = '<p class="info-text">No hay resultados disponibles.</p>';
    return;
  }

  contenedor.innerHTML = '';

  opciones.forEach((opcion) => {
    const porcentaje = totalVotos > 0 ? Math.round((opcion.votos / totalVotos) * 100) : 0;
    const item = document.createElement('div');
    item.className = 'resultado-item';
    item.innerHTML = `
      <div class="resultado-titulo">
        <span>${opcion.titulo}</span>
        <span class="resultado-count"><strong>${opcion.votos}</strong> votos</span>
      </div>
      <div class="barra-fondo">
        <div class="barra-progreso" style="width: ${porcentaje}%;"></div>
      </div>
      <div class="resultado-meta">
        <span>${porcentaje}% del total</span>
      </div>
    `;
    contenedor.appendChild(item);
  });
};

const reiniciarVotos = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOpciones));
  renderResultados();
};

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('votoForm');
  const resetButton = document.getElementById('reiniciarBtn');

  if (form) {
    renderOpciones();
    form.addEventListener('submit', manejarVoto);
  }

  if (document.getElementById('resultadosList')) {
    renderResultados();
  }

  if (resetButton) {
    resetButton.addEventListener('click', reiniciarVotos);
  }
});
