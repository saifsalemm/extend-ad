const ErrorMsg = ({ message }: { message: string }) => {
  return <p className="error-msg">Error: {message}</p>;
};

export default ErrorMsg;
