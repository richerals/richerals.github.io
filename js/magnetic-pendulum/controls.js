window.MP = window.MP || {};

window.MP.Controls = (function () {
  function bindUI(sim, renderer, magnets, callbacks) {
    const ui = {
      damping: document.getElementById("param-damping"),
      height: document.getElementById("param-height"),
      strength: document.getElementById("param-strength"),
      trail: document.getElementById("param-trail"),
      dampingVal: document.getElementById("val-damping"),
      heightVal: document.getElementById("val-height"),
      strengthVal: document.getElementById("val-strength"),
      btnStart: document.getElementById("btn-start"),
      btnPause: document.getElementById("btn-pause"),
      btnReset: document.getElementById("btn-reset"),
      btnClearTrail: document.getElementById("btn-clear-trail"),
      btnAddMagnet: document.getElementById("btn-add-magnet"),
      status: document.getElementById("sim-status"),
    };

    let running = false;
    let dragTarget = null;

    function getParams() {
      return {
        b: parseFloat(ui.damping?.value ?? "0.12"),
        h: parseFloat(ui.height?.value ?? "0.35"),
        strength: parseFloat(ui.strength?.value ?? "1"),
        trailLen: parseInt(ui.trail?.value ?? "2500", 10),
      };
    }

    function setStatus(text) {
      if (ui.status) ui.status.textContent = text;
    }

    function syncLabels() {
      if (ui.dampingVal) ui.dampingVal.textContent = ui.damping?.value ?? "";
      if (ui.heightVal) ui.heightVal.textContent = ui.height?.value ?? "";
      if (ui.strengthVal) ui.strengthVal.textContent = ui.strength?.value ?? "";
    }

    const canvas = document.getElementById("sim-canvas");

    function pointerPos(e) {
      const rect = canvas.getBoundingClientRect();
      return renderer.canvasToWorld(e.clientX - rect.left, e.clientY - rect.top);
    }

    canvas.addEventListener("pointerdown", (e) => {
      const { x, y } = pointerPos(e);
      const hit = renderer.hitTest(x, y);
      if (!hit) return;
      dragTarget = hit;
      canvas.setPointerCapture(e.pointerId);
      if (hit.type === "bob") {
        sim.setBobPosition(x, y, true);
        sim.clearTrail();
      }
    });

    canvas.addEventListener("pointermove", (e) => {
      if (!dragTarget) return;
      const { x, y } = pointerPos(e);
      if (dragTarget.type === "bob") {
        sim.setBobPosition(x, y, true);
      } else if (dragTarget.magnet) {
        dragTarget.magnet.x = x;
        dragTarget.magnet.y = y;
      }
      renderer.draw();
    });

    canvas.addEventListener("pointerup", () => {
      dragTarget = null;
    });
    canvas.addEventListener("pointercancel", () => {
      dragTarget = null;
    });

    ui.btnStart?.addEventListener("click", () => {
      running = true;
      setStatus("Running — RK4 integration");
    });

    ui.btnPause?.addEventListener("click", () => {
      running = false;
      setStatus("Paused");
    });

    ui.btnReset?.addEventListener("click", () => {
      running = false;
      sim.reset();
      renderer.draw();
      setStatus("Reset — drag magnets or bob, then Run");
    });

    ui.btnClearTrail?.addEventListener("click", () => {
      sim.clearTrail();
      renderer.draw();
    });

    ui.btnAddMagnet?.addEventListener("click", () => {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.6 + Math.random() * 0.5;
      magnets.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        id: Date.now(),
      });
      renderer.draw();
    });

    document.querySelectorAll(".sim-controls input").forEach((el) => {
      el.addEventListener("input", syncLabels);
      el.addEventListener("change", syncLabels);
    });

    syncLabels();
    setStatus("Paused — adjust layout, then Run");

    return {
      getParams,
      isRunning: () => running,
      step: () => {
        if (running) sim.step();
      },
    };
  }

  return { bindUI };
})();
