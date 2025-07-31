import { Folder } from "lucide-react";

const ExplorerApp = () => {
  return (
    <div
      className="w-full h-full bg-white border-2 border-gray-400"
      style={{ borderStyle: "inset" }}
    >
      <div className="p-2">
        <div className="flex items-center gap-2 mb-2">
          <Folder className="w-4 h-4" />
          <span className="text-sm">My Computer</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 hover:bg-blue-100 cursor-pointer">
            <Folder className="w-6 h-6" />
            <span className="text-sm">C: Drive</span>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-blue-100 cursor-pointer">
            <Folder className="w-6 h-6" />
            <span className="text-sm">D: Drive</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExplorerApp;
