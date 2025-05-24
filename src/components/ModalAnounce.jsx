function ModalAnounce({ content, error, handleClose }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-xl w-[400px] flex flex-col items-center justify-center">
        <p className={`text-lg ${error ? "text-red-400" : "text-green-400"}`}>
          {error ? error : content}
        </p>
        <button onClick={handleClose} className="bg-green-400 text-white mt-4">
          OK
        </button>
      </div>
    </div>
  );
}

export default ModalAnounce;
