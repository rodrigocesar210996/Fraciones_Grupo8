(function loadLayouts() {
  const layoutRoot = document.body.dataset.layoutRoot || ".";
  const page = document.body.dataset.page;

  function loadLayout(selector, file) {
    const target = document.querySelector(selector);
    if (!target) {
      return Promise.resolve();
    }

    return fetch(`${layoutRoot}/layouts/${file}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No se pudo cargar ${file}: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        target.outerHTML = html;
      });
  }

  Promise.all([
    loadLayout("[data-layout='header']", "header.html"),
    loadLayout("[data-layout='footer']", "footer.html"),
  ])
    .then(() => {
      const activeLink = document.querySelector(
        `.enlace-navegacion[data-page="${page}"]`,
      );
      if (activeLink) {
        activeLink.classList.add("activo");
        activeLink.setAttribute("aria-current", "page");
      }

      const menuButton = document.querySelector(".boton-menu");
      const navigation = document.querySelector(".navegacion-cabecera");
      if (!menuButton || !navigation) {
        return;
      }

      const closeMenu = () => {
        navigation.classList.remove("menu-abierto");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú de navegación");
      };

      menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("menu-abierto");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
          "aria-label",
          isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación",
        );
      });

      navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenu();
          menuButton.focus();
        }
      });
    })
    .catch((error) => {
      console.error("No se pudieron cargar los layouts compartidos:", error);
    });
})();
