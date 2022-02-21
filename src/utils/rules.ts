import moment, { Moment } from "moment";

export const rules = {
  required: (massage: string = "Required field") => ({
    required: true,
    massage,
  }),
  isDayAfter: (massage: string) => () => ({
    validator(_: any, value: Moment) {
      if (value.isSameOrAfter(moment())) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(massage));
    },
  }),
};
