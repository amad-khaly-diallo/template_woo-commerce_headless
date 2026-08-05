import HomeSlider from "../../components/HomeSlider";
import PageContent from "../../components/PageContent";
import DeleteAccountButton from "../../components/DeleteAccountButton";

export default function Home() {
  return (
    <main className="home">
      <PageContent slug="home" />
      <HomeSlider />
      <PageContent slug="a-propos" />
    </main>
  );
}
