import { listenerCount } from 'events';
import { browser, by, element, WebElement, Key } from 'protractor';

export class AppPage {
  populateComments(comment: string, rating: number): void {
    element(by.css('#albumDetails *[ng-reflect-name="rating"]')).sendKeys(
      rating
    );
    element(by.css('#albumDetails *[ng-reflect-name="description"]')).sendKeys(
      comment
    );
    element(by.css('#albumDetails *[ng-reflect-name="collectorId"]')).sendKeys(
      Key.DOWN
    );
  }

  confirmSavedComment(comment: any): Promise<string> {
    return element(
      by.xpath('//li[text()[contains(.,"' + comment + '")]]')
    ).getText() as Promise<string>;
  }

  confirmSavedTrack(trackName: any): Promise<string> {
    return element(
      by.xpath('//td[text()[contains(.,"' + trackName + '")]]')
    ).getText() as Promise<string>;
  }

  getSavingMessage(): Promise<boolean> {
    return element(by.css('.toast-message')).isDisplayed() as Promise<boolean>;
  }

  saveItem(): void {
    element(by.xpath('//button[text()[contains(.,"Crear")]]')).click();
    browser.sleep(1000);
  }

  populateTrackFields(trackName: string, trackDuration: string): void {
    element(by.css('#albumDetails input[name="name"]')).sendKeys(trackName);

    element(by.css('#albumDetails input[name="duration"]')).sendKeys(
      trackDuration
    );
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

  crearButtonIsDisabled(): Promise<string> {
    return element(
      by.xpath('//button[text()[contains(.,"Crear")]]')
    ).getAttribute('disabled') as Promise<string>;
  }

  goAndClickButton(buttonText: string): void {
    element(by.xpath('//p[text()[contains(.,"' + buttonText + '")]]')).click();
  }

  getAlbumTracks(): Promise<string> {
    return element(
      by.css('#albumDetails table[aria-label="Detalle de un album"]')
    ).getTagName() as Promise<string>;
  }

  getAlbumComents(): Promise<string> {
    return element(by.css('#albumDetails .list-group')).getTagName() as Promise<
      string
    >;
  }

  getAlbumAttribute(labelText: string): Promise<string> {
    return browser
      .findElement(by.xpath('//p[text()[contains(.,"' + labelText + '")]]'))
      .getText() as Promise<string>;
  }

  getAlbumDetailsCover(): Promise<string> {
    return element(
      by.css('#albumDetails img[alt^="Album"]')
    ).getTagName() as Promise<string>;
  }

  ShowFirstAlbumDetails(): void {
    const list = browser
      .findElements(by.css('table#albumList button.gridSelector'))
      .then((elements) => {
        elements[0].click();
      });
  }

  getAlbumsTableReference(): Promise<string> {
    return element(by.css('table#albumList')).getTagName() as Promise<string>;
  }

  getTotalDeAlbums(): Promise<string> {
    return element(by.css('.alert.alert-secondary span')).getText() as Promise<
      string
    >;
  }

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.tagName('h1')).getText() as Promise<string>;
  }

  getMenuItem(ref: string): Promise<string> {
    return element(
      by.css('a[ng-reflect-router-link="' + ref + '"]')
    ).getAttribute('class') as Promise<string>;
  }
}
