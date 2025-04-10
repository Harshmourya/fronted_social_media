import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToastMessage = (type , message) =>{

    if(!toast.isActive(type)){
        toast[type](`${message}`, {
            toastId : type,
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }
}

export default showToastMessage;