import ClipLoader from "react-spinners/ClipLoader";

/**
 * displays a circled red loader. 
 */
export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <ClipLoader color="red" size={150} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
}
