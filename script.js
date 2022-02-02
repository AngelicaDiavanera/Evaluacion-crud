const cuerpoTablaPrendas = document.querySelector('#tabla-prenda-vestir tbody');
const formularioDePrenda = document.getElementById('formulario-prenda-vestir');
const agregarPrenda = document.getElementById('agregar');

let prendaIndex = undefined;
let crearPrenda = 'crear';

const nombreField = document.querySelector('[name="nombre-prenda-vestir"]');
const tallaField = document.querySelector('[name="talla-prenda-vestir"]');
const marcaField = document.querySelector('[name="marca-prenda-vestir"]');
const cantidadField = document.querySelector('[name="cantidad-prenda-vestir"]');

let currentPrendaVestir = {
  nombre: '',
  talla: '',
  marca: '',
  cantidad: '',
};

nombreField.addEventListener('input', (event) => {
  currentPrendaVestir.nombre = event.target.value;
});

tallaField.addEventListener('input', (event) => {
  currentPrendaVestir.talla = event.target.value;
});

marcaField.addEventListener('input', (event) => {
  currentPrendaVestir.marca = event.target.value;
});

cantidadField.addEventListener('input', (event) => {
  currentPrendaVestir.cantidad = event.target.value;
});

const accionAgregarPrenda = document.getElementById(
  'contenedor-agregar-prenda'
);

agregarPrenda.addEventListener('click', listaDePrendas);

function listaDePrendas() {
  cuerpoTablaPrendas.innerHTML = '';
  prendasDeVestir.forEach((prenda, index) => {
    const prendaRow = document.createElement('tr');
    prendaRow.innerHTML = `
       <th>${index + 1}</th>

       <td>${prenda.nombre}</td>
       <td>${prenda.talla}</td>
       <td>${prenda.marca}</td>
       <td>${prenda.cantidad}</td>
       <td>
       <button 
          type="button" 
          onclick=""
        >
          Actualizar
        </button>
        <button 
          type="button" 
          onclick=""
        >
          Ver
        </button>
        <button 
          type="button"
          onclick=""
        >
          Eliminar
        </button>
      </td>
      `;
    cuerpoTablaPrendas.appendChild(prendaRow);
  });
}

function accionDeFormularioPrenda() {
  switch (crearPrenda) {
    case 'crear':
      createPrenda();
      break;

    case 'actualizar':
      updatePrenda();
      break;
    default:
      break;
  }
}

function accionBotonTexto() {
  switch (crearPrenda) {
    case 'create':
      agregarPrenda.innerText = 'Crear';
      break;
    case 'update':
      agregarPrenda.innerText = 'Modificar';
      break;
    default:
      break;
  }
}

function createPrenda() {
  prendasDeVestir.push(Object.assign({}, currentPrendaVestir));
  listaDePrendas();
  formularioDePrenda.reset();
}

listaDePrendas();

/*function updatePrenda() {
  prendasDeVestir[prendaIndex] = Object.assign({}, currentPrendaVestir);
  listaDePrendas();
  formularioDePrenda.reset();
  crearPrenda = 'crear';
}
*/
