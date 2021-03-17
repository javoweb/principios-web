import { browser, by, element, Key } from 'protractor';

export class PerformerPage {
  getMenuItem(ref: string): Promise<string> {
    return element(
      by.css('a[ng-reflect-router-link="' + ref + '"]')
    ).getAttribute('class') as Promise<string>;
  }

  getTotalPerformers(): Promise<string> {
    return element(by.css('.alert.alert-secondary span')).getText() as Promise<
      string
    >;
  }

  getPerformersTableReference(): Promise<string> {
    return element(by.css('table#performerList')).getTagName() as Promise<string>;
  }

  ShowFirstBandDetails(): void {
    browser
      .findElements(by.css('table#performerList button.gridSelector'))
      .then((elements) => {
        elements[0].click();
      });
  }

  getBandDetailsImg(): Promise<string> {
    return element(
      by.css('#bandDetails img[alt^="Imagen de la Banda"]')
    ).getTagName() as Promise<string>;
  }

  getPerformerAttribute(labelText: string): Promise<string> {
    return browser
      .findElement(by.xpath('//p[text()[contains(.,"' + labelText + '")]]'))
      .getText() as Promise<string>;
  }

  getPerformerPrizes(): Promise<string> {
    return element(
      by.css('#bandDetails table[aria-label="Detalle de premios recibidos"]')
    ).getTagName() as Promise<string>;
  }

  goAndClickButton(buttonText: string): void {
    element(by.xpath('//p[text()[contains(.,"' + buttonText + '")]]')).click();
  }

  buttonIsDisabled(buttonName: string): Promise<string> {
    return element(
      by.xpath('//button[text()[contains(.,"' + buttonName + '")]]')
    ).getAttribute('disabled') as Promise<string>;
  }

  getAlertFor(
    containerRef: string,
    fieldName: string,
    fieldType: string
  ): Promise<string> {
    element(
      by.css('' + containerRef + ' *[' + fieldType + '="' + fieldName + '"]')
    ).sendKeys(Key.LEFT);
    browser.sleep(500);

    element(
      by.css('' + containerRef + ' *[' + fieldType + '="' + fieldName + '"]')
    ).click();
    browser.sleep(500);

    element(
      by.css('' + containerRef + ' *[' + fieldType + '="' + fieldName + '"]')
    ).sendKeys(Key.TAB);
    browser.sleep(500);
    element(
      by.css('' + containerRef + ' *[' + fieldType + '="' + fieldName + '"]')
    ).sendKeys(Key.TAB);
    browser.sleep(500);

    browser.sleep(500);
    return element(
      by.xpath(
        '//*[@' +
        fieldType +
        '="' +
        fieldName +
        '"]/../*[contains(@class, "alert")] '
      )
    ).getText() as Promise<string>;
  }

  populatePrizeFields(prizeName: string, prizeOrganization: string, prizeDescription: string): void {
    element(by.css('#crearPremio input[name="name"]')).sendKeys(prizeName);

    element(by.css('#crearPremio input[name="organization"]')).sendKeys(
      prizeOrganization
    );
    element(by.css('#crearPremio textarea[name="description"]')).sendKeys(
      prizeDescription
    );
  }

  saveItem(buttonName): void {
    element(by.xpath('//button[text()[contains(.,"' + buttonName + '")]]')).click();
    browser.sleep(1000);
  }

  confirmSavedTrack(trackName: any): Promise<string> {
    return element(
      by.xpath('//td[text()[contains(.,"' + trackName + '")]]')
    ).getText() as Promise<string>;
  }

  populatePrizeAssignFields(date: string): void {
    element(by.css('#prizeAssign *[name="date"]')).sendKeys(
      date
    );
    element(by.css('#prizeAssign *[name="prizeId"]')).sendKeys(
      Key.DOWN
    );
  }

  confirmSavedComment(comment: any): Promise<string> {
    return element(
      by.xpath('//li[text()[contains(.,"' + comment + '")]]')
    ).getText() as Promise<string>;
  }
}
