import { TAGS } from '../../../../utils/tags';

import AllureReporter from '@wdio/allure-reporter';
import { NOFITICATIONS } from '../../../../data/notifications';
import homePageService from '../../../services/homePage.service';
import productsPageService from '../../../services/products/productsPage.service';
import signInPageService from '../../../services/signInPage.service';
import { SignInApiService } from '../../../../api/service/signInApiService.service';
import productApiService from '../../../../api/service/productApi.service';
describe(`[UI] [Products] Smoke ${TAGS.GLOBAL_SETUP}`, async () => {});
