function mostrarFormulario() {
    document.getElementById("formulario").style.display = "block";
}


const precios = {

    premium: [
        {
            concepto: "Stand modulado 3 x 3 m (9 m²)",
            tipo: "fijo",
            precio: 86119
        },
        {
            concepto: "Espacio sin modulación 18-35 m²",
            tipo: "metro",
            precio: 9787,
            minimo: 18,
            maximo: 35
        },
        {
            concepto: "Espacio sin modulación ≥ 36 m²",
            tipo: "metro",
            precio: 9135,
            minimo: 36
        },
        {
            concepto: "Espacio sin modulación para corporativo ≥ 100 m²",
            tipo: "metro",
            precio: 7309,
            minimo: 100
        },
        {
            concepto: "Corporativo Premium Early Bird ≥ 200 m²",
            tipo: "metro",
            precio: 6003,
            minimo: 200
        },
        {
            concepto: "Corporativo Premium Rebooking ≥ 300 m²",
            tipo: "metro",
            precio: 5481,
            minimo: 300
        }
    ],

    estandar: [
        {
            concepto: "Stand modulado 3 x 3 m (9 m²)",
            tipo: "fijo",
            precio: 84815
        },
        {
            concepto: "Espacio sin modulación 18-35 m²",
            tipo: "metro",
            precio: 8483,
            minimo: 18,
            maximo: 35
        },
        {
            concepto: "Espacio sin modulación ≥ 36 m²",
            tipo: "metro",
            precio: 7831,
            minimo: 36
        },
        {
            concepto: "Espacio sin modulación para corporativo ≥ 100 m²",
            tipo: "metro",
            precio: 6263,
            minimo: 100
        },
        {
            concepto: "Corporativo Estándar Early Bird ≥ 200 m²",
            tipo: "metro",
            precio: 5089,
            minimo: 200
        },
        {
            concepto: "Corporativo Estándar Rebooking ≥ 300 m²",
            tipo: "metro",
            precio: 4699,
            minimo: 300
        }
    ],

    economico: [
        {
            concepto: "Stand modulado 3 x 3 m (9 m²)",
            tipo: "fijo",
            precio: 78291
        },
        {
            concepto: "Espacio sin modulación 18-35 m²",
            tipo: "metro",
            precio: 7117,
            minimo: 18,
            maximo: 35
        },
        {
            concepto: "Espacio sin modulación ≥ 36 m²",
            tipo: "metro",
            precio: 6525,
            minimo: 36
        },
        {
            concepto: "Espacio sin modulación para corporativo ≥ 100 m²",
            tipo: "metro",
            precio: 5221,
            minimo: 100
        },
        {
            concepto: "Corporativo Económico Early Bird ≥ 200 m²",
            tipo: "metro",
            precio: 4307,
            minimo: 200
        },
        {
            concepto: "Corporativo Económico Rebooking ≥ 300 m²",
            tipo: "metro",
            precio: 3915,
            minimo: 300
        }
    ],

    pymes: [
        {
            concepto: "Stand modulado 3 x 3 m bajo techo - PYMES",
            tipo: "fijo",
            precio: 41085
        }
    ]
};


function actualizarConceptos() {

    let categoria = document.getElementById("categoria").value;
    let concepto = document.getElementById("concepto");

    concepto.innerHTML = "";

    if (categoria === "") {

        concepto.innerHTML =
            '<option value="">Primero selecciona una categoría</option>';

        return;
    }

    precios[categoria].forEach(function(item, indice) {

        let opcion = document.createElement("option");

        opcion.value = indice;
        opcion.textContent = item.concepto;

        concepto.appendChild(opcion);

    });

    calcularPrecio();
}


