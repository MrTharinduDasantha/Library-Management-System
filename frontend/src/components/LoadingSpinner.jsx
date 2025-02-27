const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
