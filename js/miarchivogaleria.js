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
    const precios = {
      "Iron-man": 20000,
      "Capitan-America": 20000,
      Hulk: 10000,
      "Viuda-Negra": 80000,
      Hawkeye: 50000,
      Loki: 20000,
      "Spider-Man": 25000,
      Thor: 15000,
      Groot: 15000,
      Thanos: 20000,
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

const mp = new MercadoPago("TEST-251821c0-4597-4dab-8868-dd908972a5bf", {
  locale: "es-AR",
});

document.getElementById("checkout-btn").addEventListener("click", async () => {
  try {
    const orderData = {
      title: "Poductos",
      quantity: 1,
      price: document.getElementById("total").innerText,
    };

    const response = await fetch("http://localhost:3001/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const preference = await response.json();
    createCheckoutButton(preference.id);
  } catch (error) {
    alert("error");
  }
});

const createCheckoutButton = (preferenceId) => {
  const bricksBuilder = mp.bricks();

  const renderComponent = async () => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
    });
  };
  renderComponent();
};
