import { TAGS } from '../../../../utils/tags';
import addNewProductPage from '../../../pages/Products/addNewProduct.page';
import homePageService from '../../../services/homePage.service';
import productsPageService from '../../../services/Products/productsPage.service';

describe(`Add product page ${TAGS.GLOBAL_SETUP}`, () => {
  before(async () => {
    await homePageService.openProductsPage();
  });

  it.only('test', async () => {
    await productsPageService.openAddNewProductPage();

    await addNewProductPage.setValue(addNewProductPage['Name input'], 'a');
    const a = await $(addNewProductPage['Name input']).getCSSProperty('border-color');
    console.log('ccss before', a);

    await $(addNewProductPage['Name input']).toHaveInputBorder({ mode: 'light', type: 'invalid' });

  });
});
