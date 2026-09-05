import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

dotenv.config();

const connectAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await User.deleteMany();
    await Recipe.deleteMany();

    const demoUser = await User.create({
      name: 'Demo Chef',
      email: 'demo@recipe.com',
      password: 'password123',
    });

    const anna = await User.create({
      name: 'Anna Sparks',
      email: 'anna@recipe.com',
      password: 'password123',
    });

    const mark = await User.create({
      name: 'Mark Rivera',
      email: 'mark@recipe.com',
      password: 'password123',
    });

    const users = [demoUser, anna, mark];

    const images = {
      pancakes: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
      avocadoToast: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
      lemonChicken: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b',
      berrySmoothie: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82',
      pasta: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
      chocolateCake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
      sweetPotato: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5',
      omelette: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
      salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      grilledSalmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    };

    const recipes = [
      {
        title: 'Fluffy Buttermilk Pancakes',
        description: 'Light, fluffy pancakes with a golden crust — the perfect weekend breakfast.',
        ingredients: [
          '2 cups all-purpose flour',
          '2 tbsp sugar',
          '2 tsp baking powder',
          '1/2 tsp baking soda',
          '1/2 tsp salt',
          '2 cups buttermilk',
          '2 large eggs',
          '3 tbsp melted butter',
        ],
        instructions: [
          'Whisk flour, sugar, baking powder, baking soda and salt in a large bowl.',
          'In a separate bowl, whisk buttermilk, eggs and melted butter.',
          'Fold wet ingredients into dry until just combined (some lumps are fine).',
          'Heat a lightly oiled griddle over medium-high heat and pour 1/4 cup batter.',
          'Cook until bubbles appear, flip and cook until golden brown.',
        ],
        category: 'Breakfast',
        cookingTime: 25,
        difficulty: 'Easy',
        image: images.pancakes,
        createdBy: anna._id,
        ratings: [
          { user: demoUser._id, value: 5 },
          { user: mark._id, value: 5 },
        ],
      },
      {
        title: 'Avocado Toast with Poached Egg',
        description: 'Creamy smashed avocado on toasted sourdough topped with a runny egg.',
        ingredients: [
          '2 slices sourdough bread',
          '1 ripe avocado',
          '2 eggs',
          '1 tbsp lemon juice',
          'Red pepper flakes',
          'Fresh chives',
        ],
        instructions: [
          'Toast the sourdough slices until golden and crisp.',
          'Mash avocado with lemon juice and season with salt and pepper.',
          'Poach the eggs in simmering water for about 3 minutes.',
          'Spread avocado on toast, top with a poached egg.',
          'Garnish with red pepper flakes and chopped chives.',
        ],
        category: 'Breakfast',
        cookingTime: 15,
        difficulty: 'Easy',
        image: images.avocadoToast,
        createdBy: anna._id,
        ratings: [{ user: demoUser._id, value: 4 }],
      },
      {
        title: 'Creamy Garlic Parmesan Pasta',
        description: 'A rich, silky pasta in a garlic parmesan cream sauce, ready in 30 minutes.',
        ingredients: [
          '400g fettuccine',
          '3 tbsp butter',
          '4 cloves garlic, minced',
          '1 cup heavy cream',
          '1 cup grated parmesan',
          '1/4 tsp black pepper',
          'Fresh parsley',
        ],
        instructions: [
          'Cook fettuccine in salted water until al dente, reserve some pasta water.',
          'Melt butter in a pan and sauté garlic until fragrant.',
          'Add cream and simmer gently for 2 minutes.',
          'Stir in parmesan until melted and smooth.',
          'Toss in pasta, loosening sauce with pasta water as needed.',
        ],
        category: 'Dinner',
        cookingTime: 30,
        difficulty: 'Medium',
        image: images.pasta,
        createdBy: mark._id,
        ratings: [
          { user: anna._id, value: 5 },
          { user: demoUser._id, value: 4 },
        ],
      },
      {
        title: 'Chocolate Lava Cake',
        description: 'Molten-centered chocolate cakes that are dangerously easy to love.',
        ingredients: [
          '1/2 cup unsalted butter',
          '200g dark chocolate',
          '2 eggs + 2 yolks',
          '1/2 cup sugar',
          '1/4 cup flour',
          'Pinch of salt',
        ],
        instructions: [
          'Preheat oven to 220°C and butter 4 ramekins.',
          'Melt butter and chocolate together until smooth.',
          'Whisk eggs, yolks and sugar until pale and thick.',
          'Fold in chocolate, then flour and salt.',
          'Bake 12 minutes until edges set but centers jiggle, serve immediately.',
        ],
        category: 'Dessert',
        cookingTime: 20,
        difficulty: 'Medium',
        image: images.chocolateCake,
        createdBy: demoUser._id,
        ratings: [{ user: anna._id, value: 5 }],
      },
      {
        title: 'Berry Power Smoothie',
        description: 'A vibrant, refreshing smoothie packed with antioxidants and protein.',
        ingredients: [
          '1 cup mixed berries',
          '1 banana',
          '1/2 cup Greek yogurt',
          '1/2 cup almond milk',
          '1 tbsp honey',
          'Ice cubes',
        ],
        instructions: [
          'Add all ingredients to a blender.',
          'Blend until smooth and creamy.',
          'Taste and adjust sweetness with honey.',
          'Pour into glasses and serve immediately.',
        ],
        category: 'Drink',
        cookingTime: 5,
        difficulty: 'Easy',
        image: images.berrySmoothie,
        createdBy: anna._id,
        ratings: [
          { user: mark._id, value: 5 },
          { user: demoUser._id, value: 4 },
        ],
      },
      {
        title: 'Roasted Sweet Potato Bowls',
        description: 'A healthy vegan bowl with crispy roasted sweet potatoes and tahini dressing.',
        ingredients: [
          '3 sweet potatoes',
          '1 can chickpeas',
          '1 tbsp olive oil',
          '2 tbsp tahini',
          '1 lemon',
          'Fresh spinach',
        ],
        instructions: [
          'Preheat oven to 200°C and cube sweet potatoes.',
          'Toss sweet potatoes and chickpeas with oil and season.',
          'Roast for 25 minutes until crispy and caramelized.',
          'Whisk tahini with lemon juice and water for the dressing.',
          'Assemble bowls over spinach and drizzle with dressing.',
        ],
        category: 'Vegan',
        cookingTime: 40,
        difficulty: 'Easy',
        image: images.sweetPotato,
        createdBy: mark._id,
        ratings: [{ user: anna._id, value: 5 }],
      },
      {
        title: 'Vegetable Frittata',
        description: 'A quick, protein-packed frittata loaded with colorful seasonal vegetables.',
        ingredients: [
          '6 eggs',
          '1 bell pepper',
          '1 zucchini',
          '1/2 onion',
          '1/2 cup shredded cheese',
          '2 tbsp olive oil',
        ],
        instructions: [
          'Preheat oven to 180°C.',
          'Sauté onion, pepper and zucchini in an oven-safe skillet until soft.',
          'Whisk eggs and pour over vegetables.',
          'Top with cheese and bake 15 minutes until set.',
        ],
        category: 'Vegetarian',
        cookingTime: 25,
        difficulty: 'Easy',
        image: images.omelette,
        createdBy: anna._id,
        ratings: [{ user: demoUser._id, value: 4 }],
      },
      {
        title: 'Fresh Garden Salad',
        description: 'A crisp nutritional power bowl with a light citrus vinaigrette.',
        ingredients: [
          'Mixed greens',
          '1 cucumber',
          'Cherry tomatoes',
          '1 avocado',
          '2 tbsp olive oil',
          '1 tbsp lemon juice',
        ],
        instructions: [
          'Wash and chop all vegetables.',
          'Combine in a large bowl.',
          'Whisk olive oil and lemon juice for dressing.',
          'Toss everything together and serve.',
        ],
        category: 'Vegetarian',
        cookingTime: 10,
        difficulty: 'Easy',
        image: images.salad,
        createdBy: demoUser._id,
        ratings: [],
      },
      {
        title: 'Herb-Grilled Salmon',
        description: 'Perfectly flaky salmon with a garlic herb butter glaze.',
        ingredients: [
          '4 salmon fillets',
          '3 tbsp butter',
          '3 cloves garlic',
          'Fresh dill & parsley',
          '1 lemon',
        ],
        instructions: [
          'Preheat grill to medium-high.',
          'Melt butter with garlic and herbs.',
          'Brush salmon with herb butter and season.',
          'Grill 4-5 minutes per side, basting with butter.',
        ],
        category: 'Dinner',
        cookingTime: 20,
        difficulty: 'Medium',
        image: images.grilledSalmon,
        createdBy: mark._id,
        ratings: [
          { user: demoUser._id, value: 5 },
          { user: anna._id, value: 5 },
        ],
      },
    ];

    await Recipe.insertMany(recipes);
    console.log('Seeded recipes:', recipes.length);
    console.log('Demo login: demo@recipe.com / password123');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

connectAndSeed();
