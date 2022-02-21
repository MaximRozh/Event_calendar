import { Button, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { FC, useEffect, useState } from "react";
import EventCalendar from "../components/Calendar";
import EventForm from "../components/Calendar/EventForm";
import { useAction } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/EventsModel";

const Event: FC = () => {
  const [modalVisible, setVodalVisible] = useState(false);
  const { fetchGuests, fetchEvents, createEvent } = useAction();
  const { user } = useTypedSelector((state) => state.auth);
  const { guests, events } = useTypedSelector((state) => state.event);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);
  const submit = (event: IEvent) => {
    setVodalVisible(false);
    createEvent(event);
  };
  console.log(events);
  return (
    <div>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setVodalVisible(true)}>Add Event</Button>
      </Row>
      <Modal
        title="Add event"
        visible={modalVisible}
        footer={null}
        onCancel={() => setVodalVisible(false)}
      >
        <EventForm guests={guests} submit={submit} />
      </Modal>
    </div>
  );
};

export default Event;
