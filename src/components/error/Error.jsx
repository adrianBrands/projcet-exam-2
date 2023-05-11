import { FaFrown } from "react-icons/fa"

export default function Error(){
  return (
    <div className="alert alert-warning">
      <FaFrown />
      Upps something went wrong
    </div>
  )
}