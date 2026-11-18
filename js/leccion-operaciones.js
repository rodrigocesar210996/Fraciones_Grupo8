function cambiarMetodo(metodo) {
            const botones = document.querySelectorAll(".metodo");
            const titulo = document.getElementById("metodo-titulo");
            const formula = document.getElementById("formula");

            botones.forEach(boton => boton.classList.remove("activo"));
            botones[metodo - 1].classList.add("activo");

            if (metodo === 1) {
                titulo.textContent = "Calcular con orden riguroso:";
                formula.innerHTML =
                    '<span class="fraction"><span>3</span><span>4</span></span> + ' +
                    '<span class="fraction"><span>1</span><span>2</span></span> × ' +
                    '(<span class="fraction"><span>2</span><span>5</span></span> − ' +
                    '<span class="fraction"><span>6</span><span>5</span></span>)';
            } else {
                titulo.textContent = "Calcular usando números decimales:";
                formula.textContent = "(0.75 + 0.5) × (0.4 − 1.2)";
            }
        }

        const control = document.getElementById("fraccion");

        if (control) control.addEventListener("input", function () {
            const valor = Number(this.value) / 4;
            document.getElementById("valor-fraccion").textContent =
                valor.toFixed(2);

            document.getElementById("valor-decimal").textContent =
                valor.toFixed(2);

            document.getElementById("barra-progreso").style.width =
                ((Number(this.value) + 10) / 20 * 100) + "%";
        });

        function calcular() {
            const a = Number(document.getElementById("numero-a").value);
            const b = Number(document.getElementById("numero-b").value);
            const operacion = document.getElementById("operacion").value;
            let resultado;

            if (operacion === "+") resultado = a + b;
            if (operacion === "-") resultado = a - b;
            if (operacion === "*") resultado = a * b;

            if (operacion === "/") {
                if (b === 0) {
                    document.getElementById("resultado").textContent =
                        "No se puede dividir entre cero.";
                    return;
                }
                resultado = a / b;
            }

            document.getElementById("resultado").textContent =
                "Resultado: " + resultado;
        }
