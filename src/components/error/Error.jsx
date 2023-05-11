import { ExclamationTriangle } from "react-bootstrap-icons"

export default function Error(){
  return (
    <div className="alert alert-warning">
      <ExclamationTriangle className="me-3" />
      Ups something went wrong...
    </div>
  )
}

