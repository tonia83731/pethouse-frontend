import { twcity } from "./twcity";
const twcitydata = twcity.map(({ name }) => {
  return {
    value: name,
    label: name,
  };
});
export const twcitydataWithCode = twcity.map(({ code, name }) => {
  return {
    value: code,
    label: name,
  };
});
twcitydata.unshift({
  label: "全部",
  value: "全部",
});
twcitydataWithCode.unshift({
  value: "",
  label: "全部",
});

export { twcitydata };
