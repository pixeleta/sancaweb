async function cargarTestimonios() {
    const respuesta = await fetch("json/testimonios.json");
    const testimonios = await respuesta.json();
    console.log(respuesta)
    console.log(respuesta)

    const contenedor = document.querySelector(".carta-container");

    let contador=0;
    testimonios.forEach(testimonio => {
        console.log(contador);
        if (contador%2==0){
            console.log(`es par ${contador}`)

            contenedor.innerHTML += `
                <div class="carta-izquierda">
                   
    
                    
                    <h3>Curso: ${testimonio["Curso al que te inscribiste "]}</h3>
                    <p>Testimonio: ${testimonio["Tu testimonio"]}</p>
                    <p>Nombre: ${testimonio["Nombre y apellido (opcional)"]}</p>
                    <p>Año de cursada: ${testimonio["Año en el que pasaste por sanca "]}</p>
                    
                </div>
            `;
        }else{
                console.log(`es impar ${contador}`)
 
            contenedor.innerHTML += `
                <div class="carta-derecha">
                   
    
                    
                    <h3>Curso: ${testimonio["Curso al que te inscribiste "]}</h3>
                    <p>Testimonio: ${testimonio["Tu testimonio"]}<p>
                    <p>Nombre: ${testimonio["Nombre y apellido (opcional)"]}</p>
                    <p>Año de cursada: ${testimonio["Año en el que pasaste por sanca "]}</p>                    
                </div>
            `;

        }

        contador ++;
    });
}

cargarTestimonios();