"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorProps) => {
  return <div>{error.message}</div>;
};

export default ErrorPage;
