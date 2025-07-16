🛒 Entrega Final    
Talento Tech es una tienda online desarrollada como proyecto final para el curso de React JS de Talento Tech Buenos Aires Aprende

🚀 Características

📦 Listado de productos desde API externa

➕ Agregar productos personalizados

🛒 Carrito de compras con suma, resta y eliminación de ítems

🔐 Login con autenticación simulada

🛠 Dashboard de administrador

🧾 Confirmaciones y notificaciones con React Toastify

🔍 Filtros por precio, búsqueda y categoría

🔰 SEO optimizado con React Helmet

📂 Estructura del proyecto

🔐 Rutas protegidas

src/
│
├── components/       # Navbar, Footer, Cards, FormularioDePago,Loading.
├── context/          # Contextos globales: Auth, Productos, Carrito, Pagination.
├── screens/          # Páginas: Home, Admin, Carrito, Login, etc.
├── styles/           # Archivos CSS
├── App.jsx           # Rutas principales
└── main.jsx          # Punto de entrada


📦 Requisitos
Node.js >= 16.x

npm o yarn

🔧 Instalación
Cloná el repositorio:


git clone https://github.com/tu-usuario/talento-tech.git
cd talento-tech
Instalá las dependencias:


npm install
# o
yarn install
▶️ Ejecución en desarrollo

npm run dev
# o
yarn dev
Esto abrirá la app en: http://localhost:5173

🔑 Acceso al panel de administración
Puedes iniciar sesión desde la ruta /login con las siguientes credenciales de prueba:


Usuario: admin
Contraseña: 1234
Una vez logueado, accedé a /admin para gestionar productos.

🧪 Herramientas y librerías usadas
React Router – Routing

React Context API – Estado global

React Toastify – Notificaciones

React Helmet – SEO y metadatos

FakeStoreAPI – Fuente de datos de productos


🛠 Scripts útiles

npm run dev       # Modo desarrollo
npm run build     # Construye versión de producción
npm run preview   # Sirve build local para prueba



Hecho por Ulises Molina

