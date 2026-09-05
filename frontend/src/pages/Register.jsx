import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Utensils, Mail, Lock, UserPlus, User as UserIcon, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Field = ({ name, label, type = 'text', icon: Icon, placeholder, value, error, onChange }) => (
  <div>
    <label className="label">{label}</label>
    <div className="relative">
      <Icon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`input !pl-10 ${error ? '!border-red-400 !ring-red-400/20' : ''}`}
      />
    </div>
    {error ? <p className="mt-1 text-xs font-medium text-red-500">{error}</p> : null}
  </div>
);

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.confirmPassword !== form.password) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      toast.success('Account created! Welcome to Savory 🍳');
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-leaf-500 to-leaf-700 text-white shadow-lg">
          <Utensils size={26} />
        </div>
        <h1 className="mt-4 text-center font-display text-3xl font-bold text-gray-900">
          Join the community
        </h1>
        <p className="mt-2 text-center text-gray-500">
          Create a free account and start sharing your recipes.
        </p>

        <form onSubmit={handleSubmit} className="card mt-8 space-y-5 !p-6 sm:!p-8">
          <Field name="name" label="Name" icon={UserIcon} placeholder="Your name" value={form.name} error={errors.name} onChange={setField} />
          <Field name="email" label="Email" type="email" icon={Mail} placeholder="you@example.com" value={form.email} error={errors.email} onChange={setField} />
          <Field name="password" label="Password" type="password" icon={Lock} placeholder="Minimum 6 characters" value={form.password} error={errors.password} onChange={setField} />
          <Field name="confirmPassword" label="Confirm password" type="password" icon={Lock} placeholder="Repeat your password" value={form.confirmPassword} error={errors.confirmPassword} onChange={setField} />

          <button type="submit" disabled={submitting} className="btn-primary w-full !py-4">
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <UserPlus size={18} />
            )}
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-tomato-600 transition hover:text-tomato-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;