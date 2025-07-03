import {  ModuleName } from '../../data/types/home.types.ts';
import { toLowerCase } from '../../utils/helpers.ts';
import { SalesPortalPage } from './salesPortal.page.ts';

class HomePage extends SalesPortalPage {
  readonly ['Menu Button'] = (moduleName: ModuleName) => `#${toLowerCase(moduleName)}-from-home`;
  readonly ['Welcome label'] = '.welcome-text';
  protected readonly uniqueElement: string = this['Welcome label'];

  async clickOnMenuButton(moduleName: ModuleName) {
    await this.click(this['Menu Button'](moduleName));
  }
}

export default new HomePage();
