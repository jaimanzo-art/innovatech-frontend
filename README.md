# Innovatech Frontend - EP2 DevOps

Frontend desarrollado para la Evaluación Parcial N°2 de la asignatura **ISY1101 Introducción a Herramientas DevOps**.

Este proyecto implementa una aplicación web con **React + Vite**, dockerizada mediante un **Dockerfile multi-stage**. La aplicación se comunica con el Backend de Innovatech Chile mediante una API REST.

El Frontend está preparado para ejecutarse en una instancia EC2 pública y consumir el Backend desplegado en una instancia EC2 privada.

---

## Integrantes

- Jaime Manzo
- Martin Silva

---

## Objetivo del proyecto

El objetivo de este repositorio es implementar el Frontend de Innovatech Chile, permitiendo:

- Visualizar una interfaz web funcional.
- Consumir datos desde el Backend mediante API REST.
- Ejecutar la aplicación localmente.
- Construir una imagen Docker optimizada.
- Servir la aplicación mediante Nginx.
- Preparar el despliegue en una instancia EC2 pública.
- Integrar el proyecto con un pipeline CI/CD mediante GitHub Actions.

---

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- HTML
- CSS
- Docker
- Nginx
- Git
- GitHub
- GitHub Actions
- AWS EC2

---

## Estructura del proyecto

```text
innovatech-frontend
├── src
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public
├── index.html
├── package.json
├── package-lock.json
├── .env
├── Dockerfile
├── nginx.conf
├── .dockerignore
└── README.md
````

---

## Descripción de archivos principales

### src/App.jsx

Archivo principal de la aplicación React. Contiene la interfaz web y las llamadas al Backend.

### src/App.css

Archivo de estilos de la aplicación.

### .env

Archivo de variables de entorno. Define la URL del Backend.

### Dockerfile

Archivo utilizado para construir la imagen Docker del Frontend.

### nginx.conf

Archivo de configuración de Nginx para servir la aplicación React construida.

### .dockerignore

Archivo que evita copiar archivos innecesarios dentro de la imagen Docker.

---

## Variables de entorno

El proyecto utiliza la siguiente variable:

```env
VITE_API_URL=http://localhost:3000
```

Descripción:

| Variable     | Descripción                                  |
| ------------ | -------------------------------------------- |
| VITE_API_URL | URL base del Backend que consume el Frontend |

En entorno local se utiliza:

```text
http://localhost:3000
```

En AWS debe cambiarse por la IP privada, dominio interno o endpoint configurado para el Backend, según la arquitectura definida.

---

## Instalación local sin Docker

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

La aplicación quedará disponible normalmente en:

```text
http://localhost:5173
```

---

## Integración con Backend

El Frontend consume los siguientes endpoints del Backend:

```http
GET /api/health
```

Este endpoint permite verificar el estado del Backend.

```http
GET /api/productos
```

Este endpoint obtiene la lista de servicios DevOps almacenados en la base de datos MySQL.

---

## Ejecución con Docker

Construir la imagen Docker:

```bash
docker build -t innovatech-frontend .
```

Ejecutar el contenedor:

```bash
docker run -d --name innovatech-frontend -p 8080:80 innovatech-frontend
```

La aplicación quedará disponible en:

```text
http://localhost:8080
```

Detener el contenedor:

```bash
docker stop innovatech-frontend
```

Eliminar el contenedor:

```bash
docker rm innovatech-frontend
```

---

## Dockerfile

El Dockerfile utiliza una estrategia **multi-stage build**.

### Etapa 1: build

Se usa `node:24-alpine` para instalar dependencias y construir la aplicación React.

### Etapa 2: production

Se usa `nginx:alpine` para servir los archivos estáticos generados en la carpeta `dist`.

Esta estrategia permite generar una imagen final más liviana, segura y optimizada para producción.

---

## Nginx

El archivo `nginx.conf` permite servir la aplicación React como sitio estático.

Configuración principal:

```nginx
server {
    listen 80;

    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

La línea `try_files $uri /index.html;` permite que React maneje correctamente las rutas internas de la aplicación.

---

## Despliegue esperado en AWS EC2

El Frontend debe desplegarse en una instancia EC2 pública.

La arquitectura esperada es:

```text
Internet
   |
EC2 Pública - Frontend React + Nginx
   |
EC2 Privada - Backend Node.js + Express
   |
Base de datos MySQL
```

La instancia Frontend debe ser accesible desde el navegador mediante IP pública o dominio.

El Backend debe mantenerse en una instancia privada, permitiendo tráfico solamente desde la instancia Frontend mediante Security Groups.

---

## Seguridad

Medidas consideradas:

* El Frontend se ejecuta dentro de un contenedor Docker.
* La imagen final usa Nginx Alpine, más liviana para producción.
* El Backend no se expone directamente a Internet.
* La URL del Backend se maneja mediante variables de entorno.
* En CI/CD se deben utilizar GitHub Secrets para credenciales.
* El despliegue se automatiza para reducir errores manuales.

---

## CI/CD esperado

El pipeline de GitHub Actions debe ejecutarse al hacer push sobre la rama:

```text
deploy
```

Flujo esperado:

```text
Push a rama deploy
        |
GitHub Actions
        |
Build imagen Docker
        |
Push a Docker Hub o ECR
        |
Deploy automático en EC2 pública
```

Este flujo permite automatizar la entrega continua del Frontend hacia AWS EC2.

---

## Relación con DevOps

Este proyecto aplica principios DevOps mediante:

* Contenedorización con Docker.
* Optimización de imagen con multi-stage build.
* Separación entre Frontend y Backend.
* Uso de variables de entorno.
* Preparación para CI/CD.
* Control de versiones con Git.
* Despliegue en infraestructura cloud AWS.

Estas prácticas favorecen la mantenibilidad, escalabilidad, trazabilidad y automatización del sistema.

---

## Estado actual del proyecto

Funcionalidades implementadas:

* Aplicación React funcionando.
* Consumo de endpoint `/api/health`.
* Consumo de endpoint `/api/productos`.
* Interfaz web de Innovatech Chile.
* Dockerfile multi-stage configurado.
* Nginx configurado.
* Imagen Docker construida.
* Contenedor ejecutado localmente.
* Preparado para despliegue en AWS EC2.

---

## Evidencia de funcionamiento

URL local en desarrollo:

```text
http://localhost:5173
```

URL local en Docker:

```text
http://localhost:8080
```

Backend consumido:

```text
http://localhost:3000/api/health
```

```text
http://localhost:3000/api/productos
```

---

## Conclusión

El Frontend de Innovatech Chile fue implementado correctamente utilizando React, Vite, Docker y Nginx.

La solución permite visualizar una interfaz web funcional, consumir datos desde el Backend y ejecutarse dentro de un contenedor optimizado para producción. Además, queda preparada para ser desplegada en AWS EC2 y automatizada mediante GitHub Actions, cumpliendo con los requerimientos de contenedorización, integración y despliegue solicitados en la Evaluación Parcial N°2.

````