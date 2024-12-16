[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/XtOvY3Si)
# Recuperatorio: Sistema de Gestión de Empleados y Familiares

## 🎯 Objetivo
Desarrollar una aplicación web en Angular para registrar empleados y sus familiares a cargo, implementando formularios reactivos y comunicación con API REST.


## 📋 Estructura (Total: 100 puntos)

### 1. Routing (5 puntos)
Implementar rutas:
- `/employees`: Lista de empleados
- `/employees/create`: Formulario de creación

### 2. Formulario Reactivo (60 puntos)

#### Datos del Empleado (35 puntos)
Información Personal:
- Nombre (requerido, mínimo 3 caracteres)
- Apellido (requerido, mínimo 3 caracteres)
- Email (requerido, formato válido)
- DNI (requerido, solo números, 8 dígitos)
- Departamento (select desde API)
- Salario base (requerido, número positivo)

#### FormArray de Familiares (25 puntos)
Por cada familiar:
- Nombre (requerido)
- Parentesco (select: 'Hijo/a', 'Cónyuge', 'Padre/Madre')
- DNI (requerido, 8 dígitos)
- Fecha de nacimiento

### 3. Validación Asincrónica (15 puntos)
- Verificar disponibilidad de DNI empleado antes de permitir el submit
- Consultar al endpoint get de employees

### 4. Listado Simple (20 puntos)
Tabla con Bootstrap mostrando:
- Nombre completo
- Email
- Departamento
- Cantidad de familiares
- Salario base

Deberan filtrar por el campo del nombre completo
## 📡 API Endpoints y Modelos de Datos

### 1. Obtener Departamentos
```typescript
// Request
GET https://6732450e2a1b1a4ae10f7723.mockapi.io/departments

// Response Example
[
  {
    "id": "1",
    "name": "Recursos Humanos"
  },
  {
    "id": "2",
    "name": "Tecnología"
  }
]
```

### 2. Crear Empleado
```typescript
// Request
POST https://6732450e2a1b1a4ae10f7723.mockapi.io/employees


// Request Body Example
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@empresa.com",
  "dni": "12345678",
  "departmentId": "2",
  "baseSalary": 150000,
  "relatives": [
    {
      "firstName": "Ana",
      "relationship": "Cónyuge",
      "dni": "87654321",
      "birthDate": "1990-05-15"
    }
  ]
}

```

### 3. Listar Empleados
```typescript
// Request
GET https://6732450e2a1b1a4ae10f7723.mockapi.io/employees

// Response Example

[
    {
      "id": "1",
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "juan@empresa.com",
      "dni": "12345678",
      "departmentId": "2",
      "baseSalary": 150000,
      "relatives": [
        {
          "firstName": "Ana",
          "relationship": "Cónyuge",
          "dni": "87654321",
          "birthDate": "1990-05-15"
        },
        {
          "firstName": "Luis",
          "relationship": "Hijo/a",
          "dni": "45678912",
          "birthDate": "2015-08-22"
        }
      ]
    }
]

```

## ⚠️ Consideraciones Importantes

1. Validaciones Requeridas:
   - DNI: 8 dígitos numéricos
   - Email: formato válido
   - Nombres: mínimo 3 caracteres
   - Salario: número positivo
   - Fechas: formato ISO 8601 (YYYY-MM-DD)

2. Manejo de Errores:
   - Implementar manejo básico de errores HTTP
   - Mostrar mensajes al usuario

3. Requisitos Técnicos:
   - Usar Reactive Forms
   - Implementar FormArray para familiares
   - Usar servicios para comunicación HTTP
   - Implementar interfaces para tipado
   - Usar environment para URLs


---

> ⚠️ **¡ADVERTENCIA IMPORTANTE!** ⚠️
>
> ### Uso Obligatorio de MockAPI
> 
> - **ES OBLIGATORIO** utilizar las APIs de MockAPI proporcionadas en este documento.
> - El archivo `db.json` se proporciona **ÚNICAMENTE** como último recurso en caso de problemas técnicos graves con MockAPI.
> - **NO** está permitido migrar el proyecto a `db.json` por preferencia personal o conveniencia.
> - **CUALQUIER** modificación no autorizada o migración injustificada a `db.json` resultará en una **REDUCCIÓN SIGNIFICATIVA** de la calificación.
>
> 📝 **Nota**: La evaluación considera el uso correcto de las APIs proporcionadas como un requisito fundamental del proyecto.
>
> ⚡ **Importante**: Solo se aceptará el uso de `db.json` con autorización previa y justificación técnica documentada.

---
