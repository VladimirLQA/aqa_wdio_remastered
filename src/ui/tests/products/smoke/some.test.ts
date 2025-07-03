import { test } from '../../../../fixtures';
import { TAGS } from '../../../../utils/tags';

test.describe('some', { tag: TAGS.GLOBAL_SETUP },  () => {
    test('some test', async ({ homePageService }) => {
        // await homePageService.openProductsPage();
        const t = $('.card-body').$('aria/View Orders');
        await t.click();
        await browser.pause();
    });
});
