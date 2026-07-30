import PageContent from "../../components/PageContent";

export default function Contact() {
  const targetEmail = "contact@example.com";
  
  const mailtoUrl = `mailto:${targetEmail}`;

  const handleButtonClick = () => {
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div>
      <PageContent slug="contact" />
      <div>
        <button type="button" onClick={handleButtonClick}>
          Envoyer un e-mail
        </button>
      </div>
    </div>
  );
}