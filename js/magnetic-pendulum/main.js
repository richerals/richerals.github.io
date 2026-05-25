(function () {
  const canvas = document.getElementById("sim-canvas");
  if (!canvas || !window.MP) return;

  const { Physics, Renderer, Controls } = window.MP;
  const magnets = Physics.defaultMagnets();
  let getParams = () => ({ b: 0.12, h: 0.35, strength: 1, trailLen: 2500 });

  const sim = Physics.createSim(() => getParams(), () => magnets);
  const renderer = new Renderer.PendulumRenderer(canvas, sim, () => getParams(), () => magnets);
  const ctrl = Controls.bindUI(sim, renderer, magnets);

  getParams = ctrl.getParams;

  function loop() {
    ctrl.step();
    renderer.draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => renderer.resize());
  renderer.resize();
  loop();
})();
