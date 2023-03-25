export const alertError = 'error'
export const alertWarning = 'warning'
export const alertInfo = 'info'
export const alertSuccess = 'success'

export const messageSaveSuccess = 'Save successfully!!!'
export const messageSaveFailure = 'Save unsuccessfully!!!'
export const messageSubmitSuccess = 'Submit successfully!!!'
export const messageSubmitFailure = 'Submit unsuccessfully!!!'
export const messageGetFailure = 'Get data unsuccessfully!!!'
export const messageDuplication = 'Duplicate date!!!'

const prod = {
    url: {
        API_URL_FOLDER: '/EasyEnglish',
        //API_URL: 'http://117.20.66.140:8080/GCH'
        API_URL: 'https://gchweb.azurewebsites.net/'
    }
};
const dev = {
    url: {
        API_URL_FOLDER: '',
        API_URL: 'http://localhost:7728'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod