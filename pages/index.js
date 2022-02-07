import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/index.module.scss";
import { Alert } from "@mui/material";
import SearchBar from "../components/SearchBar";
import InfoTab from "../components/InfoTab";
import TemplateCard from "../components/TemplateCard";
import Select from "../components/Select";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTemplates,
  filterTemplatesByCategory,
  findTemplateByName,
  filterTemplatesByOrder,
  filterTemplatesByDate,
} from "store/templateSlice";

export default function Home() {
  const { loading, filteredTemplates, error } = useSelector(
    (state) => state.templates
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [floor, setFloor] = useState(1);
  const [active, setActive] = useState("All");
  const [reset, setReset] = useState({ order: false, date: false });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTemplates());
  }, []);

  const viewedTemplates = filteredTemplates?.slice(floor - 1, limit);

  const onNameSearch = (name) => {
    dispatch(findTemplateByName(name));
    setPage(1);
  };

  const handleCategoryFilter = (category) => {
    dispatch(filterTemplatesByCategory(category));
    setActive(category);
    setPage(1);
    setFloor(1);
    setLimit(15);
    setReset({
      date: true,
      order: true,
    });
  };

  const handleOrderFilter = (order) => {
    dispatch(filterTemplatesByOrder(order));
    setPage(1);
    setFloor(1);
    setLimit(15);
    setReset({
      date: true,
      order: false,
    });
  };

  const handleDateFilter = (order) => {
    dispatch(filterTemplatesByDate(order));
    setPage(1);
    setFloor(1);
    setLimit(15);
    setReset({
      date: false,
      order: true,
    });
  };

  return (
    <>
      <Head>
        <title>FormPl Frontend Task</title>
        <meta name="description" content="FormPl Frontend Task" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.main__header}>
          <SearchBar onSearch={(val) => onNameSearch(val)} />
          <div className={styles.main__header__content}>
            <p>Sort By:</p>
            <div className={styles.main__header__right}>
              <div className={styles.main__header__right__item}>
                <Select
                  label="Category"
                  options={["All", "Education", "E-commerce", "Health"]}
                  onChange={(val) => handleCategoryFilter(val)}
                />
              </div>
              <div className={styles.main__header__right__item}>
                <Select
                  label="Order"
                  options={["Default", "Ascending", "Descending"]}
                  onChange={(val) => handleOrderFilter(val)}
                  reset={reset.order}
                />
              </div>
              <div className={styles.main__header__right__item}>
                <Select
                  label="Date"
                  options={["Default", "Ascending", "Descending"]}
                  onChange={(val) => handleDateFilter(val)}
                  reset={reset.date}
                />
              </div>
            </div>
          </div>
        </div>
        {error && (
          <Alert severity="error">
            Error fetching templates. Please, reload page.
          </Alert>
        )}

        <InfoTab />

        <div className={styles.main__content}>
          <div className={styles.main__content__header}>
            <h5>{active} Templates</h5>
            <p>
              {filteredTemplates?.length} template
              {filteredTemplates.length > 1 && "s"}
            </p>
          </div>
          {loading ? (
            <div className={styles.main__content__loading}>
              <p>Fetching Templates...</p>
            </div>
          ) : !viewedTemplates.length ? (
            <div className={styles.main__content__empty}>
              <p>Template not found</p>
            </div>
          ) : (
            <>
              <div className={styles.main__content__items}>
                {viewedTemplates?.map((item) => (
                  <TemplateCard item={item} key={item.name} />
                ))}
              </div>

              <div className={styles.main__content__pagination}>
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                  floor={floor}
                  setFloor={setFloor}
                  totalItems={filteredTemplates?.length}
                  itemsToShow={15}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
