import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Utensils, Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await login(form.email.trim(), form.password);
      toast.success('Welcome back! 🎉');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (name) =>
    errors[name] ? (
      <p className="mt-1 text-xs font-medium text-red-500">{errors[name]}</p>
    ) : null;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-tomato-400 to-tomato-600 text-white shadow-card">
          <Utensils size={26} />
        </div>
        <h1 className="mt-4 text-center font-display text-3xl font-bold text-gray-900">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-gray-500">
          Log in to continue sharing your favorite recipes.
        </p>

        <form onSubmit={handleSubmit} className="card mt-8 space-y-5 !p-6 sm:!p-8">
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className={`input !pl-10 ${errors.email ? '!border-red-400 !ring-red-400/20' : ''}`}
              />
            </div>
            {fieldError('email')}
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className={`input !pl-10 ${errors.password ? '!border-red-400 !ring-red-400/20' : ''}`}
              />
            </div>
            {fieldError('password')}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full !py-4">
            {submitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <LogIn size={18} />
            )}
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-tomato-600 transition hover:text-tomato-700">
            Sign up free
          </Link>
        </p>

        
      </div>
    </div>
  );
};

export default Login;