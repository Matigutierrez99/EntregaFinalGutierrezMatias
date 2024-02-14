/* const Producto = function (nombre, precio, stock) {
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
};

let producto1 = new Producto("Iron Man", 20000, 100);
let producto2 = new Producto("Capitan America", 18000, 150);
let producto3 = new Producto("Hulk", 12000, 200);
let producto4 = new Producto("Viuda Negra", 11000, 180);
let producto5 = new Producto("Hawkeye", 9000, 300);
let producto6 = new Producto("Loki", 20000, 110);
let producto7 = new Producto("Spider Man", 22000, 80);
let producto8 = new Producto("Thor", 17000, 150);
let producto9 = new Producto("Groot", 15000, 220);
let producto10 = new Producto("Thanos", 20000, 95);

let lista = [
  producto1,
  producto2,
  producto3,
  producto4,
  producto5,
  producto6,
  producto7,
  producto8,
  producto9,
  producto10,
];

let total = 0;
let productosComprados = [];

function buscarProductoEnLista(nombreProducto) {
  return lista.find(
    (producto) => producto.nombre.toUpperCase() === nombreProducto
  );
}

function procesarCompra() {
  let productoBuscado = prompt("¿Qué personaje de Marvel deseas comprar?")
    .trim()
    .toUpperCase();

  let productoEncontrado = buscarProductoEnLista(productoBuscado);

  if (productoEncontrado) {
    alert(
      `Producto encontrado:\nNombre: ${productoEncontrado.nombre}\nPrecio: $${productoEncontrado.precio}`
    );

    if (productoEncontrado.stock > 0) {
      productoEncontrado.stock--;

      total += productoEncontrado.precio;

      productosComprados.push(productoEncontrado.nombre);

      alert(
        "Compra realizada:\nNombre: " +
          productoEncontrado.nombre +
          "\nTotal acumulado: $" +
          total
      );
    } else {
      alert("Lo siento, este producto está agotado.");
    }
  } else {
    alert(`Producto no encontrado: ${productoBuscado}`);
  }

  let quiereMas = confirm("¿Desea seguir comprando?");

  if (quiereMas) {
    procesarCompra();
  } else {
    alert(
      "Gracias por tu compra. Productos comprados: " +
        productosComprados.join(", ") +
        "\nTotal de la compra: $" +
        total
    );
  }
}

procesarCompra();
 */

//pagina heroes

let formularioHeroes = document.getElementById("formularioHeroes");
formularioHeroes.addEventListener("submit", function (e) {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let fecha = document.getElementById("fecha").value;
  let descripcion = document.getElementById("descripcion").value;
  let especie = document.getElementById("especie").value;
  let poderesSeleccionados = [];
  document
    .querySelectorAll('input[name="poderes"]:checked')
    .forEach(function (checkbox) {
      poderesSeleccionados.push(checkbox.value);
    });

  let tipoPersonaje = document.querySelector('input[name="personaje"]:checked');
  let imagen = document.getElementById("imagen");
  let imagenFileName = imagen.files.length > 0 ? imagen.files[0].name : null;

  let datos = {
    nombre: nombre,
    fecha: fecha,
    descripcion: descripcion,
    especie: especie,
    poderes: poderesSeleccionados,
    tipoPersonaje: tipoPersonaje ? tipoPersonaje.value : null,
    imagen: imagenFileName,
  };

  let datosJson = JSON.stringify(datos);

  localStorage.setItem("Heroe", datosJson);
  mostrarDatosEnPagina(datosJson);
});

function mostrarDatosEnPagina(datos) {
  let mostrarDatos = document.getElementById("mostrarDatos");
  let parrafo = document.createElement("p");
  parrafo.textContent = "Felicidades!! Creaste a tu heroe.";
  mostrarDatos.appendChild(parrafo);
}
