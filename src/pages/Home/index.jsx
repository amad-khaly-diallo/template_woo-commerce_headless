import HomeSlider from "../../components/HomeSlider";
import PageContent from "../../components/PageContent";
import DeleteAccountButton from "../../components/DeleteAccountButton";
import Advantages from "../../components/Advantages";

export default function Home() {
  return (
    <main className="home">
      <PageContent slug="home" />
      <HomeSlider />
       <Advantages />
      <PageContent slug="a-propos" />
    </main>
  );
}
