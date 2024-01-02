type ErrorHandling = {
  error: string;
};

function ErrorHandling({ error }: ErrorHandling) {
  console.log(error);
  return <div className="font-bold  ">{error}</div>;
}

export default ErrorHandling;
