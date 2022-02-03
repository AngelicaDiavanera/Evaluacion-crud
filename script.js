// Declare las etiquetas html en el script
const formularioPrendaVestir = document.getElementById(
  'formulario-prenda-vestir'
);
const nombrePrendaVestir = document.getElementById('nombre-prenda-vestir');
const tallaPrendaVestir = document.getElementById('talla-prenda-vestir');
const marcaPrendaVestir = document.getElementById('marca-prenda-vestir');
const cantidadPrendaVestir = document.getElementById('cantidad-prenda-vestir');
const botonAgregarPrenda = document.getElementById('agregar');
const cuerpoTablaPrendaVestir = document.querySelector(
  '#tabla-prenda-vestir tbody'
);
const contenedorDeBottones = document.getElementById(
  'contenedor-agregar-prenda'
);
// Declaró variables
let textoFormulario = 'crear';
let prendaIndex = undefined;

// Crear variable Prenda Actual
let prendaActual = {
  nombre: '',
  talla: '',
  marca: '',
  cantidad: '',
};
// Asignación de valores campos input
nombrePrendaVestir.addEventListener('input', (event) => {
  prendaActual.nombre = event.target.value;
});
tallaPrendaVestir.addEventListener('input', (event) => {
  prendaActual.talla = event.target.value;
});
marcaPrendaVestir.addEventListener('input', (event) => {
  prendaActual.marca = event.target.value;
});
cantidadPrendaVestir.addEventListener('input', (event) => {
  prendaActual.cantidad = event.target.value;
});

// Accionar botón
botonAgregarPrenda.addEventListener('click', accionDelFormulario);

// Funciones
//1. Enlistar
function enlistarPrendaDeVestir() {
  cuerpoTablaPrendaVestir.innerHTML = '';
  prendasDeVestir.forEach((prenda, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
     <th>${index + 1}</th>
     <td>${prenda.nombre}</td>
     <td>${prenda.talla}</td>
     <td>${prenda.marca}</td>
     <td>${prenda.cantidad}</td>
     <td>
        <button 
        type="button" 
        onclick="cargarPrendaFormulario(${index})">Actualizar    
        </button>
        <button 
        type="button" 
        onclick="mostarPrenda(${index})">Ver    
        </button>
        <button 
        type="button" 
        onclick="eliminarPrenda(${index})">Eliminar
        </button>
     </td>
    `;
    cuerpoTablaPrendaVestir.appendChild(fila);
  });
}
//2. Crear
function crearPrenda() {
  prendasDeVestir.push(Object.assign({}, prendaActual));
  enlistarPrendaDeVestir();
  formularioPrendaVestir.reset();
}
//3. Texto del boton dependiendo del tipo de formulario
function textoDelBotonFormulario() {
  switch (textoFormulario) {
    case 'crear':
      botonAgregarPrenda.innerText = 'crear';
      break;
    case 'actualizar':
      botonAgregarPrenda.innerText = 'actualizar';
      break;
    default:
      break;
  }
}

// 4. Accion del formulario
function accionDelFormulario() {
  switch (textoFormulario) {
    case 'crear':
      crearPrenda();
      break;
    case 'actualizar':
      actualizarPrenda();
      break;
    default:
      break;
  }
}
//5. Boton cancelar
function botonCancelar() {
  switch (textoFormulario) {
    case 'crear':
      documnet.getElementById('boton-cancelar').remove();
      break;
    case 'actualizar':
      if (documnet.getElementById('boton-cancelar') !== null) {
        return;
      }
      const cancelar = document.createElement('button');
      cancelar.id = 'boton-cancelar';
      cancelar.innerText = 'Cancelar';
      cancelar.addEventListener('click', () => {
        cancelar.remove();
        formularioPrendaVestir.reset();
        textoDelBotonFormulario();
      });
      contenedorDeBottones.appendChild(cancelar);
      break;

    default:
      break;
  }
}
//6. Actualizar
function acualizarPrenda() {
  prendasDeVestir[prendaIndex] = Object.assign({}, actualPrenda);
  enlistarPrendaDeVestir();
  formularioPrendaVestir.reset();
  textoFormulario = 'crear';
  textoDelBotonFormulario();
  botonCancelar();
}
function cargarPrendaFormulario(index) {
  textoFormulario = 'actualizar';
  prendaIndex = index;
  actualPrenda = Object.assign({}, prendasDeVestir[index]);
  nombrePrendaVestir.value = actualPrenda.nombre;
  tallaPrendaVestir.value = actualPrenda.talla;
  marcaPrendaVestir.value = actualPrenda.marca;
  cantidadPrendaVestir.value = actualPrenda.cantidad;
  textoDelBotonFormulario();
  botonCancelar();
}
//7. ELiminar
function eliminarPrenda(index) {
  prendasDeVestir = prendasDeVestir.filter((_, i) => {
    return i !== index;
  });
  enlistarPrendaDeVestir();
}
//8. Ver
const modalHtmlElement = document.getElementById('ver-prenda');
const bootstrapModal = new bootstrap.Modal(modalHtmlElement);

function verPrenda(index) {
  const modalTitle = document.querySelector('#ver-prenda .modal-title');
  const modalBody = document.querySelector('#ver-prenda .modal-body');
  bootstrapModal.show();
  modalBody.innerHTML = `
  <ul>
    <li><b>Nombre: </b>${prendasDeVestir[index].nombre}</li>
    <li><b>Talla: </b>${prendasDeVestir[index].talla}</li>
    <li><b>Marca: </b>${prendasDeVestir[index].marca}</li>
    <li><b>Cantidad: </b>${prendasDeVestir[index].cantidad}</li>
  </ul>
  `;
  modalTitle.innerText = prendasDeVestir[index].nombre;
}

enlistarPrendaDeVestir();
