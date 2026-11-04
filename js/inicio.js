(function iniciarDeslizadorFraccion() {
      const deslizador = document.getElementById('fractionRangeSlider');
      const etiqueta = document.getElementById('sliderValueText');
      if (!deslizador || !etiqueta) return;
      const mapaFracciones = {
        '1': { frac: '1/4', dec: '0.25' },
        '2': { frac: '2/4', dec: '0.50' },
        '3': { frac: '3/4', dec: '0.75' },
        '4': { frac: '4/4', dec: '1.00' }
      };
      deslizador.addEventListener('input', function(e) {
        const valor = e.target.value;
        const datos = mapaFracciones[valor];
        if (datos) {
          etiqueta.textContent = datos.frac + ' (' + datos.dec + ')';
        }
      });
    })();
