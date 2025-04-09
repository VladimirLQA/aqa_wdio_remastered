import { ActionButtons } from '../../data/types/common.types';
import { SalesPortalPage } from './salesPortal.page';

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

  async clickOnTableRowActionButton(searchValue: string, actionButton: ActionButtons) {
    await this.click(this['Table action button'](searchValue, actionButton));
  }

  async clickOnEditActionButton(searchValue: string) {
    await this.clickOnTableRowActionButton(searchValue, 'Edit');
  }

  async clickOnDeleteActionButton(searchValue: string) {
    await this.clickOnTableRowActionButton(searchValue, 'Delete');
  }

  async clickOnDetailsActionButton(searchValue: string) {
    await this.clickOnTableRowActionButton(searchValue, 'Details');
  }

}
