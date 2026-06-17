import { Plus } from "lucide-react";

function Header({ openModal }) {
  return (
    <header className="
      sticky top-0 z-50
      backdrop-blur-xl
      bg-white/40
      border-b border-white/20
      shadow-sm
    ">
      <div className="
        max-w-7xl mx-auto px-6 py-4
        flex items-center justify-between
      ">

        <h1 className="
          text-2xl font-bold
          bg-gradient-to-r from-blue-600 to-purple-600
          bg-clip-text text-transparent
        ">
          Kanban Board
        </h1>

        <button
          onClick={openModal}
          className="
            flex items-center gap-2
            bg-blue-600 hover:bg-blue-700
            text-white px-4 py-2
            rounded-xl transition
          "
        >
          <Plus size={18} />
          Add Task
        </button>

      </div>
    </header>
  );
}

export default Header;