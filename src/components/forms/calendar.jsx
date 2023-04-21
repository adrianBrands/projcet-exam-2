import DatePicker from "react-datepicker";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { CALENDAR_OPTIONS } from "../../utilities/misc";
import { AiOutlineClose } from "react-icons/ai";
export default function Calendar(){
  
  
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const clicked = () => {
    setDateRange([null, null]);
  };

  let startDateFormatted = startDate ? startDate.toLocaleDateString("en-GB", CALENDAR_OPTIONS).replace(",", "") : "";
  let endDateFormatted = endDate ? endDate.toLocaleDateString("en-GB", CALENDAR_OPTIONS).replace(",", "") : "";

  return (
    <Container className="mb-5">
      <div className="calendar">
        <DatePicker
        calendarClassName="calendar_enquire"
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        dateFormat="dd/MM/yyyy"
        selectsRange
        inline
        minDate={new Date()}
        isClearable={true}
        fixedHeight={true}
        onChange={(update) => {
          setDateRange(update);
        }}
        />
      </div>
      <Form.Group className="d-flex mb-4 mt-md-1 align-items-center">
        <div>
          <Form.Label className="mb-2 d-md-none" style={{ fontSize: "14px" }}>
            From:
          </Form.Label>
          <Form.Control
            placeholder="From date"
            type="text"
            value={startDateFormatted}
            className="me-4"
            disabled
          />
        </div>
        <span className="mx-3">-</span>
        <div>
          <Form.Label className="mb-2 d-md-none" style={{ fontSize: "14px" }}>
            To:
          </Form.Label>
          <Form.Control placeholder="To date" type="text" value={endDateFormatted} disabled />
        </div>
      </Form.Group>
      <div onClick={clicked} style={{ fontSize: "15px" }}>
        <AiOutlineClose/>
        <span className="">Delete date</span>
      </div>
    </Container>
    
  )
}