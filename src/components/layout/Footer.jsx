export default function Footer() {
  return (
    <div className="footer">
      <p className="d-flex text-warning justify-content-center align-items-center">
        &copy;{new Date().getFullYear()} All rights reserved
      </p>
    </div>
  );
}