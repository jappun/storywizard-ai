const Next = ({ isLastPage, onNext }: { isLastPage: boolean; onNext: () => void }) => {
    return (
      <button
        onClick={onNext}
        className="px-6 py-2 bg-purple-500 text-white rounded-lg"
      >
        {isLastPage ? 'The End' : 'Next'}
      </button>
    );
  };
  
  export default Next;
  