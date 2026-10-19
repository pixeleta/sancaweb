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
                   
    
                    
                    <h3>Curso:${testimonio["Curso al que te inscribiste "]}</h3>
                    <h4>Testimonio:${testimonio["Tu testimonio"]}</h4>
                    <p><h3>Nombre:${testimonio["Nombre y apellido (opcional)"]}</h3></p>
                    <p><h3>Año de cursada:${testimonio["Año en el que pasaste por sanca "]}</h3></p>
                    <p></p>
                    <p></p>
                    
                </div>
            `;
        }else{
                console.log(`es impar ${contador}`)
 
            contenedor.innerHTML += `
                <div class="carta-derecha">
                   
    
                    
                    <h3>Curso:${testimonio["Curso al que te inscribiste "]}</h3>
                    <h4>Testimonio:${testimonio["Tu testimonio"]}</h4>
                    <p><h3>Nombre:${testimonio["Nombre y apellido (opcional)"]}</h3></p>
                    <p><h3>Año de cursada:${testimonio["Año en el que pasaste por sanca "]}</h3></p>
                    <p></p>
                    <p></p>
                    
                </div>
            `;

        }

        contador ++;
    });
}

cargarTestimonios();