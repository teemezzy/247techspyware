import React from 'react';

interface MobileNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeView, setActiveView }) => {
  const items = ["dashboard", "posts", "categories", "comments", "users", "settings"];

  return (
    <aside className="h-screen w-1/4 bg-secondary text-white flex flex-col py-30 px-20">
      <h1 className="text-2xl font-bold mb-10">Admin</h1>

      <nav className="flex flex-col gap-10 pt-20 flex-1">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setActiveView(item)}
            className={`
              text-left text-3xl font-bold px-4 py-2 rounded
              ${activeView === item ? "text-primary" : "hover:bg-gray-800"}
            `}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default MobileNav;
