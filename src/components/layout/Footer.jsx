export default function Footer() {
  return (
    <div className="footer">
      <p className="d-flex text-white justify-content-center align-items-center">
        &copy;{new Date().getFullYear()} Holidaze, inc
      </p>
    </div>
  );
}