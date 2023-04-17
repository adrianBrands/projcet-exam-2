import { FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer d-flex text-white  align-items-center">
      <p className="inc ms-3 me-auto">
        &copy;{new Date().getFullYear()} Holidaze, inc 
      </p>
      <h3 className="social"><FaFacebook/></h3>
      <h3 className="social"><FaInstagram/></h3>
      <h3 className="social"><FaTwitter/></h3>
      
    </div>
    
  );
}