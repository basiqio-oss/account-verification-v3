import { useState } from "react";

export function Menu() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Home");

  function onMenuItemClick(e) {
    setSelectedMenuItem(e.menuItemTitle);
  }

  return (
    <div className="fixed bottom-0 left-0 z-0 w-full border-2 border-solid rounded-none sm:block sm:p-6 md:p-8 bg-header text-mobile-border-color">
      <div className="flex mt-3 mb-3">
        {MENU_ITEMS.map((m, i) => {
          return (
            <div key={`menu-item-${i}`} className="flex justify-center w-1/4">
              <img className="fixed w-5 h-5 mt-3" onClick={e => onMenuItemClick({ menuItemTitle: m.title, ...e })}
                src={`${selectedMenuItem === m.title ? m.selectedImage : m.image}`} alt={`${m.title}`} />
                {selectedMenuItem === m.title &&
                  <img className="w-12 h-12" src="/selected-menu-item.svg" alt="Selected" />
                }
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const MENU_ITEMS = [
  { title: "Home", image: "/home.svg", selectedImage: "/home-white.svg" },
  { title: "Work", image: "/work.svg", selectedImage: "/work-white.svg" },
  { title: "Chart", image: "/chart.svg", selectedImage: "/chart-white.svg" },
  { title: 'Upload', image: "/upload.svg", selectedImage: "/upload-white.svg" }
];