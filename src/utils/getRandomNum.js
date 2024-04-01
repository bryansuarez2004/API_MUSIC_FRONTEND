function numeroAleatorio() {
    // Genera un número decimal aleatorio entre 0 y 1
    const randomDecimal = Math.random();
  
    // Escala el número al rango deseado (1 a 3) y redondea hacia abajo
    const numero = Math.floor(randomDecimal * 3) + 1;
  
    return numero;
  }

export {numeroAleatorio}  