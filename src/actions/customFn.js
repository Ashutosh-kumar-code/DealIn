import axios from "axios";
import { useEffect, useState } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { Route } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReviewsIcon from "@mui/icons-material/Reviews";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CryptoJS from "crypto-js";

import Alert from "@mui/material/Alert";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const importAll = (r) => {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(require.context("../assets/images", false));


const hideAllConsole = () => {
  // console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
};
//Get Routs
const GetRoutes = (allRoutes) =>
  allRoutes.map((route) => {
    if (route.route) {
      return (
        <Route exact path={route.route} element={route.page} key={route.key} />
      );
    }
    return null;
  });

//   Show Success message
export const successMsg = async (msg) => {
  const msgStyle = {
    id: "",
    position: "botton-left",
    // duration: "100000",
    loading: true,
    style: {
      padding: "9px",
      boxShadow: "0px 10px 30px 0px rgba(69, 74, 166, 0.6)",
      // background:
      //   "linear-gradient(321deg, rgb(73 223 13 / 86%) 34%, rgb(6, 217, 14) 68%, rgb(76, 217, 6) 82%)",
      background: "#313131",
      color: "#fff",

      fontSize: "14px",
      fontWeight: "600",
      width: "20%",
      borderRadius: "0px",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#313131",
      // secondary: "#4a8d00",
    },
  };

  const loadingToast = toast.loading("Loading...", msgStyle);
  msgStyle.id = loadingToast;
  // Simulate an async operation
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // Update to success

  const newMsg = (
    <div className="toast_new_msg">
      {`${msg}`}
      <button onClick={() => toast.dismiss(msgStyle.id)}>X</button>
    </div>
  );

  //  const newMsg = msg + <button onClick={() => toast.dismiss(msgStyle.id)}>"X"</button>
  toast.success(newMsg, msgStyle);
};

// Show error message
export const errorMsg = async (msg) => {
  const msgStyle = {
    id: "",
    position: "top-center",
    // duration: "100000",
    loading: true,
    style: {
      padding: "9px",
      // boxShadow: "0px 10px 30px 0px rgba(69, 74, 166, 0.6)",
      background:
        "linear-gradient(321deg, rgb(255 0 0 / 86%) 34%, rgb(255 0 0) 68%, rgb(255 0 0) 82%)",
      color: "#fff",

      fontSize: "14px",
      fontWeight: "600",
      width: "20%",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#ff0101",
    },
  };

  // const loadingToast = toast.loading("Loading...", msgStyle);
  // msgStyle.id = loadingToast;
  // // Simulate an async operation
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // // Update to success
  // toast.error(msg, msgStyle);
};

// Show Warning message
export const warningMsg = async (msg) => {
  const msgStyle = {
    id: "",
    position: "top-center",
    // duration: "100000",
    loading: true,
    style: {
      padding: "9px",
      // boxShadow: "0px 10px 30px 0px rgba(69, 74, 166, 0.6)",
      background:
        "linear-gradient(321deg, rgb(255 141 0 / 86%) 34%, rgb(255 153 0) 68%, rgb(255 165 0) 82%)",
      color: "#fff",

      fontSize: "14px",
      fontWeight: "600",
      width: "20%",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#ff8201",
    },
  };

  toast.success(msg, msgStyle);
};

// Handle All erros
export const handleCatchErrors = ({
  error,
  navigate,
  rejectWithValue,
  path,
}) => {
  if (error.code == "ERR_NETWORK") {
    if (rejectWithValue) {
      navigate("/something-went-wrong");
      return rejectWithValue(error.message);
    }
  } else {
    navigate("/something-went-wrong");
  }
};

export const CountdownTimer = ({ onTimerEnd }) => {
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(intervalId);
            // Call the callback function when the timer ends
            onTimerEnd();
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timeRemaining, onTimerEnd]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    secs  = secs == 0 ? 60 : secs
    // return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    return `${secs < 10 ? "0" : ""}${secs}`;
  };

  return timeRemaining > 0 ? (
    <span className="timer-message">
      <div class="alert  timer-content" role="alert">
        <div>
          <p className="resend_codepara">Resend code in {formatTime(timeRemaining) || 60 } seconds</p>
        </div>
      </div>
    </span>
  ) : null;
};

export const handleScrollError = (errors) => {
  const errorsvalues = Object.keys(errors);
  if (errorsvalues.length > 0) {
    let firstErrorElement = document.getElementsByName(errorsvalues[0])[0];
    if (firstErrorElement !== null && firstErrorElement !== "") {
      firstErrorElement.scrollIntoView({ behavior: `smooth`, block: "center" });
    }
  }
};