function calcularPrecio() {

    let categoria = document.getElementById("categoria").value;
    let conceptoSeleccionado = document.getElementById("concepto").value;
    let superficie = Number(document.getElementById("superficie").value);

    let resultadoPrecio = document.getElementById("resultadoPrecio");
    let resultadoTotal = document.getElementById("resultadoTotal");

    if (categoria === "" || conceptoSeleccionado === "") {

        resultadoPrecio.textContent = "";
        resultadoTotal.textContent = "";

        return;
    }

    let item = precios[categoria][conceptoSeleccionado];

    let precio = item.precio;

    resultadoPrecio.textContent =
        "Precio: $" + precio.toLocaleString("es-MX") +
        (item.tipo === "metro" ? " / m²" : "");


    // PRECIO FIJO

    if (item.tipo === "fijo") {

        resultadoTotal.textContent =
            "Total: $" + precio.toLocaleString("es-MX");

        return;
    }


    // VALIDAR QUE SE INGRESE SUPERFICIE

    if (superficie <= 0) {

        resultadoTotal.textContent =
            "Ingresa la superficie en m²";

        return;
    }


    // VALIDAR SUPERFICIE MÍNIMA

    if (item.minimo && superficie < item.minimo) {

        resultadoTotal.textContent =
            "La superficie mínima para este concepto es de "
            + item.minimo + " m²";

        return;
    }


    // VALIDAR SUPERFICIE MÁXIMA

    if (item.maximo && superficie > item.maximo) {

        resultadoTotal.textContent =
            "La superficie máxima para este concepto es de "
            + item.maximo + " m²";

        return;
    }


    // CALCULAR TOTAL

    let total = superficie * precio;

    resultadoTotal.textContent =
        "Total: $" + total.toLocaleString("es-MX");
}
function guardarEmpresa() {

    let nombre = document.getElementById("nombre").value;
    let categoria = document.getElementById("categoria").value;
    let conceptoSeleccionado = document.getElementById("concepto").value;
    let superficie = Number(document.getElementById("superficie").value);

    // Validar nombre
    if (nombre === "") {
        alert("Por favor, escribe el nombre de la empresa.");
        return;
    }

    // Validar categoría
    if (categoria === "") {
        alert("Por favor, selecciona una categoría.");
        return;
    }

    // Validar concepto
    if (conceptoSeleccionado === "") {
        alert("Por favor, selecciona un concepto.");
        return;
    }

    let item = precios[categoria][conceptoSeleccionado];

    // Validar superficie para precios por metro
    if (item.tipo === "metro") {

        if (superficie <= 0) {
            alert("Por favor, ingresa la superficie en m².");
            return;
        }

        if (item.minimo && superficie < item.minimo) {
            alert("La superficie mínima es de " + item.minimo + " m².");
            return;
        }

        if (item.maximo && superficie > item.maximo) {
            alert("La superficie máxima es de " + item.maximo + " m².");
            return;
        }
    }

    // Calcular total
    let total;

    if (item.tipo === "fijo") {
        total = item.precio;
    } else {
        total = superficie * item.precio;
    }

    // Crear objeto de empresa
    let empresa = {

        nombre: nombre,
        categoria: categoria,
        concepto: item.concepto,
        superficie: superficie,
        precio: item.precio,
        total: total,
        pagado: 0,
        saldo: total
    };

    // Obtener empresas guardadas
    let empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    // Agregar nueva empresa
    empresas.push(empresa);

    // Guardar en el navegador
    localStorage.setItem("empresas", JSON.stringify(empresas));

    alert("Empresa guardada correctamente.");

mostrarEmpresas();
}
function mostrarEmpresas() {

    let empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    let lista = document.getElementById("listaEmpresas");

    lista.innerHTML = "";

    empresas.forEach(function(empresa, indice) {

        let fila = document.createElement("tr");

        let estado;

        if (empresa.saldo === 0) {
            estado = "Pagado";
        } else if (empresa.pagado > 0) {
            estado = "Pago parcial";
        } else {
            estado = "Pendiente";
        }

        fila.innerHTML = `
            <td>${empresa.nombre}</td>

            <td>${empresa.categoria}</td>

            <td>${empresa.concepto}</td>

            <td>${empresa.superficie}</td>

            <td>$${empresa.total.toLocaleString("es-MX")}</td>

            <td>$${empresa.pagado.toLocaleString("es-MX")}</td>

            <td>$${empresa.saldo.toLocaleString("es-MX")}</td>

            <td>${estado}</td>

            <td>
                <button onclick="registrarPago(${indice})">
                    Registrar pago
                </button>
            </td>
        `;

        lista.appendChild(fila);

    });
}
let empresaSeleccionada = null;


function registrarPago(indice) {

    let empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    let empresa = empresas[indice];

    empresaSeleccionada = indice;

    document.getElementById("formularioPago").style.display = "block";

    document.getElementById("empresaPago").textContent =
        "Empresa: " + empresa.nombre;

    document.getElementById("saldoPago").textContent =
        "Saldo pendiente: $" +
        empresa.saldo.toLocaleString("es-MX");

    // Colocar fecha actual
    let hoy = new Date().toISOString().split("T")[0];

    document.getElementById("fechaPago").value = hoy;

    // Limpiar campos
    document.getElementById("montoPago").value = "";
    document.getElementById("metodoPago").value = "";
    document.getElementById("referenciaPago").value = "";
    document.getElementById("observacionesPago").value = "";

}
function guardarPago() {

    let empresas = JSON.parse(localStorage.getItem("empresas")) || [];

    let empresa = empresas[empresaSeleccionada];

    let fecha = document.getElementById("fechaPago").value;

    let monto = Number(
        document.getElementById("montoPago").value
    );

    let metodo = document.getElementById("metodoPago").value;

    let referencia =
        document.getElementById("referenciaPago").value;

    let observaciones =
        document.getElementById("observacionesPago").value;


    // VALIDAR FECHA

    if (fecha === "") {

        alert("Selecciona la fecha del pago.");

        return;
    }


    // VALIDAR MONTO

    if (isNaN(monto) || monto <= 0) {

        alert("Ingresa un monto válido.");

        return;
    }


    // VALIDAR QUE NO PAGUEN MÁS DEL SALDO

    if (monto > empresa.saldo) {

        alert(
            "El pago no puede ser mayor al saldo pendiente de $" +
            empresa.saldo.toLocaleString("es-MX")
        );

        return;
    }


    // VALIDAR MÉTODO

    if (metodo === "") {

        alert("Selecciona el método de pago.");

        return;
    }


    // CREAR REGISTRO DEL PAGO

    let nuevoPago = {

        fecha: fecha,

        monto: monto,

        metodo: metodo,

        referencia: referencia,

        observaciones: observaciones
    };


    // Crear historial si todavía no existe

    if (!empresa.pagos) {

        empresa.pagos = [];

    }


    // Agregar pago al historial

    empresa.pagos.push(nuevoPago);


    // Actualizar cantidades

    empresa.pagado = empresa.pagado + monto;

    empresa.saldo = empresa.total - empresa.pagado;


    // Guardar empresa actualizada

    empresas[empresaSeleccionada] = empresa;

    localStorage.setItem(
        "empresas",
        JSON.stringify(empresas)
    );


    alert("Pago registrado correctamente.");


    // Cerrar formulario

    cerrarFormularioPago();


    // Actualizar tabla

    mostrarEmpresas();

}
function cerrarFormularioPago() {

    document.getElementById("formularioPago").style.display = "none";

}