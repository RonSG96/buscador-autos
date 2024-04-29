//!: Variables de elementos
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const pmin = document.querySelector('#minimo');
const pmax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//!: contenedor de resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

for (let i = max; i >= min; i--) {
  const opcion = document.createElement('option');
  opcion.value = i;
  opcion.textContent = i;
  year.appendChild(opcion); //Agrega las opciones de año al select
}

//? Objeto para busqueda
const busqueda = {
  marca: '',
  anio: '',
  pMin: '',
  pMax: '',
  puertas: '',
  transmision: '',
  color: '',
};

//!Eventos
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos); //muestra los automoviles al cargar
});

marca.addEventListener('change', (e) => {
  busqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener('change', (e) => {
  busqueda.anio = parseInt(e.target.value);
  filtrarAuto();
});

pmin.addEventListener('change', (e) => {
  busqueda.pMin = Number(e.target.value);
  filtrarAuto();
});

pmax.addEventListener('change', (e) => {
  busqueda.pMax = Number(e.target.value);
  filtrarAuto();
});

puertas.addEventListener('change', (e) => {
  busqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});

transmision.addEventListener('change', (e) => {
  busqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener('change', (e) => {
  busqueda.color = e.target.value;
  filtrarAuto();

  console.log(busqueda);
});

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//!: Funciones
function mostrarAutos(autos) {
  limpiarHTML();

  autos.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;

    const autoHTML = document.createElement('p');

    autoHTML.textContent = `
      ${marca} -
      ${modelo} -
      ${year} -
      ${precio} -
      ${puertas} -
      ${color} -
      ${transmision}
      `;

    resultado.appendChild(autoHTML);
  });
}
//Genera los años del select

function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  console.log(resultado);
  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function filtrarMarca(auto) {
  const { marca } = busqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { anio } = busqueda;

  if (anio) {
    return auto.year === anio;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { pMin } = busqueda;
  if (pMin) {
    return auto.precio >= pMin;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { pMax } = busqueda;
  if (pMax) {
    return auto.precio <= pMax;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = busqueda;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = busqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = busqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement('div');
  noResultado.classList.add('alerta', 'error');
  noResultado.appendChild(document.createTextNode('No hay Resultados'));
  document.querySelector('#resultado').appendChild(noResultado);
}
