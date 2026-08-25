import "./index.css";
import { useEffect, useState } from "react";
import { fetchCategoriesThunk } from "../../thunkActionsCreator/categoriesThunks";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk } from "../../thunkActionsCreator/productsThunks";
import { setFilters } from "../../slices/filtersSlice";

export default function Filters() {
  const dispatch = useDispatch();
  const { items: categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories,
  );
  const { list, loading, error } = useSelector((state) => state.products);
  const filters = useSelector((state) => state.filters);
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters =
    filters.category ||
    filters.min_price ||
    filters.max_price ||
    filters.orderby !== "date" ||
    filters.order !== "desc";

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    dispatch(setFilters({ category: e.target.value, search: "" }));
  };

  const handleSortChange = (e) => {
    const [orderby, order] = e.target.value.split("-");
    dispatch(setFilters({ orderby, order }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  return (
    <div className="filters">
      <div className="margin"></div>
      <div className={`content${isOpen ? " open" : ""}`}>
        <button
          type="button"
          className={`filter-toggle${isOpen ? " active" : ""}`}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="filter-controls"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span>Filtres</span>
          {hasActiveFilters && <span className="filter-toggle-dot"></span>}
        </button>
        <div
          id="filter-controls"
          className={`filter-controls${isOpen ? " open" : ""}`}
          inert={!isOpen}
        >
          <div className="filter-controls-inner">
            <select value={filters.category} onChange={handleCategoryChange}>
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  dangerouslySetInnerHTML={{ __html: cat.name }}
                ></option>
              ))}
            </select>
            <div className="price-group">
              <input
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handlePriceChange}
                placeholder="Prix min (€)"
              />
              <span className="price-separator">–</span>
              <input
                type="number"
                name="max_price"
                value={filters.max_price}
                onChange={handlePriceChange}
                placeholder="Prix max (€)"
              />
            </div>
            <select
              value={`${filters.orderby}-${filters.order}`}
              onChange={handleSortChange}
            >
              <option value="date-desc">Nouveautés</option>
              <option value="price-asc">Prix : du - cher au + cher</option>
              <option value="price-desc">Prix : du + cher au - cher</option>
              <option value="title-asc">Nom : A à Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
