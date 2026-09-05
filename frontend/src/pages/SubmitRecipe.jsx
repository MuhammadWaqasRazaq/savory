import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  ChefHat,
  Clock,
  Sparkles,
} from 'lucide-react';
import { recipeService } from '../services/api.js';
import { CATEGORY_NAMES, DIFFICULTIES } from '../constants.js';

const initialForm = {
  title: '',
  description: '',
  category: '',
  cookingTime: '',
  difficulty: '',
  image: '',
  ingredients: [''],
  instructions: [''],
};

const validate = (form) => {
  const errors = {};
  if (!form.title.trim()) errors.title = 'Please provide a title';
  else if (form.title.trim().length < 3) errors.title = 'Title must be at least 3 characters';

  if (!form.description.trim()) errors.description = 'Please provide a short description';
  else if (form.description.trim().length < 10) errors.description = 'Description must be at least 10 characters';

  if (!form.category) errors.category = 'Please choose a category';
  if (!form.difficulty) errors.difficulty = 'Please choose a difficulty level';

  const time = Number(form.cookingTime);
  if (!form.cookingTime || !Number.isFinite(time) || time < 1) {
    errors.cookingTime = 'Enter a valid cooking time (minutes)';
  }

  const ingredients = form.ingredients.map((i) => i.trim()).filter(Boolean);
  if (ingredients.length === 0) errors.ingredients = 'Add at least one ingredient';

  const instructions = form.instructions.map((i) => i.trim()).filter(Boolean);
  if (instructions.length === 0) errors.instructions = 'Add at least one instruction step';

  return errors;
};

const SubmitRecipe = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const setListField = (field, index, value) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addItem = (field) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the highlighted fields');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        cookingTime: Number(form.cookingTime),
        difficulty: form.difficulty,
        image: form.image.trim(),
        ingredients: form.ingredients.map((i) => i.trim()).filter(Boolean),
        instructions: form.instructions.map((i) => i.trim()).filter(Boolean),
      };
      const created = await recipeService.createRecipe(payload);
      toast.success('Recipe published! 🎉');
      navigate(`/recipes/${created._id}`);
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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-tomato-400 to-tomato-600 text-white shadow-card">
          <ChefHat size={26} />
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
          Share your <span className="text-tomato-500">recipe</span>
        </h1>
        <p className="mt-2 text-gray-500">
          Fill in the details below — it only takes a couple of minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card mt-8 space-y-6 !p-6 sm:!p-8">
        {/* TITLE */}
        <div>
          <label className="label">Recipe title</label>
          <input
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            placeholder="e.g. Grandma's Classic Lasagna"
            className={`input ${errors.title ? '!border-red-400 !ring-red-400/20' : ''}`}
          />
          {fieldError('title')}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="label">Short description</label>
          <textarea
            value={form.description}
            onChange={(e) => setField('description', e.target.value)}
            rows={3}
            placeholder="What makes this recipe special?"
            className={`input resize-none ${errors.description ? '!border-red-400 !ring-red-400/20' : ''}`}
          />
          {fieldError('description')}
        </div>

        {/* CATEGORY / DIFFICULTY / TIME */}
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="label">Category</label>
            <select
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
              className={`input cursor-pointer ${errors.category ? '!border-red-400 !ring-red-400/20' : ''}`}
            >
              <option value="">Select…</option>
              {CATEGORY_NAMES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {fieldError('category')}
          </div>
          <div>
            <label className="label">Difficulty</label>
            <select
              value={form.difficulty}
              onChange={(e) => setField('difficulty', e.target.value)}
              className={`input cursor-pointer ${errors.difficulty ? '!border-red-400 !ring-red-400/20' : ''}`}
            >
              <option value="">Select…</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {fieldError('difficulty')}
          </div>
          <div>
            <label className="label">
              <span className="inline-flex items-center gap-1">
                <Clock size={13} /> Cooking time (min)
              </span>
            </label>
            <input
              type="number"
              min="1"
              value={form.cookingTime}
              onChange={(e) => setField('cookingTime', e.target.value)}
              placeholder="e.g. 30"
              className={`input ${errors.cookingTime ? '!border-red-400 !ring-red-400/20' : ''}`}
            />
            {fieldError('cookingTime')}
          </div>
        </div>

        {/* IMAGE */}
        <div>
          <label className="label">
            <span className="inline-flex items-center gap-1">
              <ImageIcon size={13} /> Image URL <span className="font-normal text-gray-400">(optional)</span>
            </span>
          </label>
          <input
            value={form.image}
            onChange={(e) => setField('image', e.target.value)}
            placeholder="https://…"
            className="input"
          />
        </div>

        {/* INGREDIENTS */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="label !mb-0">Ingredients</label>
            <button
              type="button"
              onClick={() => addItem('ingredients')}
              className="inline-flex items-center gap-1 rounded-full bg-leaf-500/10 px-3 py-1.5 text-xs font-semibold text-leaf-600 transition hover:bg-leaf-500/20"
            >
              <Plus size={14} /> Add ingredient
            </button>
          </div>
          <div className="space-y-2.5">
            {form.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500">
                  {i + 1}
                </span>
                <input
                  value={ing}
                  onChange={(e) => setListField('ingredients', i, e.target.value)}
                  placeholder={`Ingredient ${i + 1}`}
                  className="input"
                />
                <button
                  type="button"
                  onClick={() => removeItem('ingredients', i)}
                  disabled={form.ingredients.length === 1}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-30"
                  aria-label="Remove ingredient"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
          {fieldError('ingredients')}
        </div>

        {/* INSTRUCTIONS */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="label !mb-0">Instructions</label>
            <button
              type="button"
              onClick={() => addItem('instructions')}
              className="inline-flex items-center gap-1 rounded-full bg-tomato-500/10 px-3 py-1.5 text-xs font-semibold text-tomato-600 transition hover:bg-tomato-500/20"
            >
              <Plus size={14} /> Add step
            </button>
          </div>
          <div className="space-y-2.5">
            {form.instructions.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-tomato-400 to-tomato-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <textarea
                  value={step}
                  onChange={(e) => setListField('instructions', i, e.target.value)}
                  rows={2}
                  placeholder={`Step ${i + 1}`}
                  className="input resize-none"
                />
                <button
                  type="button"
                  onClick={() => removeItem('instructions', i)}
                  disabled={form.instructions.length === 1}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-30"
                  aria-label="Remove step"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
          {fieldError('instructions')}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full !py-4 text-base"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Publishing…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles size={18} /> Publish Recipe
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default SubmitRecipe;