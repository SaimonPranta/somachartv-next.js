const getBanglaDateMonthYear = (dateString = new Date()) => {
    const months = [
      "জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন",
      "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ];
  
    const convertToBanglaDigits = (num) =>
      num.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);
  
    const date = new Date(dateString);
    const day = convertToBanglaDigits(date.getDate());
    const month = months[date.getMonth()];
    const year = convertToBanglaDigits(date.getFullYear());
  
    return `${day} ${month} ${year}`;
  };

export default getBanglaDateMonthYear