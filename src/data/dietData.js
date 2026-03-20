export const dietPlans = {
    "Weight Loss": {
      Male: {
        Veg: {
          calories: 1800,
          meals: {
            Monday: { b: "🥣 Oats with Nuts", l: "🥗 Chickpea Salad", d: "🥘 Grilled Paneer & Veggies", s: "🍎 Apple" },
            Tuesday: { b: "🥞 Moong Dal Chilla", l: "🍲 Dal Tadka & Brown Rice", d: "🥗 Quinoa Stir Fry", s: "🥜 Roasted Makhana" },
            Wednesday: { b: "🥣 Poha with Veggies", l: "🌯 Whole Wheat Veg Wrap", d: "🍲 Vegetable Stew", s: "🥝 Kiwi" },
            Thursday: { b: "🥪 Corn & Spinach Sandwich", l: "🥗 Soya Chunk Salad", d: "🥘 Mixed Veg Curry", s: "🥒 Cucumber" },
            Friday: { b: "🥣 Upma", l: "🍲 Rajma Bowl (Small Rice)", d: "🥗 Tofu Stir Fry", s: "🥛 Buttermilk" },
            Saturday: { b: "🥞 Vegetable Idli", l: "🍲 Curd Rice & Salad", d: "🥘 Paneer Bhurji (No Oil)", s: "🍐 Pear" },
            Sunday: { b: "🥣 Fruit Smoothie Bowl", l: "🍲 Sprouts Salad", d: "🥘 Boiled Veggies & Hummus", s: "🍵 Green Tea" }
          }
        },
        "Non-Veg": {
          calories: 2000,
          meals: {
            Monday: { b: "🍳 3 Egg White Omelet", l: "🍗 Grilled Chicken Salad", d: "🐟 Baked Fish & Broccoli", s: "🍊 Orange" },
            Tuesday: { b: "🥣 Oats & Whey", l: "🍛 Chicken Brown Rice Bowl", d: "🍳 Boiled Eggs & Salad", s: "🥜 Almonds" },
            Wednesday: { b: "🥪 Chicken Sandwich", l: "🍲 Turkey Breast Wrap", d: "🍛 Grilled Prawns & Veg", s: "🍏 Apple" },
            Thursday: { b: "🍳 Scrambled Eggs", l: "🍗 Chicken Clear Soup", d: "🥩 Lean Steak Bites", s: "🥒 Salad" },
            Friday: { b: "🥣 Protein Smoothie", l: "🍲 Egg Curry (Light)", d: "🍗 Roasted Chicken", s: "🥛 Greek Yogurt" },
            Saturday: { b: "🥞 Whole Wheat Crepe", l: "🥗 Tuna Salad", d: "🍗 Chicken Kebabs", s: "🍓 Berries" },
            Sunday: { b: "🍳 Poached Eggs", l: "🍛 Chicken Tikka (Grilled)", d: "🍲 Seafood Soup", s: "🍵 Tea" }
          }
        }
      },
      Female: {
        Veg: { calories: 1400, meals: {/* Similiar structure with smaller portions */} },
        "Non-Veg": { calories: 1500, meals: {/* Similiar structure */} }
      }
    },
    "Muscle Gain": {
      Male: {
        "Non-Veg": {
          calories: 3200,
          meals: {
            Monday: { b: "🍳 4 Eggs + 2 Toast", l: "🍗 Double Chicken & Rice", d: "🥩 Steak & Potatoes", s: "🍌 2 Bananas + Shake" },
            // ... rest of the week
          }
        }
        // ... Veg, Female structures
      }
    }
  };