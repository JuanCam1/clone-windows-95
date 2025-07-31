import { Edit } from "lucide-react";

const PaintApp = () => {
  return (
    <div
      className="w-full h-full bg-white border-2 border-gray-400"
      style={{ borderStyle: "inset" }}
    >
      <div className="p-2">
        <div className="flex items-center gap-2 mb-2">
          <Edit className="w-4 h-4" />
          <span className="text-sm">Paint</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 hover:bg-blue-100 cursor-pointer">
            <Edit className="w-6 h-6" />
            <span className="text-sm">New Image</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaintApp;
