import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export const getReviewTitles = async (req, res) => {
    const {reviewsLink} = req.body;
    await puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(reviewsLink, {waitUntil: "networkidle2"});
        await page.evaluate(() => {
            window.scrollBy(0, 500);
        });
        await page.waitForSelector(".review-card .content");
        const reviewTitles = await page.$$eval(".review-card .content", (reviewTitles) => {
            return reviewTitles.map((reviewTitle) => reviewTitle.textContent);
        });
        return res.json({reviewTitles: reviewTitles});

    } catch (error) {
        return res.status(404).json({error: error});
    }
    finally {
        await browser.close();
    }
};