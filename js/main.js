
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";

const marcarPaginaActual = () => {
  const normalitzarRuta = (ruta) => {
    return ruta.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  };

  const paginaActual = normalitzarRuta(window.location.pathname);

  console.log("Pàgina detectada:", paginaActual);

  const enllacosMenu = document.querySelectorAll(
    'nav[aria-label="Navegació principal"] a'
  );

  console.log("Enllaços trobats:", enllacosMenu.length);

  enllacosMenu.forEach((enllac) => {
    const rutaEnllac = normalitzarRuta(new URL(enllac.href).pathname);

    if (rutaEnllac === paginaActual) {
      enllac.setAttribute("aria-current", "page");
    }
  });
};

const iniciarPagina = () => {
  marcarPaginaActual();

  const seccionsIngredients = document.querySelectorAll(
    'section[aria-labelledby="ingredients"]'
  );

  seccionsIngredients.forEach((seccio) => {
    const titol = seccio.querySelector("h2, h3");
    const ingredients = seccio.querySelector("ul");

    if (!titol || !ingredients) {
      return;
    }

    const boto = document.createElement("button");
    boto.type = "button";
    boto.textContent = "Amaga els ingredients";
    boto.setAttribute("aria-expanded", "true");

    boto.addEventListener("click", () => {
      const estanVisibles = boto.getAttribute("aria-expanded") === "true";

      ingredients.hidden = estanVisibles;
      boto.setAttribute("aria-expanded", String(!estanVisibles));
      boto.textContent = estanVisibles
        ? "Mostra els ingredients"
        : "Amaga els ingredients";
    });

    titol.insertAdjacentElement("afterend", boto);
  });

  GLightbox({
    selector: "a.imatge-ampliable",
    touchNavigation: true,
    loop: false
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarPagina);
} else {
  iniciarPagina();
}
