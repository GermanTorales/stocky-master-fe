/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'custom-blue': {
          50: '#FFFFFF', // Fondo claro
          100: '#007EA7', // Texto o elementos sobre fondo oscuro
          300: '#00A7E1', // Fondo secundario o para hover ligero
          500: '#0288D1', // Fondo muy oscuro o texto sobre fondo muy claro
          700: '#003459', // Texto o íconos importantes
          900: '#00171F', // Botón primario
        },
        'custom-red': {
          50: '#ffe5e5', // Fondo claro
          100: '#ffcccc', // Fondo secundario o para hover ligero
          300: '#ff9999', // Botón primario
          500: '#ff6666', // Texto o íconos importantes
          700: '#ff3333', // Texto o elementos sobre fondo oscuro
          900: '#ff0000', // Fondo muy oscuro o texto sobre fondo muy claro
        },
        'custom-green': {
          50: '#f0fdf4', // Fondo claro
          100: '#dcfce7', // Fondo secundario o para hover ligero
          300: '#86efac', // Botón primario
          500: '#4ade80', // Texto o íconos importantes
          700: '#16a34a', // Texto o elementos sobre fondo oscuro
          900: '#064e3b', // Fondo muy oscuro o texto sobre fondo muy claro
        },
        'custom-yellow': {
          50: '#fff9e6', // Fondo claro
          100: '#ffefbf', // Fondo secundario o para hover ligero
          300: '#ffd966', // Botón primario
          500: '#ffcc33', // Texto o íconos importantes
          700: '#cc9933', // Texto o elementos sobre fondo oscuro
          900: '#805500', // Fondo muy oscuro o texto sobre fondo muy claro
        },
      },
    },
  },
  plugins: [],
}
