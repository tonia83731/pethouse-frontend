import { twcity } from "./twcity";
const twcitydata = twcity.map(({ name }) => {
  return {
    value: name,
    label: name,
  };
});

twcitydata.unshift({
  label: "全部",
  value: "全部",
});

export { twcitydata };
