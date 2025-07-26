import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // State to manage the active section for navigation
  const [activeSection, setActiveSection] = useState('home'); // Default to 'home'
  // State to manage the visibility of the mobile menu (burger menu)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamically load Tailwind CSS and Inter font once using useEffect
  useEffect(() => {
    // Function to append a script
    const appendScript = (id, src, onloadCallback) => {
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.onload = onloadCallback;
        document.head.appendChild(script);
        console.log(`Attempting to load script: ${src}`);
      }
    };

    // Function to append a link (for CSS/fonts)
    const appendLink = (id, href, rel) => {
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.href = href;
        link.rel = rel;
        document.head.appendChild(link);
        console.log(`Attempting to load link: ${href}`);
      }
    };

    // Load Tailwind CSS
    appendScript(
      'tailwind-cdn-script',
      'https://cdn.tailwindcss.com',
      () => {
        console.log('Tailwind CSS loaded successfully.');
      }
    );

    // Load Inter font
    appendLink(
      'inter-font-link',
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      'stylesheet'
    );

    // Inline styles for body and active tab
    const styleId = 'app-custom-styles';
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.innerHTML = `
        body {
          font-family: 'Inter', sans-serif;
        }
        /* Subtle radial gradient for a soft, floral-like background effect */
        .app-background {
          background: radial-gradient(circle at top left, #FCE7F3, #FBCFE8, #FEE2E2); /* Soft pinks, light red */
        }
        .active-tab {
          background-color: #DB2777; /* Deeper Rose 600 */
          color: white;
          box-shadow: 0 4px 10px rgba(219, 39, 119, 0.3);
        }
        .tab-button {
          transition: all 0.3s ease;
        }
        .tab-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(219, 39, 119, 0.1);
        }
        /* Custom classes for consistent theming */
        .header-bg {
          background-color: #EC4899; /* Pink 500 */
        }
        .text-primary-pink {
          color: #DB2777; /* Rose 600 */
        }
        .text-secondary-pink {
          color: #F472B6; /* Pink 400 */
        }
        .table-header-bg {
          background-color: #DB2777; /* Rose 600 */
        }
        .table-row-even {
          background-color: #FDECF5; /* Pink 50 */
        }
        .table-row-odd {
          background-color: white;
        }
        .footer-bg {
          background-color: #BE185D; /* Rose 700 */
        }
      `;
      document.head.appendChild(styleTag);
      console.log('Custom styles appended.');
    }

    // Cleanup function to remove elements if the component unmounts (good practice)
    return () => {
      const tailwindScript = document.getElementById('tailwind-cdn-script');
      const interLink = document.getElementById('inter-font-link');
      const styleTag = document.getElementById('app-custom-styles');

      if (tailwindScript && document.head.contains(tailwindScript)) {
        document.head.removeChild(tailwindScript);
        console.log('Tailwind script removed during cleanup.');
      }
      if (interLink && document.head.contains(interLink)) {
        document.head.removeChild(interLink);
        console.log('Inter font link removed during cleanup.');
      }
      if (styleTag && document.head.contains(styleTag)) {
        document.head.removeChild(styleTag);
        console.log('Custom styles removed during cleanup.');
      }
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  // Data extracted and structured from the provided document
  // Combined content for the new 'home' section
  const summaryContent = `
    <p><strong>Focus:</strong> Sustainable weight loss through an optimized, localized, and preference-aligned dietary approach.</p>
    <p><strong>Core Principle:</strong> Achieve caloric deficit by consuming fewer calories than expended, prioritizing nutrient-dense, quality foods.</p>
    <p><strong>Blood Type A Diet:</strong> Lacks scientific evidence, but its plant-based emphasis aligns with personal preferences (no beef/dairy).</p>
    <p><strong>Ethiopian Cuisine:</strong> Offers an excellent foundation for a high-protein, high-fiber diet using local staples (teff, lentils, chickpeas, vegetables).</p>
    <p><strong>Report Scope:</strong> Provides practical alternatives, a sample meal plan, grocery strategies, and emphasizes holistic lifestyle factors (hydration, sleep, physical activity).</p>
  `;

  const mealPlanIntroContent = `
    <p>The fundamental strategy remains the creation of a caloric deficit by carefully balancing energy intake with expenditure. Prioritizing protein and fiber at each meal is crucial, as these macronutrients are essential for promoting satiety, stabilizing blood sugar levels, and preserving muscle mass during weight loss.</p>
  `;

  const mealPlanTableData = [
    { day: 'Monday', breakfast: 'Yinjera Firfir (vegan version with shiro or misir wot)', lunch: 'Shiro Wat with Injera (controlled portion)', dinner: 'Misir Wat with Injera (controlled portion)', snacks: 'Banana, Handful of Peanuts' },
    { day: 'Tuesday', breakfast: 'Ful (spicy fava bean dish) with a small portion of whole-grain bread', lunch: 'Warm Spiced Eggplant Salad or Atkilt Beyaynetu with Injera', dinner: 'Inguday Tibs (Spicy Ethiopian Mushrooms) with Ethiopian Wild Rice Pilaf', snacks: 'Orange, Toasted Chickpeas (golo)' },
    { day: 'Wednesday', breakfast: 'Teff Pancakes (made from teff flour) topped with fresh local fruits like pawpaw or lemon', lunch: 'Misir Wat with Brown Rice', dinner: 'Shiro Wat with Injera (controlled portion)', snacks: 'Avocado, Small handful of Pumpkin Seeds' },
    { day: 'Thursday', breakfast: 'Avocado Toast on whole-grain bread', lunch: 'Chickpea Salad with local vegetables and olive oil/lemon dressing', dinner: 'Gomen Wat (collard greens) with a small portion of Injera', snacks: 'Guava, Toasted Lentils (golo)' },
    { day: 'Friday', breakfast: 'Ful (spicy fava bean dish) with a small portion of whole-grain bread', lunch: 'Tikil Gomen (cabbage, potatoes, carrots) with Injera', dinner: 'Red Lentils with Veggies (carrots, zucchini, berbere) served with brown rice', snacks: 'Papaya, Small handful of Sunflower Seeds' },
    { day: 'Saturday', breakfast: 'Teff Pancakes topped with fresh local fruits like banana or a squeeze of lemon', lunch: 'Shiro Wat with Injera (controlled portion)', dinner: 'Atkilt Beyaynetu (mix of Tikil Gomen, Gomen Wat, Key Sir Alicha) with Injera', snacks: 'Lemon (as a refreshing drink or in water), Moringa smoothie' },
    { day: 'Sunday', breakfast: 'Yinjera Firfir (vegan version with shiro or misir wot)', lunch: 'Misir Wat with Injera (controlled portion)', dinner: 'Inguday Tibs (Spicy Ethiopian Mushrooms) with Ethiopian Wild Rice Pilaf', snacks: 'Fresh fruit juice (jus/espris) or bowl of mixed fruits' },
  ];

  const groceryStrategyContent = `
    <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-800">Strategies for Smart Grocery Shopping in Ethiopia:</h3>
    <ul>
      <li><strong>Prioritize Local Markets:</strong> For affordability and freshness, focus on purchasing fresh, seasonal fruits (including avocado and oranges), vegetables (including mushrooms), and legumes from local Ethiopian markets.</li>
      <li><strong>Bulk Buy Staples:</strong> Purchase teff, lentils, chickpeas, and other grains/legumes in bulk.</li>
      <li><strong>Cost-Effective Protein:</strong> Rely heavily on locally abundant legumes (lentils, chickpeas, broad beans) as primary protein sources.</li>
      <li><strong>Mindful Plant-Based Milk Purchases:</strong> If opting for commercial plant-based milks, compare prices across different retailers. Exploring homemade plant milk options could also offer long-term savings.</li>
      <li><strong>Embrace Traditional Spices:</strong> Berbere, turmeric, cumin, coriander, garlic, and ginger are fundamental to Ethiopian flavors.</li>
    </ul>
  `;

  const sections = {
    home: {
      title: 'Home',
      content: `
        <h3 class="text-2xl font-bold text-primary-pink mb-4">Introduction</h3>
        ${summaryContent}
        <h3 class="text-2xl font-bold text-primary-pink mt-8 mb-4">Crafting Your Personalized Ethiopian Weight Loss Meal Plan</h3>
        ${mealPlanIntroContent}
        <h3 class="text-2xl font-bold text-primary-pink mb-6">Weekly Meal Plan (Repeat for 2 Months)</h3>
        <!-- The table will be rendered separately below -->
        ${groceryStrategyContent}
      `,
      table: mealPlanTableData, // Keep table data here for rendering in the 'home' section
    },
    science: {
      title: 'Understanding the Science of Weight Loss',
      content: `
        <p><strong>Caloric Deficit is Key:</strong> Sustainable weight loss fundamentally requires consuming fewer calories than expended.</p>
        <p><strong>Macronutrient Role:</strong> While total calories are paramount, balancing protein, carbohydrates, and fats aids adherence.</p>
        <ul>
          <li><strong>Protein:</strong> Crucial for satiety, increased metabolism, and preserving muscle mass during weight loss (1.2–2g/kg body weight often beneficial).</li>
          <li><strong>General Guidelines:</strong> Aim for 45–65% carbs, 20–35% fats, and 10–35% protein.</li>
        </ul>
        <p><strong>Food Quality Matters:</strong> Prioritize nutrient-dense, whole foods (e.g., fruits, vegetables, high-fiber starchy foods) over "empty calories" to manage hunger and support overall health.</p>
      `,
    },
    dietaryApproach: {
      title: 'Dietary Approach: Blood Type Diet & Ethiopian Cuisine',
      content: `
        <h3 class="text-xl font-semibold mb-2 text-gray-800">The Blood Type Diet (A+): Separating Fact from Fiction</h3>
        <p><strong>Diet Premise:</strong> Proposes that diet should be based on blood type, with Type A recommended a primarily vegetarian, plant-based diet due to its supposed emergence with agriculture.</p>
        <p><strong>Scientific Consensus:</strong> Overwhelmingly lacks scientific evidence; studies show no correlation between blood type and health outcomes.</p>
        <p><strong>Application:</strong> The individual's A+ blood type will not be a primary dietary determinant; however, the diet's plant-based emphasis aligns with personal preferences (no beef/dairy) and will be leveraged for an evidence-based plan.</p>

        <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-800">Embracing Ethiopian Cuisine for Weight Loss: A Localized Approach</h3>
        <p><strong>Natural Fit:</strong> Ethiopian cuisine is inherently plant-based, high in protein and fiber, making it ideal for weight loss and aligning with preferences (no beef/dairy).</p>
        <p><strong>Key Staples:</strong> Teff, chickpeas, lentils, field peas, broad beans, onions, kale, pumpkins, green chickpeas, potatoes, sweet potatoes, mushrooms, lemons, bananas, pawpaw, oranges, avocado, guava, and mango.</p>
        <p><strong>Vegan-Friendly Dishes:</strong> Many traditional dishes are naturally vegan or easily adaptable, such as Injera, Shiro Wat, Misir Wat, Atkilt Beyaynetu, Tikil Gomen, Gomen Wat, and Ful.</p>

        <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-800">Navigating Your Dietary Preferences: Delicious Alternatives for Beef and Dairy</h3>
        <p><strong>Addressing Preferences:</strong> Leverage Ethiopia's plant-based traditions and commercial alternatives to replace beef and dairy.</p>
        <p><strong>Plant-Based Protein (Beef Alternatives):</strong> Lentils, chickpeas, field peas, broad beans, teff, tofu, soy chunks, nuts, seeds (peanuts, pumpkin, sunflower), and moringa leaves.</p>
        <p><strong>Dairy-Free Options:</strong> Commercial plant milks (almond, soy, oat, coconut, rice, cashew) available in major urban centers. Homemade options are also viable.</p>
      `,
    },
    lifestyle: {
      title: 'Beyond the Plate: Lifestyle Factors for Sustainable Weight Loss',
      subsections: [
        {
          heading: 'Importance of Hydration',
          content: `
            <p>Adequate water intake is crucial for overall metabolic function. Water plays a vital role in nutrient transport, waste elimination, and maintaining proper bodily temperatures. Beyond these physiological functions, consuming sufficient water can help promote feelings of fullness, potentially reducing overall food intake. It also supports various bodily processes essential for efficient weight management.</p>
          `,
        },
        {
          heading: 'Sleep Quality',
          content: `
            <p>Sufficient and restful sleep profoundly impacts hormone regulation, particularly ghrelin (an appetite-stimulating hormone) and leptin (a satiety-signaling hormone). Poor sleep can disrupt the delicate balance of these hormones, leading to increased hunger, heightened cravings for energy-dense foods, and impaired fat metabolism. Prioritizing consistent, high-quality sleep is therefore a critical, often overlooked, component of a successful weight management strategy.</p>
          `,
        },
        {
          heading: 'Physical Activity: The Foundation',
          content: `
            <p>Regular physical activity is a vital complement to dietary changes. It directly increases caloric expenditure, contributing to the necessary energy deficit for weight loss. Furthermore, physical activity helps build and maintain lean muscle mass, which in turn boosts the basal metabolic rate—the number of calories the body burns at rest. Even light exercise, such as walking, yoga, or Tai-chi, offers significant benefits for overall well-being and weight management. Integrating physical activity into a daily routine enhances the body's capacity to burn calories and supports metabolic health.</p>
          `,
        },
        {
          heading: 'Integrated Physical Activity Plan for Weight Loss',
          content: `
            <p>To complement your dietary efforts and accelerate weight loss, incorporating regular physical activity is key. The goal is to increase calorie expenditure and support overall metabolic health without focusing on significant muscle bulk. For weight loss, the more intense or longer your activity, the more calories you burn.</p>
            <p><strong>Frequency:</strong> Aim for two dedicated exercise sessions per week. Spreading these out, for example, on Tuesday and Friday, can allow for adequate recovery and fit well with your meal plan.</p>
            <p><strong>Session Structure (45-60 minutes per session):</strong></p>
            <ol class="list-decimal list-inside ml-4">
              <li><strong>Warm-up (5-10 minutes):</strong> Light cardio like brisk walking or marching in place, followed by dynamic stretches (arm circles, leg swings).</li>
              <li><strong>Aerobic Activity (30-40 minutes):</strong> Brisk Walking or Light Jogging, Cycling.</li>
              <li><strong>Strength Training (10-15 minutes):</strong> Focus on bodyweight exercises (Squats, Lunges, Planks, Push-ups). Perform 2-3 sets of 10-15 repetitions for each exercise.</li>
              <li><strong>Cool-down (5 minutes):</strong> Gentle stretching, holding each stretch for 20-30 seconds.</li>
            </ol>
            <p><strong>Post-Exercise Nutrition for Weight Loss:</strong> After your workouts, it's important to refuel your body to aid recovery and replenish energy stores, focusing on lean protein and high-fiber carbohydrates. This helps prevent muscle breakdown and supports your weight loss goals, rather than promoting muscle gain.</p>
            <p><strong>Examples:</strong> A banana with a small handful of peanuts or pumpkin seeds; a small portion of toasted chickpeas (golo); a small serving of Shiro Wat or Misir Wat if prepared and easily accessible as a snack.</p>
          `,
        },
        {
          heading: 'Mindful Eating Practices',
          content: `
            <p>Cultivating mindful eating involves paying close attention to hunger and fullness cues, eating slowly, savoring meals, and minimizing distractions during mealtimes. This practice encourages a deeper connection with food and the body's signals, which can help prevent overeating by allowing the brain sufficient time to register satiety. Mindful eating also improves digestion and fosters a healthier, more intuitive relationship with food, moving away from restrictive mindsets towards sustainable habits.</p>
          `,
        },
      ],
    },
  };

  // Component to render a collapsible section
  const CollapsibleSection = ({ heading, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border border-rose-200 rounded-lg mb-4 bg-white shadow-sm">
        <button
          className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h4 className="text-lg font-semibold text-primary-pink">{heading}</h4>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isOpen && (
          <div
            className="p-4 border-t border-rose-200 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen app-background font-sans text-gray-900">
      {/* Header */}
      <header className="header-bg shadow-lg py-4 px-6 md:px-12 sticky top-0 z-50 rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Jazzy's Weight Loss Plan
          </h1>

          {/* Burger Menu Icon for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex flex-wrap justify-end gap-2 md:gap-4">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`tab-button px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition duration-300 ease-in-out
                  ${activeSection === key ? 'active-tab' : 'text-rose-700 bg-rose-100 hover:bg-rose-200'}`}
              >
                {sections[key].title.split(':')[0]} {/* Shorten tab titles */}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden flex flex-col items-center mt-4 space-y-2">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSection(key);
                  setIsMobileMenuOpen(false); // Close menu on selection
                }}
                className={`tab-button w-full px-4 py-2 rounded-full text-base font-medium focus:outline-none transition duration-300 ease-in-out
                  ${activeSection === key ? 'active-tab' : 'text-rose-700 bg-rose-100 hover:bg-rose-200'}`}
              >
                {sections[key].title.split(':')[0]}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto p-6 md:p-12">
        <section className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-4xl font-extrabold text-center text-primary-pink mb-8">
            {sections[activeSection].title}
          </h2>

          {/* Render content based on active section */}
          {activeSection === 'home' && (
            <>
              <div
                className="text-lg text-gray-700 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: sections.home.content }}
              ></div>
              <div className="overflow-x-auto rounded-lg shadow-md mt-6">
                <table className="min-w-full bg-white border border-rose-200">
                  <thead className="table-header-bg text-white">
                    <tr>
                      {['Day', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((header) => (
                        <th key={header} className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-200">
                    {sections.home.table.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                        <td className="py-3 px-4 text-sm font-medium text-gray-800">{row.day}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{row.breakfast}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{row.lunch}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{row.dinner}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{row.snacks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeSection === 'science' && (
            <div
              className="text-lg text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sections.science.content }}
            ></div>
          )}

          {activeSection === 'dietaryApproach' && (
            <div
              className="text-lg text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sections.dietaryApproach.content }}
            ></div>
          )}

          {activeSection === 'lifestyle' && (
            <div className="space-y-6">
              {sections.lifestyle.subsections.map((sub, index) => (
                <CollapsibleSection
                  key={index}
                  heading={sub.heading}
                  content={sub.content}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-bg text-white py-6 px-6 md:px-12 mt-12 rounded-t-xl">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Jazzy's Weight Loss Plan. All rights reserved.</p>
          <p className="mt-2">Designed to help you achieve your health goals sustainably.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
