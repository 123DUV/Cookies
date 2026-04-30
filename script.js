let pedido=JSON.parse(localStorage.getItem('carritoGuardado')) || [];
actualizarContador();



function actualizarCarrito(){
  localStorage.setItem('carritoGuardado', JSON.stringify(pedido));
}
function quitarDelCarrito(id){
  const buscarProducto = pedido.find(item=>item.id===id);
  if(buscarProducto){
    if(buscarProducto.cantidad>1){
      buscarProducto.cantidad-=1;
    }else{
      pedido = pedido.filter(item=>item.id !== id)
    }
    actualizarCarrito();
  actualizarContador();
  console.log("restando", pedido)
  }
  
}
function agregarAlCarrito(id, nombre, precio){
  const buscarProducto = pedido.find(item=>item.id===id);
  if(buscarProducto){
    buscarProducto.cantidad+=1;
  }else{
  const productoNuevo={
    id:id,
    nombre:nombre,
    precio:precio,
    cantidad:1
  };
  pedido.push(productoNuevo);
  }
  console.log(pedido);
  actualizarCarrito();
  actualizarContador();
}

function actualizarContador(){
  document.querySelectorAll('[id^="qty-"]').forEach(span=>{
    span.innerText="0";
  });
  pedido.forEach(producto=>{
    const span = document.getElementById(`qty-${producto.id}`);
    if(span){
      span.innerText=producto.cantidad;
    }
  });
  
  
}

function enviarAlWhatsApp() {
  if (pedido.length === 0) {
    alert("El carrito está vacío. ¡Agrega unas galletas primero!");
    return;
  }

  const telefono = "573134114485"; // Tu número (ya lo tienes en el footer)
  let mensaje = "¡Hola Titi's Cookies! 🍪\n";
  mensaje += "Me gustaría hacer el siguiente pedido:\n\n";
  
  let granTotal = 0;

  // Recorremos el array 'pedido' para armar el texto
  pedido.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    granTotal += subtotal;
    
    // Formato: *Nombre* xCantidad = $Subtotal
    mensaje += `✅ *${item.nombre}*\n`;
    mensaje += `   ${item.cantidad} unidad(es) x $${item.precio}\n`;
    mensaje += `   *Subtotal: $${subtotal}*\n\n`;
  });

  mensaje += "--------------------------\n";
  mensaje += `💰 *TOTAL A PAGAR: $${granTotal}*\n`;
  mensaje += "--------------------------\n\n";
  mensaje += "¿Me confirman disponibilidad y envío? Gracias.";

  // Codificamos el mensaje para que WhatsApp lo entienda (espacios, saltos de línea, etc.)
  const mensajeFinal = encodeURIComponent(mensaje);
  
  // Abrimos el enlace en una pestaña nueva
  window.open(`https://wa.me/${telefono}?text=${mensajeFinal}`, '_blank');
}
