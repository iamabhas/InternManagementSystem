import puppeteer from "puppeteer";
import {IDefaultOptions} from "../../@types/interface/requestBody";

const defaultOptions: IDefaultOptions | any = {
    format: "A4",
    printBackground: true,
};

class PDF {
    public static async htmlToPdf(html: any, options = defaultOptions) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setViewport({width: 1280, height: 800});

        await page.setContent(html, {
            waitUntil: "domcontentloaded",
        });
        const pdfBuffer = await page.pdf(options);
        return pdfBuffer;
    }
}

export default PDF;
