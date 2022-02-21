import { Calendar } from "antd";
import { Moment } from "moment";
import React, { FC } from "react";
import { IEvent } from "../../models/EventsModel";
import { formatDate } from "../../utils/dates";

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
  function dateCellRender(value: Moment) {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter(
      (event) => event.date === formatedDate
    );
    console.log(currentDayEvents)
    return (
      <ul className="events">
        {currentDayEvents.map((event, index) => (
          <div key={event.description + index}>{event.description}</div>
        ))}
      </ul>
    );
  }

  return <Calendar dateCellRender={dateCellRender} />;
};
export default EventCalendar;
