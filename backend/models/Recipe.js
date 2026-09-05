import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    value: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a short description'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    ingredients: {
      type: [String],
      required: [true, 'Please add at least one ingredient'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Please add at least one ingredient',
      },
    },
    instructions: {
      type: [String],
      required: [true, 'Please add at least one instruction step'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Please add at least one instruction step',
      },
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: {
        values: [
          'Breakfast',
          'Lunch',
          'Dinner',
          'Dessert',
          'Vegan',
          'Vegetarian',
          'Snack',
          'Drink',
        ],
        message: 'Please select a valid category',
      },
    },
    cookingTime: {
      type: Number,
      required: [true, 'Please add cooking time (minutes)'],
      min: [1, 'Cooking time must be at least 1 minute'],
    },
    difficulty: {
      type: String,
      required: [true, 'Please add a difficulty level'],
      enum: {
        values: ['Easy', 'Medium', 'Hard'],
        message: 'Please select a valid difficulty level',
      },
    },
    image: {
      type: String,
      default: '',
    },
    ratings: {
      type: [ratingSchema],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

recipeSchema.virtual('averageRating').get(function () {
  if (!this.ratings || this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, r) => acc + r.value, 0);
  return Math.round((sum / this.ratings.length) * 10) / 10;
});

recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
