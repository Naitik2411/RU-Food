import dotenv from 'dotenv';
dotenv.config();
import puppeteer from 'puppeteer';
import dayjs from 'dayjs';


const MONGO_URI = process.env.MONGODB_URI;

const locations = [
  'Neilson Dining Hall',
  'Busch Dining Hall',
  'Livingston Dining Hall',
  'The Atrium'
];

const mealTypes = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Knight Room',
  'Late NIght'
];

import mongoose from 'mongoose';
import DiningHall from '../models/diningModels.js';





(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    'https://menuportal23.dining.rutgers.edu/foodpronet/pickmenu.aspx?sName=Rutgers+University+Dining&locationNum=04&locationName=Busch+Dining+Hall&naFlag=1',
    { waitUntil: 'domcontentloaded', timeout: 60000 }  // Increased timeout to 60 seconds
  );

  await page.setViewport({ width: 1280, height: 800 });

  // Function to extract available dates
  const getAvailableDates = async () => {
    return await page.evaluate(() => {
      const dateOptions = [];
      document.querySelectorAll('select[name="date"] option').forEach(option => {
        dateOptions.push({ text: option.textContent.trim(), value: option.value });
      });
      return dateOptions;
    });
  };

  // Function to select a date
  const selectDate = async (dateValue) => {
    await page.select('select[name="date"]', dateValue);
  };


  // Function to select a location
  const selectLocation = async (location) => {
    try {
      await page.waitForSelector('div.col-md-3 ul li a', { timeout: 60000 });

      const locationLinks = await page.$$eval('div.col-md-3 ul li a', anchors => 
        anchors.map(anchor => ({
          href: anchor.href,
          text: anchor.textContent.trim()
        }))
      );

      const targetLink = locationLinks.find(link => link.text.includes(location));

      if (targetLink) {
        await page.goto(targetLink.href, { waitUntil: 'domcontentloaded', timeout: 60000 });
        console.log(`Navigated to ${location} at ${targetLink.href}`);
      } else {
        console.error(`Location "${location}" not found.`);
      }
    } catch (error) {
      console.error(`Error selecting location "${location}":`, error);
    }
  };

  // Function to select the meal type
  const selectMealType = async (meal) => {
    try {
        // Check if meal tabs are available
        const tabsExist = await page.$('div.tab');
        if (!tabsExist) {
            console.warn(`No meal tabs found. Skipping meal selection for "${meal}".`);
            return;
        }

        await page.waitForSelector('div.tab', { timeout: 40000 });

        const mealTabs = await page.$$('div.tab');
        for (let tab of mealTabs) {
            const text = await tab.evaluate(el => el.textContent.trim());

            // Handling possible variations in meal tab names
            if (text.includes(meal) || (meal === 'Late NIght' && text.toLowerCase().includes('late'))) {
                console.log(`Selecting meal: ${text}`);
                await tab.click();

                // Ensure the tab is actually active
                await page.waitForFunction(
                    (meal) => {
                        const activeTab = document.querySelector('div.tab.active');
                        return activeTab && activeTab.textContent.includes(meal);
                    },
                    { timeout: 60000 },
                    text
                );

                console.log(`Meal type switched to: ${text}`);
                return;
            }
        }
        console.warn(`Meal type "${meal}" not found.`);
    } catch (error) {
        console.error(`Error selecting meal type "${meal}":`, error);
    }
};

  // Function to scrape the menu
  const scrapeMenu = async () => {
    try {
        const activeTabExists = await page.$('div.tab.active');
        if (!activeTabExists) {
            console.warn(`⚠️ No active meal tab found. Skipping menu scrape.`);
            return { mealType: null, menu: [] };
        }

        const mealType = await page.$eval('div.tab.active', (el) => el.textContent.trim());

        const menu = await page.evaluate(() => {
            const subcategories = [];

            document.querySelectorAll('div.menuBox').forEach((box) => {
                let currentSubcategory = null;

                box.childNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.matches('h3')) {
                            const subcategoryName = node.textContent.trim().replace(/^-+|-+$/g, '').trim();
                            currentSubcategory = {
                                subcategoryName,
                                items: [],
                            };
                            subcategories.push(currentSubcategory);
                        } else if (node.matches('fieldset') && currentSubcategory) {
                            node.querySelectorAll('div.col-1 label').forEach((label) => {
                                const itemName = label.textContent.trim();
                                if (itemName) {
                                    currentSubcategory.items.push({ itemName });
                                }
                            });
                        }
                    }
                });
            });

            return subcategories;
        });

        return { mealType, menu };
    } catch (error) {
        console.error(`❌ Error scraping menu:`, error);
        return { mealType: null, menu: [] };
    }
};


  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Function to save to database
const saveToDatabase = async (scrapedData) => {
    try {
        await DiningHall.findOneAndUpdate(
            { location: scrapedData.location, date: scrapedData.date, mealType: scrapedData.mealType },
            scrapedData,
            { upsert: true, new: true }
        );
        console.log(`✅ Data saved for ${scrapedData.location} - ${scrapedData.mealType} on ${scrapedData.date}`);
    } catch (error) {
        console.error('❌ Error saving data:', error);
    }
};

// Inside the scraping loop:
for (let location of locations) {
    await selectLocation(location);
    const dates = await getAvailableDates();

    for (let date of dates) {
        await selectDate(date.value);
        // const formattedDate = new Date(date.text)
        const formattedDate = dayjs(date.text, 'ddd MMM D YYYY').toDate();


        for (let meal of mealTypes) {
            await selectMealType(meal);
            const scrapedData = await scrapeMenu();

            // ✅ Save to MongoDB
            await saveToDatabase({
                location,
                date: formattedDate,
                mealType: scrapedData.mealType,
                menu: scrapedData.menu
            });

            console.log(`Scraped and saved data for ${location} - ${meal} on ${date.text}`);
        }
    }
}


  console.log('Scraped data saved to database');

  await browser.close();
})();
