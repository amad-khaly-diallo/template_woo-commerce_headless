import { useSelector } from "react-redux";
import Feed from "../../components/Feed";
import Filters from "../../components/Filters";
import "./index.css";

const BACKGROUNDS = {
  femme: "/backgrounds/femme.jpg",
  homme: "/backgrounds/homme.jpg",
  mixte: "/backgrounds/mixte.jpg",
};
export default function Store() {
  const catId = useSelector((state) => state.filters.category);
  const categories = useSelector((state) => state.categories.items);
  const slug = categories.find((cat) => cat.id.toString() === catId)?.slug;
  const bg = BACKGROUNDS[slug];

  return (
    <main className="store-page">
      <Filters />
      <div className="category-bg" style={{ "--cat-bg": bg ? `url(${bg})` : "none" }}>
        <Feed />
      </div>
    </main>
  );
}
