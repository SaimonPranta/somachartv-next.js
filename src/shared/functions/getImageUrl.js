const getImageUrl = (img, index = 0) => {
  let url = "";
  if (Array.isArray(img)) {
    const firstElement = img[index];
    if (typeof firstElement === "object" && firstElement !== null) {
      url = `/api/media/${firstElement.src}`;
    }else{
      url = `/api/media/${firstElement}`;
    }
  } else {
    url = `/api/media/${img}`;
  } 
  return url;
};

export default getImageUrl;
