import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { Moment } from "moment";
import React, { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IEvent } from "../../models/EventsModel";
import { IUser } from "../../models/UserModel";
import { formatDate } from "../../utils/dates";
import { rules } from "../../utils/rules";

interface EventFromProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFromProps> = ({ guests, submit }) => {
  const { user } = useTypedSelector((state) => state.auth);

  const [event, setEvent] = useState<IEvent>({
    author: "",
    guest: "",
    date: "",
    description: "",
  } as IEvent);

  const selectDate = (date: Moment | null) => {
    if (date) {
      const formated = formatDate(date.toDate());
      setEvent({ ...event, date: formated });
    }
  };

  const onChangeSelect = (guest: string) => {
    setEvent({ ...event, guest });
  };

  const submitForm = () => {
    submit({ ...event, author: user.username });
  };
  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Event discription"
        name="discription"
        rules={[rules.required()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Date of event"
        name="date"
        rules={[rules.isDayAfter("can't select day before current date")]}
      >
        <DatePicker allowClear={false} onChange={selectDate} />
      </Form.Item>
      <Form.Item label="Select guests" name="guests" rules={[rules.required()]}>
        <Select style={{ width: 120 }} onChange={onChangeSelect}>
          {guests.map((guest, index) => (
            <Select.Option key={guest.username + index} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
