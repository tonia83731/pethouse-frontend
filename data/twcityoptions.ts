import { twcity } from "./twcity";
const twcitydata = twcity.map(({ name_en }) => {
  return {
    value: name_en,
    label: name_en,
  };
});

twcitydata.unshift({
  label: "All",
  value: "All",
});

export { twcitydata };
