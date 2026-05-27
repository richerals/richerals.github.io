"use client";

import { MathBlock, MathInline } from "@/components/math/Katex";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function EquationsSection() {
  return (
    <section id="math" className="scroll-mt-20 border-t border-border px-5 py-14">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader label="Section 3" title="Model & notation" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6 rounded-lg border border-border bg-surface p-6 text-sm">
            <div>
              <p className="mb-2 text-xs uppercase text-muted">Equation of motion</p>
              <MathBlock
                tex={String.raw`\ddot{\mathbf{x}} + b\dot{\mathbf{x}} + \mathbf{x} = \sum_{n=1}^{N} \frac{\sigma_n(\mathbf{x}_n - \mathbf{x})}{\bigl(|\mathbf{x}_n - \mathbf{x}|^2 + h^2\bigr)^{5/2}}`}
              />
              <p className="mt-2 text-muted leading-relaxed">
                <MathInline tex={String.raw`\sigma_n = +1`} /> (red) or{" "}
                <MathInline tex={String.raw`\sigma_n = -1`} /> (blue). Mass{" "}
                <MathInline tex={String.raw`m`} /> scales acceleration as{" "}
                <MathInline tex={String.raw`\mathbf{a} = \mathbf{F}/m`} />.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase text-muted">Potential</p>
              <MathBlock tex={String.raw`V_{\mathrm{gra}}(\mathbf{x}) = \tfrac{1}{2}|\mathbf{x}|^2`} />
              <MathBlock
                tex={String.raw`V_{\mathrm{mag}}(\mathbf{x}) = -\tfrac{1}{3}\sum_n \frac{\sigma_n}{\bigl((\mathbf{x}-\mathbf{x}_n)^2 + h^2\bigr)^{3/2}} + V_0`}
              />
              <MathBlock tex={String.raw`V_{\mathrm{total}} = V_{\mathrm{mag}} + V_{\mathrm{gra}}`} />
            </div>
            <div>
              <p className="mb-2 text-xs uppercase text-muted">Basins</p>
              <p className="text-muted leading-relaxed">
                Near separatrices, tiny changes in <MathInline tex={String.raw`(x_0, y_0)`} /> map to different attractors—basins
                of attraction partition the plane by which magnet (or rest point) the trajectory settles to.
              </p>
            </div>
          </div>
          <div className="space-y-5 font-serif text-base leading-relaxed text-muted">
            <article className="rounded-lg border border-border bg-surface p-5">
              <p className="mb-3 font-sans text-base uppercase tracking-wide text-text">
                Physical setup
              </p>
              <p>
                A magnet is suspended from a string above a non-magnetic base. Fixed magnets on the base attract it,
                and the motion changes as the parameters change.
              </p>
              <div className="mt-4 grid gap-3 font-sans text-sm sm:grid-cols-2">
                <p className="rounded border border-border bg-bg/40 p-3">
                  <span className="block text-xs uppercase tracking-wide text-muted">Default base</span>
                  <span className="text-text">Five positive magnets on a dashed ring</span>
                </p>
                <p className="rounded border border-border bg-bg/40 p-3">
                  <span className="block text-xs uppercase tracking-wide text-muted">Release point</span>
                  <span className="whitespace-nowrap text-text">(2, −1.6)</span>
                </p>
              </div>
              <p className="mt-4">
                Key controls: damping <strong className="text-text">b</strong>, height{" "}
                <strong className="text-text">h</strong>, mass <strong className="text-text">m</strong>, magnet
                positions, and polarity.
              </p>
            </article>

            <article className="rounded-lg border border-border bg-surface p-5">
              <p className="mb-3 font-sans text-base uppercase tracking-wide text-text">
                Chaotic divergence
              </p>
              <p>
                Tiny differences in the starting point can grow into very different paths. That sensitive dependence is
                the <em> butterfly effect</em>.
              </p>
              <p className="mt-3">
                Basin colors show which magnet wins. Fractal boundaries mark where the outcome is highly sensitive to{" "}
                <MathInline tex={String.raw`(x_0, y_0)`} />.
              </p>
              <p className="mt-3">
                The 3D surface uses the same potential, so moving a magnet reshapes both the force field and the
                landscape.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
