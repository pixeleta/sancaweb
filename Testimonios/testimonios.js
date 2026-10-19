async function cargarTestimonios() {
    const respuesta = await fetch("testimonios.json");
    const testimonios = await respuesta.json();
    console.log(respuesta)
    console.log(respuesta)

    const contenedor = document.querySelector(".carta-container");

    testimonios.forEach(testimonio => {
        contenedor.innerHTML += `
            <div class="carta">
                
                <h3>${testimonio["Curso al que te inscribiste "]}</h3>
                <h4>${testimonio["Tu testimonio"]}</h4>
                <p>${testimonio["Nombre y apellido (opcional)"]}</p>
                <p>${testimonio["Año en el que pasaste por sanca "]}</p>
                <p></p>
                <p></p>
                
            </div>
        `;
    });
}

cargarTestimonios();