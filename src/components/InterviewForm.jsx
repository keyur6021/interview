import { useState } from 'react';

const validate = (fields) => {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required';
  if (!fields.email.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(fields.email)) errors.email = 'Email is invalid';
  if (!fields.phone.trim()) errors.phone = 'Phone is required';
  else if (!/^\d{10}$/.test(fields.phone)) errors.phone = 'Phone must be 10 digits';
  if (!fields.position.trim()) errors.position = 'Position is required';
  return errors;
};

const initialState = { name: '', email: '', phone: '', position: '' };

const InterviewForm = () => {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFields(initialState);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section className='section'>
        <h3>Form Submitted Successfully!</h3>
        <p>Name: {fields.name}</p>
        <p>Email: {fields.email}</p>
        <p>Phone: {fields.phone}</p>
        <p>Position: {fields.position}</p>
        <button onClick={handleReset}>Submit Another</button>
      </section>
    );
  }

  return (
    <section className='section'>
      <h2>Interview Application Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: 'Full Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone', type: 'tel' },
          { label: 'Position Applied For', name: 'position', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name} style={{ marginBottom: '1rem' }}>
            <label htmlFor={name}>{label}</label>
            <br />
            <input
              id={name}
              name={name}
              type={type}
              value={fields[name]}
              onChange={handleChange}
              style={{ borderColor: errors[name] ? 'red' : undefined }}
            />
            {errors[name] && <p style={{ color: 'red', margin: '4px 0 0' }}>{errors[name]}</p>}
          </div>
        ))}
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
};

export default InterviewForm;
