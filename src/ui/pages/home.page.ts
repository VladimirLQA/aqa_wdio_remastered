import { MenuItemNames } from '../../data/types/home.types.ts';
import { SalesPortalPage } from './salesPortal.page.ts';

class HomePage extends SalesPortalPage {
  readonly ['Menu Button'] = (menuItemName: MenuItemNames) => `[name="${menuItemName}"]`;
  readonly ['Welcome label'] = '.welcome-text';
  protected readonly uniqueElement: string = this['Welcome label'];

  async clickOnMenuButton(menuItemName: MenuItemNames) {
    await this.click(this['Menu Button'](menuItemName));
  }
}

export default new HomePage();
