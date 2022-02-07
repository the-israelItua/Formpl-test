import Icon from "../Icons";
import styles from "./pagination.module.scss";

const Pagination = ({
  limit,
  setLimit,
  page,
  setPage,
  floor,
  setFloor,
  totalItems,
  itemsToShow,
}) => {
  const onNext = () => {
    if (page === Math.ceil(totalItems / itemsToShow)) return;
    setPage(page + 1);
    setLimit(limit + 15);
    setFloor(floor + 15);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onPrev = () => {
    if (page === 1) return;
    setPage(page - 1);
    setLimit(limit - 15);
    setFloor(floor - 15);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__grp} onClick={onPrev}>
        <p> Previous</p>
      </div>
      <div className={styles.pagination__nums}>
        <div className={styles.pagination__nums__box}>
          <p data-testid="current-page">{page}</p>
        </div>
        <p data-testid="total-pages">
          of {Math.ceil(totalItems / itemsToShow)}
        </p>
      </div>
      <div className={styles.pagination__grp} onClick={onNext}>
        <p> Next</p>
        <Icon id="ArrowRight" />
      </div>
    </div>
  );
};

export default Pagination;
