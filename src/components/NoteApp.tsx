const NoteApp = () => {
  return (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full p-2 border-2 border-gray-400 resize-none font-mono text-sm"
        style={{ borderStyle: "inset" }}
        placeholder="Type your text here..."
      />
    </div>
  );
};
export default NoteApp;
