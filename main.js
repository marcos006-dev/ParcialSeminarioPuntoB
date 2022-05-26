import * as tf from '@tensorflow/tfjs';

const matricesContenedor = document.getElementById('matrices');

const multiplicacionManual = document.getElementById('multiplicacionManual');
const multiplicacionTensor = document.getElementById('multiplicacionTensor');
// generar numeros aleatorios
const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// rellenar el array con numeros aleatorios
const fill2DimensionsArray = (rows, columns) => {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr.push([0]);
    for (let j = 0; j < columns; j++) {
      arr[i][j] = randomInteger(1, 100);
    }
  }

  return arr;
};
// se almacena las filas y columnas en una variable
const rows = 3;
const columns = 3;

// se llama a la funcion para rellenar el array
const matriz1 = fill2DimensionsArray(rows, columns);
const matriz2 = fill2DimensionsArray(columns, rows);

// añadir matriz a la pagina

matricesContenedor.innerHTML = `
  <h5 class="text-center">Matriz 1</h5>
  <table class="table table-striped">
    <tbody>
      ${matriz1
        .map(
          (row) =>
            `<tr>${row.map((column) => `<td>${column}</td>`).join('')}</tr>`
        )
        .join('')}
    </tbody>
  </table>
  <h5 class="text-center">Matriz 2</h5>
  <table class="table table-striped">
    <tbody>
      ${matriz2
        .map(
          (row) =>
            `<tr>${row.map((column) => `<td>${column}</td>`).join('')}</tr>`
        )
        .join('')}

    </tbody>
  </table>
`;

console.log('Primer Matriz');
console.table(matriz1);
console.table('------------------------------------------------');
console.log('Segunda Matriz');
console.table(matriz2);

// se multiplican las matrices
let matriz3 = [];

// se recorre la matriz 1
for (let i = 0; i < matriz1.length; i++) {
  matriz3[i] = [];
  // recorrer las filas de la matriz 2
  for (let j = 0; j < matriz2[0].length; j++) {
    matriz3[i][j] = 0;
    // multiplicar cada fila de la matriz 1 por cada columna de la matriz 2
    for (let k = 0; k < matriz1[0].length; k++) {
      matriz3[i][j] += matriz1[i][k] * matriz2[k][j];
    }
  }
}
console.log('Resultado de la multiplicacion manual');
console.table(matriz3);

multiplicacionManual.innerHTML = `
  <table class="table table-striped">
    <tbody>
      ${matriz3
        .map(
          (row) =>
            `<tr>${row.map((column) => `<td>${column}</td>`).join('')}</tr>`
        )
        .join('')}
    </tbody>
  </table>
`;

// se multiplican las matrices por medio de la funcion de tensor
const matrizTensor = tf.tensor2d(matriz1, [rows, columns]);
const matrizTensor2 = tf.tensor2d(matriz2, [columns, rows]);
const matrizTensor3 = matrizTensor.matMul(matrizTensor2);
console.log('Resultado de la multiplicacion tensor');
console.table(matrizTensor3.arraySync());

multiplicacionTensor.innerHTML = `
  <table class="table table-striped">
    <tbody>
      ${matrizTensor3
        .arraySync()
        .map(
          (row) =>
            `<tr>${row.map((column) => `<td>${column}</td>`).join('')}</tr>`
        )
        .join('')}
    </tbody>
  </table>
`;
