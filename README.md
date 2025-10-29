# Trabajo Práctico Node.js - Mongoose

Este es un Trabajo Práctico para la materia **Base de Datos 2**.

**Autor:** Rodrigo Ramirez
**Institución:** UTN FRM (Universidad Tecnológica Nacional, Facultad Regional Mendoza)

---

## 🔧 Instalación y Puesta en Marcha

Sigue estos pasos para levantar el proyecto localmente.

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y copia el siguiente contenido:

```env
MONGO_USER=root
MONGO_PASS=pass
PORT=3000
MONGO_URL=mongodb://root:pass@localhost:27018/biblioteca?authSource=admin
```
### 2. Levantar la Base de Datos

Este proyecto utiliza Docker Compose para correr la base de datos MongoDB.

```bash
docker-compose up -d
```
### 3. Instalar las dependencias
Instalar las dependencias de Node.js

```bash
npm install
```

### 4. Iniciar el servidor

Iniciar el servidor en modo desarrollo (nodemon)
```bash
npm run dev
```
El servidor estará corriendo en http://localhost:3000.