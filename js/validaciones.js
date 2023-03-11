export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = '';
    } else {
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = '';
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            console.log(error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

const mensajeDeError = {
    nombre: {
        valueMissing: "Este campo de nombre es obligatorio"
    },
    email: {
        valueMissing: "Este campo de correo es obligatorio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "Debes incluir una contraseña",
        patternMismatch: "Al menos 8 caracteres, maximo 12 y sin caracteres especiales. Y debe incluir letra minuscula y mayuscula",
    },
    nacimiento: {
        valueMissing: "La fecha de nacimiento es requerida",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo de telefono es obligatorio",
        patternMismatch: "Es obligatorio ingresar 10 numeros",
    },
    direccion: {
        valueMissing: "La dirección es un requisito obligatorio",
        patternMismatch: "Tu direccion debe contener desde 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "La ciudad es un requisito obligatorio",
        patternMismatch: "La ciudad debe contener desde 4 a 30 caracteres",
    },
    estado: {
        valueMissing: "El campo de estado es un requisito obligatorio",
        patternMismatch: "Tu estado debe contener desde 4 a 30 caracteres",
    },
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return (diferenciaFechas <= fechaActual);
}