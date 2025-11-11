const parseHashtags = (text: string) => {
  if (!text) return "";
  const words = text.split(" ");

  return words.map((word, index) => {
    if (word.startsWith("#"))
      return (
        <strong key={index} className="font-bold! text-white!">
          {word}{" "}
        </strong>
      );
    return `${word} `;
  });
};

export default parseHashtags;
