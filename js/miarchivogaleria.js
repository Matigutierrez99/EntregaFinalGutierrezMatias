document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-comprar");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total");
  let carrito = [];

  buttons.forEach((button) => {
    button.addEventListener("click", agregarAlCarrito);
  });

  function agregarAlCarrito(event) {
    const producto = event.target.getAttribute("data-producto");
    const precio = obtenerPrecioProducto(producto);

    const item = {
      producto: producto,
      precio: precio,
    };

    carrito.push(item);

    mostrarCarrito();
  }

  function obtenerPrecioProducto(producto) {
    // Aquí puedes implementar la lógica para obtener el precio del producto.
    // Puedes almacenar los precios en un objeto o array.
    // Por ejemplo:
    const precios = {
      "Iron-man": 200,
      "Capitan-America": 200,
      Hulk: 100,
      "Viuda-Negra": 80,
      Hawkeye: 50,
      Loki: 200,
      "Spider-Man": 250,
      Thor: 150,
      Groot: 150,
      Thanos: 200,
    };

    return precios[producto] || 0;
  }

  function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.producto} - $${item.precio}`;
      listaCarrito.appendChild(li);
    });

    calcularTotal();
  }

  function calcularTotal() {
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalCarrito.textContent = total;
  }
});
