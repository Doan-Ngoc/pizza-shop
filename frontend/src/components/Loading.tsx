const Loading = () => {
  return (
    <div className="text-center">
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span> 
      </div>
      <h3>Loading...</h3>
      <p>
        If it's your first time visiting the website, it may take around 1
        minute to finish loading. Thank you for your patient.
      </p>
    </div>
  );
};

export default Loading;
