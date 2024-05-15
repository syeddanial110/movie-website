import { toast } from "react-toastify";


/**
 * 
 * @param {string} message
 * @param {('success'|'error')} type - Type of toast
 */
export const showToast = (message, type = "success") => {
    toast[type](message, {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}