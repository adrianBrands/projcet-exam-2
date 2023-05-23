import { ExclamationTriangle } from "react-bootstrap-icons";

/**
 * displays an error message if an api request fails
 * @returns {Function}
 * <div className="alert alert-warning">
      <ExclamationTriangle className="me-3" />
      Ups something went wrong...
    </div>
 */
export default function Error() {
  return (
    <div className="alert alert-warning">
      <ExclamationTriangle className="me-3" />
      Ups something went wrong...
    </div>
  );
}
