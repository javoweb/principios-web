import { browser, by, element, Key } from 'protractor';

export class CollectorPage {

  getTotalDeCollecionistas(): Promise<string> {
    return element(by.css('.alert.alert-secondary span')).getText() as Promise<
      string
    >;
  }

  getCollectorsTableReference(): Promise<string> {
    return element(by.css('table#collectorList')).getTagName() as Promise<string>;
  }

  ShowFirstCollectorDetails(): void {
    const list = browser
      .findElements(by.css('table#collectorList button.gridSelector'))
      .then((elements) => {
        elements[0].click();
      });
  }

  getCollectorAttribute(labelText: string): Promise<string> {
    return browser
      .findElement(by.xpath('//p[text()[contains(.,"' + labelText + '")]]'))
      .getText() as Promise<string>;
  }

  getCollectorPerformers(): Promise<string> {
    return element(by.css('#tblCollectorDetailPerformers')).getTagName() as Promise<string>;
  }

  getCollectorAlbums(): Promise<string> {
    return element(by.css('#tblCollectorDetailAlbums')).getTagName() as Promise<string>;
  }


}
