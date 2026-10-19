async function cargarTestimonios() {
    const respuesta = await fetch("json/cursos.json");
    const cursos = await respuesta.json();


    const contenedor = document.querySelector("main");

    cursos.forEach(curso => {

            contenedor.innerHTML += `
            <div class="fondo">

                <div class="carta-container">
                    <img src=${curso["imagen"]} alt="">
                </div>

                <div class="cortina">
                    <h4><B>${curso["titulo"]}</B></h4>
                    <ul>
                        <li><b>Duración:</b> ${curso["duracion"]}</li>
                        <li><b>Modalidad:</b> ${curso["modalidad"]}</li>
                        <li><b>Dias y horario:</b> ${curso["dias"]} ${curso["horario"]}</li>
                        <li><b>Dirección:</b> ${curso["direccion"]}</li>
                        <li><b>Localidad:</b> ${curso["localidad"]}</li>
                    </ul>
                        <button class="btn">Inscribirme</button>
                </div>
            </div>

            `;
       
    });
}

cargarTestimonios();