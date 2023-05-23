import DatePicker from "react-datepicker";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { CALENDAR_OPTIONS } from "../../utilities/misc";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import axios from "axios";
import { bookings } from "../../utilities/constants";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const URL = bookings + "?_customer=true&_venue=true";
/**
 * displays a functional calendar on the single venues page if there is a logged in user and the logged in user
 * is not an owner of the specific venue.
 * @param {data} bookings 
 */
export default function Calendar(bookings) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dateRange, setDateRange] = useState(["", ""]);
  const [startDate, endDate] = dateRange;
  const { id } = useParams();
  const [token, setToken] = useState([]);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  function excludeDates() {
    return bookings.bookings.map((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);

      if (start > end) {
        return { start: end, end: start };
      } else {
        return { start, end };
      }
    });
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"));
    if (token) {
      setToken(token);
    }
  }, []);

  const schema = yup.object().shape({
    dateFrom: yup.string(),
    dateTo: yup.string(),
    guests: yup.number(),
    venueId: yup.number(),
  });

  let startDateToAPI = startDate ? startDate.toISOString() : "";
  let endDateToAPI = endDate ? endDate.toISOString() : "";

  let startDateFormatted = startDate ? startDate.toLocaleDateString("en-GB", CALENDAR_OPTIONS).replace(",", "") : "";
  let endDateFormatted = endDate ? endDate.toLocaleDateString("en-GB", CALENDAR_OPTIONS).replace(",", "") : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setBookingError(null);

    data = {
      dateFrom: startDateToAPI,
      dateTo: endDateToAPI,
      guests: data.guests,
      venueId: id,
    };

    //console.log(data);
    //console.log(token.accessToken);

    try {
      const response = await axios.post(URL, data, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });

      //console.log(response.data);

      setSubmitted(true);
    } catch (error) {
      console.log("error", error.response.data.errors[0].message);
      setBookingError(error.response.data.errors[0].message.toString());
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <p className="fs-3 text-primary ">
          Success, go and checkout your latest <Link to={"/profile"}>booking</Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-3">
        <p className="text-danger">{bookingError ? bookingError + " please try again" : null}</p>
      </div>
      <Form className="bookingForm d-flex align-items-center justify-content-center mt-3" onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={error}>
          <div className="d-flex align-items-center justify-content-center">
            <DatePicker
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd/MM/yyyy"
              selectsRange
              fixedHeight={true}
              inline
              calendarClassName="calendar_enquire"
              isClearable={true}
              excludeDateIntervals={excludeDates()}
              onChange={(update) => {
                setDateRange(update);
              }}
              minDate={new Date()}
            />
          </div>

          <Form.Group className="d-flex mb-4 mt-md-1 align-items-center">
            <div>
              <Form.Label className="mb-2"></Form.Label>
              <Form.Control placeholder="from-date" type="text" value={startDateFormatted} className="me-4" disabled />
            </div>

            <span className="mx-3">-</span>
            <div>
              <Form.Label className="mb-2 "></Form.Label>
              <Form.Control placeholder="to-date" type="text" value={endDateFormatted} disabled />
            </div>
          </Form.Group>

          <Form.Group>
            <div>
              <Form.Label className="mb-2 "></Form.Label>
              <Form.Control placeholder="guests" type="number" {...register("guests")} />
            </div>
          </Form.Group>
          {token.accessToken ? (
            <div className="d-grid">
              <Button variant="outline-primary" size="lg" className="mt-3 mb-3" type="submit">
                {submitting ? "Booking..." : "Book"}
              </Button>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <p className="mt-3 text-primary fw-bolder fs-4">Sign up or register to book this venue</p>
              </div>
              <div className="d-flex mb-3 justify-content-around">
                <Button href={`/register`}>register</Button>
                <Button href={`/Sign-in`}>sign in</Button>
              </div>
            </div>
          )}
        </fieldset>
      </Form>
    </>
  );
}
