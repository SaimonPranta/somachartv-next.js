const timeAgoInBengali = (dateString) => {
  const date = new Date(dateString)
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
  
    const units = [
      { label: "সেকেন্ড", seconds: 1 },
      { label: "মিনিট", seconds: 60 },
      { label: "ঘন্টা", seconds: 3600 },
      { label: "দিন", seconds: 86400 },
      { label: "মাস", seconds: 2592000 },
      { label: "বছর", seconds: 31536000 },
    ];
  
    for (let i = units.length - 1; i >= 0; i--) {
      const unit = units[i];
      if (diff >= unit.seconds) {
        const value = Math.floor(diff / unit.seconds);
        return `${value} ${unit.label} আগে`;
      }
    }
  
    return "এইমাত্র"; // Just now
  };

module.exports = timeAgoInBengali;
