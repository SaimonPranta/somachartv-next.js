const sliceTextByDelimiter = (text, charLimit) => {
  // If the text is already within the limit, return it as is
  if (text.length <= charLimit) return text;

  // Slice up to the character limit
  const sliced = text.slice(0, charLimit);

  // Find the last occurrence of '।' within the sliced text
  const lastDelimiterIndex = sliced.lastIndexOf("।");

  // If a delimiter is found, slice until that point; otherwise, return the sliced text
  return lastDelimiterIndex !== -1
    ? sliced.slice(0, lastDelimiterIndex + 1)
    : sliced;
};

export default sliceTextByDelimiter;
