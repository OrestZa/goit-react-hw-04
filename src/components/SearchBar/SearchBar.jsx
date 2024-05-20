import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import css from "../SearchBar/SearchBar.module.css";

const searchBarSchema = Yup.object().shape({
  query: Yup.string()
    .min(1, 'Too short!')
    .max(10, 'Too long!')
    .required('Required!'),
});

export default function SearchBar({ onSearch }) {
  const notify = message => toast.error(message);

  return (
    <header className={css.header}>
      <Formik
        initialValues={{ query: '' }}
        validationSchema={searchBarSchema}
        onSubmit={(values, actions) => {
          if (!values.query.trim()) {
            return notify('Can not be empty');
          }
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <div className={css.inputWrap}>
            <Field
              name="query"
              className={css.input}
              placeholder="Search images and photos"
              autoComplete="off"
              autoFocus
            />
            <button type="submit" className={css.btn}>
              <FiSearch size="16px" />
            </button>
          </div>
          <ErrorMessage className={css.error} name="query" as="span" />
        </Form>
      </Formik>
    </header>
  );
}
