type SocialLinksProps = {
  SocialData: {
    icon: React.ReactNode;
    url: string;
  }[];
};

export const SocialLink = ({ SocialData }: SocialLinksProps) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-4">
      {SocialData.map((soc) => (
        <a
          key={soc.url}
          href={soc.url}
          target={soc.url.includes("mailto") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="theme-toggle text-[var(--text)]"
        >
          {soc.icon}
        </a>
      ))}
    </div>
  );
};
