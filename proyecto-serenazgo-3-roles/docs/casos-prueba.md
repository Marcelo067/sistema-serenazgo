# Casos de prueba funcionales sugeridos

| Caso | Rol | Acción | Resultado esperado |
|---|---|---|---|
| PF-01 | General | Abrir index.html | Aparece login sin credenciales visibles |
| PF-02 | General | Credenciales incorrectas | Mensaje claro de error |
| PF-03 | Ciudadano | Seleccionar un incidente | Solo una tarjeta queda seleccionada |
| PF-04 | Ciudadano | Seleccionar Otros sin descripción | No permite continuar |
| PF-05 | Ciudadano | Registrar una solicitud válida | Genera código SER-XXXXXX |
| PF-06 | Ciudadano | Consultar código inexistente | Mensaje de error |
| PF-07 | Admin | Asignar un sereno | Solicitud cambia a Asignado |
| PF-08 | Serenazgo | Entrar a Mis casos | Solo ve casos asignados a su código |
| PF-09 | Serenazgo | Guardar informe | Informe queda asociado al caso |
| PF-10 | Admin | Deshabilitar sereno | Ya no aparece como opción de asignación |
