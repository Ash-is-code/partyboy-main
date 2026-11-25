import { ErrorState } from "./ErrorState";
import { Spinner } from "./Spinner";

export function ResourceBoundary({ status, error, onRetry, isEmpty, empty, children }) {
  if (status === "loading") return <Spinner />;
  if (status === "error") return <ErrorState message={error} onRetry={onRetry} />;
  if (isEmpty) return empty;
  return children;
}
