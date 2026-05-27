"use client";

import katex from "katex";
import type { KatexOptions } from "katex";
import { useMemo } from "react";

/** HTML only — avoids MathML duplicating visibly beside the formula in some browsers. */
const KATEX_OPTS: KatexOptions = { throwOnError: false, output: "html" };

export function MathBlock({ tex }: { tex: string }) {
  const html = useMemo(
    () => katex.renderToString(tex, { ...KATEX_OPTS, displayMode: true }),
    [tex]
  );
  return <div className="katex-block" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MathInline({ tex }: { tex: string }) {
  const html = useMemo(
    () => katex.renderToString(tex, { ...KATEX_OPTS, displayMode: false }),
    [tex]
  );
  return (
    <span
      className="katex-inline align-baseline [&_.katex]:text-[1em] [&_.katex]:text-inherit"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
