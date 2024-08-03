import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs/promises";

async function getReviews(reviewsLink) {
    await puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(reviewsLink, { waitUntil: 'networkidle2' });
        await page.evaluate(() => {
            window.scrollBy(0, 500);
        });
        await page.waitForSelector('.review-card .content', { timeout: 10000 });
        const reviewTitles = await page.$$eval('.review-card .content', (reviewTitles) => {
            return reviewTitles.map((reviewTitle) => reviewTitle.textContent.trim());
        });
        await fs.writeFile("reviews.txt", reviewTitles.join("\r\n"));

    } catch (error) {
        console.error('Error while fetching reviews:', error);
    } finally {
        await browser.close();
    }
}

getReviews("https://anilist.co/anime/154587/Sousou-no-Frieren/reviews");