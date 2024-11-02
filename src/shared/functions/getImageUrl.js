import { BACKEND_URL } from "../constants/ulrList";

const getImageUrl = (img, index = 0) => {
  let url = "";
  if (Array.isArray(img)) {
    const firstElement = img[index];
    if (typeof firstElement === "object" && firstElement !== null) {
      url = `${BACKEND_URL}/${firstElement.src}`;
    }else{
      url = `${BACKEND_URL}/${firstElement}`;
    }
  } else {
    url = `${BACKEND_URL}/${img}`;
  } 
  return url;
};

export default getImageUrl;
