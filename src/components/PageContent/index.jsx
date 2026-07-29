import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageThunk } from "../../thunkActionsCreator/pagesThunks";

// Composant pour afficher le contenu d'une page
export default function PageContent({ slug }) {
  const page = useSelector((state) => state.pages.items[slug]);
  const loading = useSelector((state) => state.pages.loading);
  const error = useSelector((state) => state.pages.error);
  const dispatch = useDispatch();

  // Référence pour accéder à l'élément conteneur du DOM
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPageThunk(slug));
  }, [dispatch, slug]);

  // Effet pour intercepter la soumission du formulaire dynamique
  useEffect(() => {
    if (!page) return;

    const container = containerRef.current;
    if (!container) return;

    // Recherche de l'élément formulaire dans le DOM
    const formElement = container.querySelector("form");
    if (!formElement) return;

    // Gestion de l'événement de soumission du formulaire
    const handleFormSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData(formElement);

      // Extraction des valeurs des champs du formulaire
      const userName =
        formData.get("your-name") ||
        formData.get("name") ||
        "";
      const userEmail =
        formData.get("your-email") ||
        formData.get("email") ||
        "";
      const userSubject =
        formData.get("your-subject") ||
        formData.get("subject") ||
        "Demande de contact";
      const userMessage =
        formData.get("your-message") ||
        formData.get("message") ||
        "";

      // Configuration de l'e-mail de destination
      const targetEmail = "contact@example.com";
      const emailSubject = `${userSubject} - ${userName}`;
      const emailBody = `Nom: ${userName}\nE-mail: ${userEmail}\n\nMessage:\n${userMessage}`;

      // Construction et redirection vers l'URL mailto
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;

    window.open(mailtoUrl, "_blank");    
  };

    formElement.addEventListener("submit", handleFormSubmit);

    // Nettoyage de l'écouteur d'événement
    return () => {
      formElement.removeEventListener("submit", handleFormSubmit);
    };
  }, [page]);

  if (!page && error) return <p>{error}</p>;
  if (!page || loading) return <p>Chargement…</p>;

  const title = page.title ?? "";
  const content = page.content ?? "";

  return (
    <div ref={containerRef}>
      <h1 dangerouslySetInnerHTML={{ __html: title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </div>
  );
}