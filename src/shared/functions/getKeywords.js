const getKeywords = (newsDetails) => {
  const keywords =
    newsDetails?.keywords ||
    newsDetails?.title
      ?.replace(/[.,।]/g, "")           
      .split(/\s+/)                    
      .slice(0, 10)                      
      .map((word) => word.toLowerCase())  
      .join(", ");
      
  return keywords || "";   
};

module.exports = getKeywords;

