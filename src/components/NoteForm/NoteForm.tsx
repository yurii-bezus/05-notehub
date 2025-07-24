import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import type { CreateNoteData } from '../../types/note';

interface NoteFormProps {
  onSubmitNote: (note: CreateNoteData) => void;
  onCancel: () => void;
}

export default function NoteForm({ onSubmitNote, onCancel }: NoteFormProps) {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      tag: 'Todo',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(50, 'Title must be at most 50 characters')
        .required('Required'),
      content: Yup.string().max(500, 'Content must be at most 500 characters'),
      tag: Yup.string()
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
        .required('Required'),
    }),
    onSubmit: (values) => {
      onSubmitNote(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <span className={css.error}>{formik.errors.title}</span>
        ) : null}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
        />
        {formik.touched.content && formik.errors.content ? (
          <span className={css.error}>{formik.errors.content}</span>
        ) : null}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {formik.touched.tag && formik.errors.tag ? (
          <span className={css.error}>{formik.errors.tag}</span>
        ) : null}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={formik.isSubmitting}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
