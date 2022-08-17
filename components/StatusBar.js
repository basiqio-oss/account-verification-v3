export function StatusBar() {
  return (
    <div className="flex justify-between mt-4 ml-7 h-11">
      <div className="font-medium text-center w-14 text-sm3">
        9:41
      </div>
      <div className="flex mr-[1.375rem]">
        <img className="w-4 mr-1 h-2.5" src='/cell-signal.svg' alt="Cell Signal" />
        <img className="w-4 mr-1 h-2.5" src='/wifi.svg' alt="Wifi" />
        <img className="w-6 h-3" src='/battery.svg' alt="Battery" />
      </div>
    </div>
  );
}