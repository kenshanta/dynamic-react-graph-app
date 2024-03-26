import { API } from "./apis";
import { AxiosRequestConfig } from "axios";

export class HousingService {
  async getInitialHousing(
    props = {
      housingType: ["00"],
      quarterlyRange: ["2009K1", "2009K2", "2009K3", "2009K4"],
    },
  ) {
    const data = {
      query: [
        {
          code: "Boligtype",
          selection: {
            filter: "item",
            values: props.housingType,
          },
        },
        {
          code: "ContentsCode",
          selection: {
            filter: "item",
            values: ["KvPris"],
          },
        },
        {
          code: "Tid",
          selection: {
            filter: "item",
            values: props.quarterlyRange,
          },
        },
      ],
      response: {
        format: "json-stat2",
      },
    };
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `https://data.ssb.no/api/v0/no/table/07241`,
      data: data,
    };
    const response = await API.request(config);
    return response.data;
  }
}

const housingService = new HousingService();

export default housingService;
