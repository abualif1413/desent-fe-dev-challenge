import useStore from "@/hooks/use-store";
import debounce from "lodash/debounce";
import { useEffect, useRef } from "react";

const PaletteSearch = () => {
  const setSearch = useStore((state) => state.setSearch);

  const debouncedSearchRef = useRef(
    debounce((value) => {
      setSearch(value)
    }, 500),
  );

  useEffect(() => {
    const debouncedFn = debouncedSearchRef.current;

    return () => {
      debouncedFn.cancel();
    };
  }, []);

  return (
    <div className="p-space-sm bg-white border-b border-slate-200/80 flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">
            space_dashboard
          </span>
          <span className="font-headline-sm text-headline-sm text-slate-900 font-semibold tracking-tight">
            Customize your workspace
          </span>
        </div>
      </div>
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-2.5 top-1 text-[18px] text-slate-400">
          search
        </span>
        <input
          className="w-full bg-slate-50 text-slate-800 font-body-sm text-body-sm pl-9 pr-7 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-primary focus:bg-white placeholder:text-slate-400 transition-all"
          id="assetSearchInput"
          placeholder="Filter product name or category"
          type="text"
          onChange={(e) => {
            const value = e.target.value;

            debouncedSearchRef.current(value);
          }}
        />
      </div>
    </div>
  );
};

export default PaletteSearch;
