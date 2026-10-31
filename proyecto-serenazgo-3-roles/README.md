# Sistema Inclusivo de Atención de Serenazgo - PC11

## Descripción
Aplicación web funcional académica con tres roles diferenciados:
1. Ciudadano
2. Serenazgo
3. Administrador

## Credenciales de prueba

### Ciudadano
- Correo: `ciudadano@demo.com`
- Contraseña: `Ciudadano123`

### Serenazgo
- Correo: `sereno@demo.com`
- Contraseña: `Sereno123`

### Administrador
- Correo: `admin@demo.com`
- Contraseña: `Admin123`

Las credenciales NO se muestran en el inicio de sesión y deben entregarse en la documentación de evaluación.

## Funciones por rol

### Ciudadano
- Registrar solicitudes
- Elegir Violencia, Robo, Accidente, Auxilio u Otros
- Si elige Otros, debe describir el problema
- Confirmar ubicación simulada
- Adjuntar evidencia opcional
- Obtener código de solicitud
- Consultar seguimiento
- Ver historial de solicitudes

### Serenazgo
- Solo ve los casos asignados a su código de sereno
- Puede avanzar estados de sus casos
- Consulta su historial atendido
- Registra un informe o descripción de cierre
- Ve su unidad, zona y resumen personal

### Administrador
- Dashboard general
- Revisa todas las solicitudes
- Asigna solicitudes a serenos habilitados
- Avanza estados
- Habilita o deshabilita serenos
- Consulta usuarios y configuración del prototipo

## Datos simulados incluidos
El sistema inicia con solicitudes y serenos ficticios para que los tres perfiles tengan información visible desde la primera ejecución.

## Cómo ejecutar en VS Code
1. Abrir la carpeta del proyecto.
2. Instalar Live Server.
3. Abrir `index.html`.
4. Clic derecho → Open with Live Server.
5. Iniciar sesión con una de las credenciales de este documento.

## Publicación en GitHub
Este proyecto se puede subir normalmente a GitHub porque es HTML, CSS y JavaScript estático.

Para publicarlo:
1. Crear un repositorio.
2. Subir todos los archivos del proyecto.
3. Activar GitHub Pages desde Settings → Pages.
4. Seleccionar la rama principal y la carpeta raíz.

### Importante
La autenticación y los datos son simulados en JavaScript/localStorage. Esto es válido para la modalidad académica frontend de demostración, pero NO sería seguridad adecuada para una aplicación real.

No usar datos personales reales ni contraseñas reales.

## Limitaciones
- No usa base de datos real.
- localStorage solo guarda información en el mismo navegador/dispositivo.
- Las cuentas son de demostración.
- No existe integración real con la Municipalidad, PNP, RENIEC u otras entidades.
