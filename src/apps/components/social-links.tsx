type socialLinksTypes = {
  SocialData: {
    icon: React.ReactNode;
    url: string;
  }[];
};
export const SocialLink = ({ SocialData }: socialLinksTypes) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-5">
      {SocialData.map((soc, index) => (
        <a
          key={index}
          href={soc.url}
          target={soc.url.includes("mailto") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
        >
          {soc.icon}
        </a>
      ))}
    </div>
  );
};
