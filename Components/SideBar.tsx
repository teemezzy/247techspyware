import React from 'react';
import AdminProfile from './AdminProfile';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const SideBar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const items = ["dashboard", "posts", "categories", "comments", "users", "settings"];

  return (
    <aside className="h-screen min-w-1/4 bg-secondary text-white flex flex-col py-30 px-20">
      <div className="text-2xl font-bold mb-10"><AdminProfile/></div>

      <nav className="flex flex-col gap-10 pt-20 flex-1">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setActiveView(item)}
            className={`
              text-left text-2xl text-gray-400 font-bold py-2 rounded
              ${activeView === item ? "text-primary" : "hover:text"}
            `}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
