const Back = ({ onBack }: { onBack: () => void; isFirstPage: boolean }) => {
  
    return (
      <button
        onClick={onBack}
        className="px-6 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50"
      >
        Back
      </button>
    );
  };
  
  export default Back;
  