export const handleScrollAlertError = (errors) => {
  const errorsvalues = errors;
  // if (errorsvalues ) {
    // let firstErrorElement = document.getElementById(errorsvalues)[0];
    let firstErrorElement = document.getElementById("mui_alerterror");
     
    if (firstErrorElement !== null && firstErrorElement !== "") {
      firstErrorElement.scrollIntoView({ behavior: `smooth`, block: "center" });
    }
  // }
};

export async function convertImageUrlToBase64(url) {
  try {
    // Fetch the image as a Blob
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();

    // Convert Blob to Base64 string
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result); // This is the Base64 string
      };
      reader.onerror = (error) => {
        console.error("Error reading Blob as Base64:", error);
        reject(new Error("Error reading Blob as Base64."));
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    return undefined; // Return undefined explicitly if there's an error
  }
}

export function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/?[A-z]*;base64,/);
}

export const imageUrlToBase64 = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
    reader.onerror = reject;
  });
};

export const AppendIcon = (notification) => {
  let icon = "";
  let data = notification.data;

  if (data.elementCode == "OF1") {
    icon = <LocalOfferIcon style={{ color: data.elementColour }} />;
  } else if (data.elementCode == "OF2") {
    icon = <CheckCircleIcon style={{ color: data.elementColour }} />;
  } else if (data.elementCode == "OF3") {
    icon = <NotInterestedIcon style={{ color: data.elementColour }} />;
  } else if (data.elementCode == "RV1") {
    icon = <RateReviewIcon style={{ color: data.elementColour }} />;
  } else if (data.elementCode == "RV2") {
    icon = <ReviewsIcon style={{ color: data.elementColour }} />;
  } else {
    icon = <NotificationsIcon style={{ color: data.elementColour }} />;
  }

  return icon;
  // return <LocalOfferIcon />
};

// ==================Encription And Decription starts============
export const handleEncrypt = (formData) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const encryptedPassword = CryptoJS.AES.encrypt(
    formData.password,
    secretKey
  ).toString();
  const dealinCredential = {
    email: formData.email,
    password: encryptedPassword,
  };
  localStorage.setItem(
    "dealin_remember_token",
    JSON.stringify(dealinCredential)
  );
};

export const handleDecrypt = () => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const dealinCredential = JSON.parse(
    localStorage.getItem("dealin_remember_token")
  );
  if (dealinCredential) {
    const bytes = CryptoJS.AES.decrypt(dealinCredential.password, secretKey);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    const data = {
      email: dealinCredential.email,
      password: decryptedPassword,
    };
    return data;
  }
};
// ==================Encription And Decription ends============

export const handleRedirect = (value) => {
  // MOTORVEHICLES001
  // PROPERTY001
  
  if (value?.category?.categoryCode == "MOTORVEHICLES001") {
    return `/vehicle-detail/${value?.id}`;
  } else if (value?.category?.categoryCode == "PROPERTY001") {
    return `/property-details/${value?.id}`;
  } else {  
    return `/general-listing/${value?.id}` 
  }
 
  // if (value?.category?.categoryCode == "MOTORVEHICLES001") {
  //   return `/vehicle-detail/${id}`;
  // } else if (value?.category?.categoryCode == "PROPERTY001") {
  //   return `/property-details/${id}`;
  // } else {
  //   return `/general-listing/${id}`;
  // }

};

export const removeToken = () => {
  localStorage.removeItem("dealin_accessToken");
  localStorage.removeItem("dealin_userId");
  localStorage.removeItem("dealin_refreshToken");
  
};

// ============ Limit content - show dots for long content  ========

const screenWidth = window.innerWidth;

export const limitedContent = (content, limit, responsivelimit,biglimit, midlimit) => {
  if(responsivelimit || biglimit || midlimit){
  if(screenWidth <= 425){
    return content.length > responsivelimit ? content.substring(0, responsivelimit) + "..." : content;
  } else if(screenWidth > 1740){
    return content.length > biglimit ? content.substring(0, biglimit) + "..." : content;
  }
   else if(screenWidth < 768){
    return content.length > midlimit ? content.substring(0, midlimit) + "..." : content;
  }
}

    return content.length > limit ? content.substring(0, limit) + "..." : content;

  
};

 
// ============= meta tag seo =============
// export const MetaData = (props) => {
//   props.data && (
//     <>
//       {(document.title = props.data.title)}
//       {document
//         .getElementById("meta-description")
//         .setAttribute("content", props.data.description)}
//       {document
//         .getElementById("meta-keywords")
//         .setAttribute("content", props.data.keyword)}
//     </>
//   );
// };


 

export { images, GetRoutes , hideAllConsole };
