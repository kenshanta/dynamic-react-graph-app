import { HousingService } from "../services";

const housingItemsList = await HousingService.getInitialHousing();
export const labels = housingItemsList
  ? Object.keys(housingItemsList.dimension.Tid.category.label)
  : [];

export const data = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "Linear 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 3,
      data: housingItemsList.value,
    },
    {
      type: "bar" as const,
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "white",
      borderWidth: 3,
      data: housingItemsList.value,
    },
  ],
};
