
# Gestión de Destinos Turísticos - Frontend

Este proyecto es la interfaz de usuario desarrollada con **React** para gestionar usuarios y destinos turísticos. Permite asignar destinos a usuarios y realizar operaciones CRUD sobre usuarios y destinos, además de imprimir facturas de usuarios con destinos asignados.

---

## **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión 14 o superior).
- **npm** o **yarn** (se incluye con Node.js).
- **Backend del Proyecto**: El backend debe estar ejecutándose para que el frontend funcione correctamente. Puedes encontrar el README del backend [aquí](link-a-readme-backend).

---

## **Clonar el Proyecto y Configuración Inicial**

1. **Clona el repositorio desde GitHub:**

   ```bash
   git clone https://github.com/tuusuario/gestion-destinos-frontend.git
   cd gestion-destinos-frontend
   ```

2. **Instala las dependencias necesarias:**

   ```bash
   npm install
   ```
   O si prefieres usar **yarn**:
   ```bash
   yarn install
   ```

3. **Configura el archivo de conexión al backend:**

   Crea un archivo `.env` en la raíz del proyecto y define la URL del backend:

   ```env
   REACT_APP_BACKEND_URL=http://localhost:8080
   ```

   Asegúrate de que el backend esté configurado y ejecutándose en el puerto `8080`.

---

## **Puesta en Marcha**

1. **Inicia el servidor de desarrollo:**

   ```bash
   npm start
   ```

   O con **yarn**:

   ```bash
   yarn start
   ```

2. **Abre el navegador en:**

   ```
   http://localhost:3000
   ```

3. Asegúrate de que el backend esté corriendo para que las funcionalidades de la API funcionen correctamente.

---

## **Estructura del Proyecto**

```plaintext
src
├── components         # Componentes reutilizables como modales y tablas
│   ├── Header.jsx     # Encabezado de la aplicación
│   ├── Footer.jsx     # Pie de página de la aplicación
│   ├── Modal.jsx      # Modal reutilizable
│   ├── UserTable.jsx  # Tabla de usuarios con funcionalidades CRUD
│   └── DestinationTable.jsx # Tabla de destinos con funcionalidades CRUD
├── pages              # Páginas principales
│   ├── Home.jsx       # Página de inicio con usuarios y destinos asignados
│   ├── Usuarios.jsx   # Página para gestionar usuarios
│   ├── Destinos.jsx   # Página para gestionar destinos
│   └── NotFound.jsx   # Página de error para rutas no existentes
├── api.js             # Configuración de Axios para las llamadas a la API
├── App.jsx            # Configuración principal de React Router
├── index.jsx          # Punto de entrada principal
└── styles             # Estilos generales del proyecto
    └── index.css      # Archivo CSS principal
```

---

## **Guía de Pruebas de Funcionalidades**

### **1. Página de Inicio**

- **URL:** `/`
- **Funcionalidades:**
  - Muestra todos los usuarios con sus destinos asignados.
  - Si un usuario no tiene destinos, aparece un botón **"Asignar Destino"**.
  - Si un usuario tiene destinos, aparece un botón **"Imprimir Factura"**.

### **2. Gestión de Usuarios**

- **URL:** `/usuarios`
- **Funcionalidades:**
  - Crear, editar y eliminar usuarios.
  - Asignar destinos turísticos a usuarios desde la página principal.

### **3. Gestión de Destinos**

- **URL:** `/destinos`
- **Funcionalidades:**
  - Crear, editar y eliminar destinos turísticos.

### **4. Rutas No Existentes**

- **URL:** Cualquier ruta no definida.
- **Funcionalidad:**
  - Muestra una página de error con el mensaje **"Página no encontrada"**.

---

## **Configuración Avanzada**

### **Personalizar la URL del Backend**

Si el backend está en una URL o puerto diferente, actualiza el archivo `.env`:

```env
REACT_APP_BACKEND_URL=http://mi-backend.com:puerto
```

Luego, reinicia el servidor de desarrollo:

```bash
npm start
```

---

## **Solución de Problemas**

### **1. Problemas de Conexión con el Backend**

- Asegúrate de que el backend esté corriendo y accesible en la URL definida en el archivo `.env`.
- Verifica que el archivo `.env` esté correctamente configurado.
- Si el backend usa CORS, asegúrate de que permita solicitudes desde `http://localhost:3000`.

### **2. Problemas con las Dependencias**

- Si encuentras errores relacionados con dependencias, ejecuta:
  ```bash
  npm install
  ```
  O con **yarn**:
  ```bash
  yarn install
  ```

### **3. Error de CORS**

Si el navegador bloquea las solicitudes al backend debido a CORS:
- Configura el backend para permitir solicitudes desde el origen del frontend.
- Ejemplo en Spring Boot:

  ```java
  @Bean
  public WebMvcConfigurer corsConfigurer() {
      return new WebMvcConfigurer() {
          @Override
          public void addCorsMappings(CorsRegistry registry) {
              registry.addMapping("/**")
                      .allowedOrigins("http://localhost:3000")
                      .allowedMethods("GET", "POST", "PUT", "DELETE");
          }
      };
  }
  ```

### **4. Error de Carga de Archivos Estáticos**

Si los estilos o scripts no se cargan correctamente:
- Asegúrate de que el servidor de desarrollo esté corriendo en `http://localhost:3000`.
- Si estás usando una ruta base diferente en producción, configura `homepage` en `package.json`.

---

## **Despliegue en Producción**

1. **Construye el proyecto:**
   ```bash
   npm run build
   ```

2. **Sirve los archivos estáticos:**
   Los archivos generados estarán en la carpeta `build`. Puedes servirlos con cualquier servidor web, como Nginx, Apache o el servidor del backend.

3. **Configura el backend para servir el frontend:**
   - Copia los archivos del directorio `build` al directorio estático del backend.
   - Configura Spring Boot para servir archivos estáticos desde el directorio `resources/static`.

