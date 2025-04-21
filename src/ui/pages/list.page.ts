import { ActionButtons } from '../../data/types/common.types.ts';
import { logAction } from '../../utils/reporter/decorators.ts';
import { SalesPortalPage } from './salesPortal.page.ts';

export abstract class ListPage extends SalesPortalPage {
  readonly ['Chip buttons'] = '#chip-buttons .chip';

  readonly ['Chip close button'] = '#chip-buttons .closebtn';

  readonly ['Table page'] = (pageName: string) => `#table-${pageName}`;

  readonly ['Chip label'] = (pageName: string, chipName: string) =>
    `.chip[data-chip-${pageName}='${chipName}']`;

  readonly ['Filter button'] = '#filter';

  readonly ['Search input'] = "[type='search']";

  readonly ['Search button'] = (pageName: string) => `#search-${pageName}`;

  readonly ['Table row'] = (searchValue: string) => `//tr[./td[.="${searchValue}"]]`;

  readonly ['Table action button'] = (searchValue: string, actionButton: string) =>
    `${this['Table row'](searchValue)}/td/button[@title='${actionButton}']`;

  @logAction()
  async clickOnTableRowActionButton(searchValue: string, actionButton: ActionButtons) {
    await this.click(this['Table action button'](searchValue, actionButton));
  }

  @logAction()
  async clickOnEditActionButton(searchValue: string) {
    await this.clickOnTableRowActionButton(searchValue, 'Edit');
  }

  @logAction()
  async clickOnDeleteActionButton(searchValue: string) {
    await this.clickOnTableRowActionButton(searchValue, 'Delete');
  }

  @logAction()
  async clickOnDetailsActionButton(searchValue: string) {
    await this.clickOnTableRowActionButton(searchValue, 'Details');
  }
}
