import useStore from "@/hooks/use-store";

const PaletteEmptyResult = () => {
  const search = useStore((state) => state.search);

  return (
    <div
      className="flex-1 overflow-y-auto p-space-sm space-y-space-sm"
    >
      <div
        className="flex flex-col items-center justify-center text-center p-6 my-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 transition-all"
      >
        <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-primary mb-3 shadow-xs">
          <span className="material-symbols-outlined text-[24px]">
            search_off
          </span>
        </div>
        <span className="font-headline-sm text-[14px] font-semibold text-slate-800 tracking-tight">
          No matching components
        </span>
        <p className="font-body-sm text-[11px] text-slate-500 mt-1.5 leading-normal max-w-[210px]">
          No workspace elements match{" "}
          <span className="font-medium text-slate-700">'{search}'.</span> Check
          your spelling or try clearing category filters.
        </p>
      </div>
    </div>
  );
};

export default PaletteEmptyResult;
