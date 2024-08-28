export const calculateReadingTime = (text: string): number => {
  text = text.replace(/<[^>]*>?/gm, "");
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
};
