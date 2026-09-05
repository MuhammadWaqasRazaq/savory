# 🍳 Savory — Recipe Sharing Platform

A full-stack MERN application for sharing and discovering recipes. Beautiful, responsive UI built with **React + Tailwind CSS**, powered by a clean **Node.js + Express + MongoDB** REST API.

## ✨ Features

- 🏠 **Homepage** — hero banner, search, featured categories, chef's picks
- 🔍 **Browse & filter** — category, cooking time, and live search
- 📖 **Recipe detail** — ingredients, numbered steps, star rating
- ➕ **Submit recipe** — dynamic ingredient/step lists with validation
- 🔐 **Auth** — register, login, JWT-protected routes
- 👤 **Profile** — shows your submitted recipes
- ⭐ **Rate recipes** — 1–5 star community ratings

## 🛠 Tech Stack

| Layer     | Tech                                   |
|-----------|----------------------------------------|
| Frontend  | React 18, React Router, Axios, Tailwind CSS, lucide-react |
| Backend   | Node.js, Express, MongoDB/Mongoose     |
| Auth      | JWT + bcrypt (hashed passwords)        |
| Tooling   | Vite, nodemon, morgan                  |

## 📁 Project Structure

```
codeclix/
├── backend/
│   ├── config/db.js
│   ├── models/          (User, Recipe)
│   ├── controllers/     (auth, recipe)
│   ├── routes/
│   ├── middleware/      (auth, errorHandler)
│   ├── seeds/           (sample data)
│   └── server.js
└── frontend/
    └── src/
        ├── components/  (Navbar, RecipeCard, Skeletons…)
        ├── pages/       (Home, RecipeList, RecipeDetail…)
        ├── context/     (AuthContext)
        ├── services/    (centralized Axios API)
        └── utils/
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) — or update `MONGO_URI`

### 1. Backend

```bash
cd backend
npm install
npm run seed      # optional: loads sample recipes + demo user
npm run dev       # starts API on http://localhost:5000
```

The backend uses `.env` (already created with sensible defaults):
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/recipe_app
JWT_SECRET=supersecret_jwt_secret_change_me
```

> ⚠️ Change `JWT_SECRET` to your own value in production.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev       # starts app at http://localhost:5173
```

The Vite dev server proxies `/api` requests to the backend, so **no extra config needed**.



## 🔌 API Overview

| Method | Endpoint                  | Description                     | Auth |
|--------|---------------------------|---------------------------------|------|
| POST   | `/api/auth/register`      | Create account → returns JWT    | ❌    |
| POST   | `/api/auth/login`         | Log in → returns JWT            | ❌    |
| GET    | `/api/auth/me`            | Get current user                | ✅    |
| GET    | `/api/recipes`            | List (query: `category`, `time`, `search`) | ❌ |
| GET    | `/api/recipes/:id`        | Recipe detail                   | ❌    |
| GET    | `/api/recipes/mine`       | Your recipes                    | ✅    |
| POST   | `/api/recipes`            | Create recipe                   | ✅    |
| DELETE | `/api/recipes/:id`        | Delete own recipe               | ✅    |
| POST   | `/api/recipes/:id/rate`   | Rate 1–5                        | ✅    |

Send `Authorization: Bearer <token>` on protected routes.

## 🎨 Design Notes
- Warm, appetizing palette (tomato, cream, leaf green) with soft shadows and rounded cards
- Playfair Display headings + Inter body text
- Skeleton loaders, empty & error states, micro-interactions, fully responsive




demo add example

### Demo account
```
Email:    demo@recipe.com
Password: password123
```



Title: Chicken Biryani
Short description: Aromatic basmati rice layered with spiced chicken, caramelized onions, and saffron — a festive one-pot favorite.
Ingredients:
 1. 2 cups basmati rice
 2. 500g chicken, bone-in pieces
 3. 1 cup plain yogurt
 4. 2 large onions, thinly sliced
 5. 2 tomatoes, chopped
 6. 2 tbsp ginger-garlic paste
 7. 3 tbsp biryani masala
 8. 1 tsp turmeric powder
 9. 1 tsp red chili powder
10. 1/2 tsp saffron soaked in 3 tbsp warm milk
11. Fresh mint & coriander leaves
12. 3 tbsp ghee
13. Salt to taste
Instructions:
1. Wash and soak basmati rice for 30 minutes, then cook 80% done with whole spice, drain and set aside.
2. Fry the onions in ghee until golden and crispy; remove half for garnish.
3. In the same pot, brown the chicken, then add ginger-garlic paste and cook 2 minutes.
4. Add yogurt, tomatoes, masala, turmeric, chili powder and salt. Cook until chicken is tender.
5. Layer the par-cooked rice over the chicken, sprinkle saffron milk, mint and fried onions.
6. Cover with a tight lid and steam on low heat (dum) for 20 minutes.
7. Gently fluff the biryani and serve hot with raita.
Category: Dinner
Cooking time: 75 min
Difficulty: Medium
Image URL: https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8