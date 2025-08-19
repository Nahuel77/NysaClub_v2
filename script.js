window.addEventListener("load", () => {
    const container = document.getElementById('eventosContainer');

    fetch('eventos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
            }
            return response.json();
        })
        .then(eventos => {
            eventos.forEach(evento => {
                const card = document.createElement('div');
                card.classList.add('card');

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
        })
        .catch(error => {
            console.error("Error cargando eventos:", error);
        });

});

document.addEventListener("DOMContentLoaded", () => {
    /* nav burger icon */
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");
    const menuTitle = document.getElementById("menu-title");
    const market = document.getElementById("market");

    hamburgerBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        menuTitle.classList.toggle("show");
        market.classList.toggle("hide");

        const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
        hamburgerBtn.setAttribute("aria-expanded", !expanded);
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            menuTitle.classList.remove("show");
            market.classList.remove("hide");
            hamburgerBtn.setAttribute("aria-expanded", "false");
        });
    });

    /* theme */

    const toggleBtn = document.getElementById('theme-toggle');
    const portada = document.getElementById("portada");
    const separadores = document.querySelectorAll(".separador");
    const toTop = document.getElementById("to-top");

    // Restaurar tema guardado

    const prefersScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            portada.classList.add('dark-theme');
            toTop.classList.add('dark');
            separadores.forEach(s => s.classList.add("dark"));
        }
    } else {//intentar manejar los temas, completamente por variable de body.dark
        if (prefersScheme) {
            localStorage.setItem('theme', 'dark');
            document.body.classList.add('dark-theme');
            portada.classList.add('dark-theme');
            toTop.classList.add('dark');
            separadores.forEach(s => s.classList.add("dark"));
        }
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            separadores.forEach(s => s.classList.add("dark"));
            localStorage.setItem('theme', 'dark');
            toTop.classList.add('dark');
            portada.classList.add('dark-theme');
        } else {
            separadores.forEach(s => s.classList.remove("dark"));
            localStorage.setItem('theme', 'light');
            portada.classList.remove('dark-theme');
            toTop.classList.remove('dark');
        }
    });

    /** carrusel */
    const frases = Array.from(document.querySelectorAll("#carrusel h1, #carrusel h2"));
    if (!frases.length) return;

    let index = 0;

    requestAnimationFrame(() => {
        frases[index].classList.add("active");
    });

    setInterval(() => {
        const actual = frases[index];
        actual.classList.remove("active");
        actual.classList.add("exit");

        index = (index + 1) % frases.length;

        const siguiente = frases[index];
        siguiente.classList.remove("exit");

        siguiente.classList.add("active");
    }, 3000);
});