import dynamic from "next/dynamic";

// The 3D carousel is the largest client component — code-split it so the
// hero paints immediately and the showcase loads only when needed.
const ThreeDSlider = dynamic(() => import("@/src/components/3d-slider"), {
  loading: () => (
    <div className="flex min-h-screen py-5 items-center justify-center bg-[#0b0b16]">
      <p className="text-sm text-zinc-500">Loading 3D showcase…</p>
    </div>
  ),
});

export default function ProjectsSection() {
  return <ThreeDSlider />;
}