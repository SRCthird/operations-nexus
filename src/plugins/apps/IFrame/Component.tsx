type Props = {
  title: string;
  url: string;
}

const IFrame = ({ title, url }: Props) => {

  return (
    <iframe
      height="100%"
      width="100%"
      src={url}
      title={title}
    ></iframe>
  );
};

export default IFrame;
