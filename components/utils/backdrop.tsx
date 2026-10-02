import useStore from "@/hooks/use-store";

const Backdrop = () => {
  const isSidebarOpen = useStore((state) => state.isSideBarOpen);
  const isCheckoutOpen = useStore((state) => state.isCheckoutOpen);
  const setSideBarOpen = useStore((state) => state.setSideBarOpen);
  const setCheckoutOpen = useStore((state) => state.setCheckoutOpen);

  const isBackdropVisible = isSidebarOpen || isCheckoutOpen;

  if (!isBackdropVisible) {
    return null;
  }

  const backdropClick = () => {
    setSideBarOpen(false);
    setCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black opacity-30 fixed top-0 left-0 w-full h-dvh z-backdrop" onClick={backdropClick} role="button"/>
  );
};

export default Backdrop;
