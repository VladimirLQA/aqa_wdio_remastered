import { test as baseTest } from './base.fixture.ts';
import { PageFixtures, pageFixtures } from './ui/pages/page.fixture.ts';
import { ServiceFixtures, uiServicesFixtures } from './ui/uiServices/uiServices.fixture.ts';
import { ApiServicesFixtures, apiServicesFixtures } from './api/apiServices/apiServices.fixture.ts';
import { NewFixture } from '../lib/_fixture/fixture.ts';

export type MergedFixtures = PageFixtures & ServiceFixtures & ApiServicesFixtures;

export function combineFixtures(base: any, ...fixtures: NewFixture<Record<string, any>>[]) {
  return fixtures.reduce((testFn, fixtureObj) => testFn.extend(fixtureObj), base);
}

export const test = combineFixtures(baseTest, pageFixtures, uiServicesFixtures, apiServicesFixtures) as ReturnType<typeof baseTest.extend<MergedFixtures>>;
