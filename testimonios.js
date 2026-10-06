async function cargarTestimonios() {
    const respuesta = await fetch("json/testimonios.json");
    const testimonios = await respuesta.json();
    console.log(respuesta)
    console.log(respuesta)

    const contenedor = document.querySelector(".carta-container");

    testimonios.forEach(testimonio => {
        contenedor.innerHTML += `
            <div class="carta">
                <h2>"TESTIMONIOS"</h2>

                <p><h3>Nombre:${testimonio["Nombre y apellido (opcional)"]}</h3></p>
                <h3>Curso:${testimonio["Curso al que te inscribiste "]}</h3>
                <h4>Testimonio:${testimonio["Tu testimonio"]}</h4>
                <p><h3>Año de cursada:${testimonio["Año en el que pasaste por sanca "]}</h3></p>
                <p></p>
                <p></p>
                
            </div>
        `;
    });
}

cargarTestimonios();