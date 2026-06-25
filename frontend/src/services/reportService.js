import { BACKEND_URL } from "./authService";
const API_URL = `${BACKEND_URL}/api/reports/generate`;

export const generateReport = async (rep, data, est) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reportType: rep,
      data: data,
      est: est,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate report");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  window.open(url, "_blank");
};

export const exportFilteredList = async (listType, searchFilter, est) => {
  console.log("Exporting list with parameters:", {
    listType,
    searchFilter,
    est,
  });
  const response = await fetch(
    `${BACKEND_URL}/api/reports/export-filtered-list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listType,
        searchFilter,
        est,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to export list");
  }

  const blob = await response.blob();

  return URL.createObjectURL(blob);
};
