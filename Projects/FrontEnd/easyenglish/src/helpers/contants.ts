/* eslint-disable @typescript-eslint/no-explicit-any */
export const alertError = "error";
export const alertWarning = "warning";
export const alertInfo = "info";
export const alertSuccess = "success";

export const messageSaveSuccess = "Save successfully!!!";
export const messageSaveFailure = "Save unsuccessfully!!!";
export const messageSubmitSuccess = "Submit successfully!!!";
export const messageSubmitFailure = "Submit unsuccessfully!!!";
export const messageGetFailure = "Get data unsuccessfully!!!";
export const messageDuplication = "Duplicate date!!!";

const prod = {
  url: {
    API_URL_FOLDER: "",
    API_URL: "https://easyenglishapi.azurewebsites.net/",
  },
};
const dev = {
  url: {
    API_URL_FOLDER: "",
    API_URL: "http://localhost:5097",
  },
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;

export function findArrayElementById(array: any, id: any) {
  return array.find((element: any) => {
    return element.id === id;
  });
}

export function isEquals(a : string | number, b: string | number) {
  return typeof a === 'string' && typeof b === 'string'
      ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
      : a === b;
}