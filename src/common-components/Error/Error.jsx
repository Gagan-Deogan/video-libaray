export const Error = ({ setStatus }) => {
  return (
    <div className="column justify-center align-center">
      <h2 className="margin-t-64 sm-w8 w6 text-center">
        There is Some issue, Please try Again later
      </h2>
      <button
        className="sm-btn-pry-fil margin-t-8"
        onClick={() => setStatus("IDLE")}>
        Retry
      </button>
    </div>
  );
};
