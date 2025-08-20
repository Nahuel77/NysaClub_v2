document.addEventListener("DOMContentLoaded", async () => {
    /** --------------------------
     * 1. Eventos (fetch JSON)
     ---------------------------*/
    const container = document.getElementById("eventosContainer");

    if (container) {
        try {
            const response = await fetch("eventos.json");
            if (!response.ok) throw new Error("No se pudo cargar el archivo JSON");

            const eventos = await response.json();

            eventos.forEach(evento => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <h2>${evento.tipo_evento}</h2>
                    <p>${evento.descripcion}</p>
                    <div class="detalles">
                        <p><strong>Lugar:</strong> ${evento.detalles.lugar}</p>
                        <p><strong>Fecha:</strong> ${evento.detalles.fecha}</p>
                        <p><strong>Hora:</strong> ${evento.detalles.hora}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        } catch (error) {
            console.error("Error cargando eventos:", error);
        }
    }

    /** --------------------------
     * 2. Menú hamburguesa
     ---------------------------*/
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");
    const menuTitle = document.getElementById("menu-title");
    const market = document.getElementById("market");

    if (hamburgerBtn && navLinks && menuTitle && market) {
        hamburgerBtn.addEventListener("click", () => {
            const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
            const newState = !expanded;
            hamburgerBtn.setAttribute("aria-expanded", newState);

            navLinks.classList.toggle("show", newState);
            menuTitle.classList.toggle("show", newState);
            market.classList.toggle("hide", newState);
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburgerBtn.setAttribute("aria-expanded", "false");
                navLinks.classList.remove("show");
                menuTitle.classList.remove("show");
                market.classList.remove("hide");
            });
        });
    }

    /** --------------------------
     * 3. Tema oscuro / claro
     ---------------------------*/
    const toggleBtn = document.getElementById("theme-toggle");
    const portada = document.getElementById("portada");
    const separadores = document.querySelectorAll(".separador");
    const toTop = document.getElementById("to-top");
    const menuBg = document.getElementById("menu-bg");

    function aplicarTema(dark) {
        document.body.classList.toggle("dark-theme", dark);
        portada?.classList.toggle("dark-theme", dark);
        toTop?.classList.toggle("dark", dark);
        menuBg?.classList.toggle("dark", dark);
        separadores.forEach(s => s.classList.toggle("dark", dark));
    }

    if (toggleBtn) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            aplicarTema(savedTheme === "dark");
        } else {
            aplicarTema(prefersDark);
            localStorage.setItem("theme", prefersDark ? "dark" : "light");
        }

        toggleBtn.addEventListener("click", () => {
            const dark = !document.body.classList.contains("dark-theme");
            aplicarTema(dark);
            localStorage.setItem("theme", dark ? "dark" : "light");
        });
    }

    /** --------------------------
     * 4. Carrusel frases
     ---------------------------*/
    const frases = [...document.querySelectorAll("#carrusel h1, #carrusel h2")];
    if (frases.length) {
        let index = 0;

        function mostrarSiguiente() {
            frases.forEach(f => f.classList.remove("active", "exit"));

            frases[index].classList.add("exit");
            index = (index + 1) % frases.length;
            frases[index].classList.add("active");

            setTimeout(mostrarSiguiente, 3000);
        }

        frases[0].classList.add("active");
        setTimeout(mostrarSiguiente, 3000);
    }

    /** --------------------------
     * 5. To Top Button
     ---------------------------*/

    window.addEventListener("scroll", () => {
        if (window.scrollY > 450) {
            toTop.style.display = "flex";
        } else {
            toTop.style.display = "none";
        }
    });

    toTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});