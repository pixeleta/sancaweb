document.addEventListener("DOMContentLoaded", () => {
    const carrousel = document.querySelector(".carrousel");
    let scrollInterval;
    const scrollSpeed = 2000; // 2 segundos

    // 1. Guardar los originales y clonarlos 2 veces para asegurar que cubran cualquier pantalla
    const originalCards = Array.from(carrousel.children);
    const originalCount = originalCards.length;

    for (let i = 0; i < 2; i++) {
        originalCards.forEach((card) => {
            const clone = card.cloneNode(true);
            carrousel.appendChild(clone);
        });
    }

    // 2. Función para aplicar el zoom a la tarjeta central
    function highlightCenterCard() {
        const carouselRect = carrousel.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;

        const allCards = carrousel.querySelectorAll("li");
        let closestCard = null;
        let minDistance = Infinity;

        allCards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(carouselCenter - cardCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });

        allCards.forEach((card) => {
            if (card === closestCard) {
                card.classList.add("is-center");
            } else {
                card.classList.remove("is-center");
            }
        });
    }

    // 3. Auto Scroll Infinito
    function startAutoScroll() {
        clearInterval(scrollInterval);

        scrollInterval = setInterval(() => {
            const card = carrousel.querySelector("li");
            const gap = parseInt(window.getComputedStyle(carrousel).gap) || 0;
            const cardWidth = card.offsetWidth + gap;

            // Ancho matemático del bloque original completo
            const originalWidth = cardWidth * originalCount;

            // Si llegamos a la zona duplicada (margen de -5px por subpíxeles)
            if (carrousel.scrollLeft >= originalWidth - 5) {
                // 1. Apagamos cualquier scroll suave forzando 'auto'
                carrousel.style.scrollBehavior = "auto"; 
                
                // 2. Retrocedemos matemáticamente al instante
                // Si el scroll era originalWidth + 2, vuelve a 2. Esto mantiene la fluidez perfecta.
                carrousel.scrollLeft = carrousel.scrollLeft - originalWidth;
                
                // 3. Forzamos al navegador a procesar el cambio en este milisegundo (Reflow)
                void carrousel.offsetWidth; 
                
                // 4. Restauramos el scroll suave para el siguiente movimiento
                carrousel.style.scrollBehavior = "smooth";
            }

            // Realizamos el avance normal sin pausas de setTimeout
            carrousel.scrollBy({ left: cardWidth, behavior: "smooth" });

        }, scrollSpeed);
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    // Actualizar la tarjeta centrada mientras se desplaza
    carrousel.addEventListener("scroll", highlightCenterCard);

    // Iniciar
    startAutoScroll();
    highlightCenterCard();

    // Interacciones
    carrousel.addEventListener("mouseenter", stopAutoScroll);
    carrousel.addEventListener("mouseleave", startAutoScroll);

    carrousel.addEventListener("touchstart", stopAutoScroll);
    carrousel.addEventListener("touchend", () => {
        stopAutoScroll();
        setTimeout(startAutoScroll, 3000);
    });
});