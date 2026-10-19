async function cargarCursos() {
    // Contenedor de tarjetas: existe en index.html (Cursos disponibles) y en cursos.html
    const contenedor = document.getElementById("lista-cursos");
    if (!contenedor) return;

    try {
        const respuesta = await fetch("json/cursos.json");
        if (!respuesta.ok) {
            throw new Error(`No se pudo leer json/cursos.json (HTTP ${respuesta.status})`);
        }
        const cursos = await respuesta.json();

        // Se arma todo el HTML junto y se asigna una sola vez
        // (antes se hacía innerHTML += dentro del forEach, que vuelve a procesar todo en cada vuelta)
        contenedor.innerHTML = cursos.map(curso => {
            // Si el curso todavía no tiene link de inscripción ("#"), el botón lleva a Contacto
            const linkInscripcion = (curso["linkInscripcion"] && curso["linkInscripcion"] !== "#")
                ? curso["linkInscripcion"]
                : "contacto.html";

            return `
            <div class="fondo" tabindex="0">

                <div class="curso-imagen">
                    <img src="${curso["imagen"]}" alt="${curso["titulo"]}">
                </div>

                <div class="cortina">
                    <h4><B>${curso["titulo"]}</B></h4>
                    <p class="subtitulo">${curso["subtitulo"]}</p>
                    <ul>
                        <li><b>Duración:</b> ${curso["duracion"]}</li>
                        <li><b>Modalidad:</b> ${curso["modalidad"]}</li>
                        <li><b>Días y horario:</b> ${curso["dias"]} ${curso["horario"]}</li>
                        <li><b>Dirección:</b> ${curso["direccion"]}</li>
                        <li><b>Localidad:</b> ${curso["localidad"]}</li>
                    </ul>
                        <a class="btn" href="${linkInscripcion}">Inscribirme</a>
                </div>
            </div>

            `;
        }).join("");

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `<p class="mensaje-error">No pudimos cargar los cursos en este momento. Probá de nuevo más tarde o escribinos desde la sección Contacto.</p>`;
    }
}

// En celulares no hay hover: al tocar una tarjeta se abre/cierra la cortina con la info
// (el CSS solo usa la clase "activa" cuando el dispositivo no tiene hover)
function activarToqueEnTarjetas() {
    const contenedor = document.getElementById("lista-cursos");
    if (!contenedor) return;
    contenedor.addEventListener("click", (evento) => {
        if (evento.target.closest(".btn")) return; // el botón Inscribirme debe funcionar normal
        const tarjeta = evento.target.closest(".fondo");
        if (tarjeta) tarjeta.classList.toggle("activa");
    });
}

cargarCursos();
activarToqueEnTarjetas();
