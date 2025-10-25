const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="
          w-8 h-8 
          border-4 
          border-primary-main
          border-solid 
          rounded-full 
          border-t-transparent 
          animate-spin
        "
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
