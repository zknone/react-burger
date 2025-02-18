import styles from './not-found-page.module.css';
const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-5">404</h1>
      <p className="text text_type_main-default">Страница не найдена</p>
    </div>
  );
};

export default NotFoundPage;
