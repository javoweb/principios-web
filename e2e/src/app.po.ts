import { listenerCount } from 'events';
import { browser, by, element, WebElement, Key } from 'protractor';

export class AppPage {
  confirmSavedTrack(trackName: any): any {
    return element(by.xpath("//td[text()[contains(.,'"+trackName+"')]]")).getText() as Promise<string>;
  }
  getSavingMessage(): any {
    element(by.xpath("//*[text() = 'Exito']")).getText();
  }
  saveNewTrack() {
    element(by.xpath('//*[@id="albumDetails"]/div[3]/app-album-tracks/form/div[3]/button[1]')).click();
    browser.sleep(1000);
  }
  populateTrackFields(trackName: string, trackDuration: string) {
    element(by.css("#albumDetails input[name='name']")).sendKeys(trackName);

    element(by.css("#albumDetails input[name='duration']")).sendKeys(trackName);

  }
  getAlertFor(fieldName: string): Promise<string> {
    element(by.css("#albumDetails input[name='"+fieldName+"']")).sendKeys(Key.DOWN)
    browser.sleep(1000);

    element(by.css("#albumDetails input[name='"+fieldName+"']")).click();
    element(by.css("#albumDetails")).click();

    return element(by.xpath('//*[@id="albumDetails"]/div[3]/app-album-tracks/form/div[1]/div' )).getText() as Promise<string>;
  }

  crearButtonIsDisabled(): Promise<string> {
    return element(by.xpath("//button[text()[contains(.,'Crear')]]")).getAttribute("disabled") as Promise<string>;
  }

  goAndClickButton(buttonText: string) {
    element(by.xpath("//p[text()[contains(.,'"+buttonText+"')]]")).click();

  }

  getAlbumTracks(): any {
    return element(by.css("#albumDetails table[aria-label='Detalle de un album']")).getTagName() as Promise<string>;
  }
  getAlbumComents(): Promise<string> {
    return element(by.css("#albumDetails .list-group")).getTagName() as Promise<string>;
  }

  getAlbumAttribute(labelText: string): Promise<string> {
    return browser.findElement(by.xpath("//p[text()[contains(.,'"+labelText+"')]]")).getText() as Promise<string>;

  }

  getAlbumDetailsCover(): Promise<string> {

    return element(by.css("#albumDetails img[alt^='Album']")).getTagName() as Promise<string>;
  }


  ShowFirstAlbumDetails() {
    let list= browser.findElements( by.css("table#albumList button.gridSelector")).then(function(elements) {
        elements[0].click();
    });

  }

  getAlbumsTableReference(): Promise<string> {

    return element(by.css('table#albumList')).getTagName() as Promise<string>;
  }

  getTotalDeAlbums(): Promise<string> {
    return element(by.css('.alert.alert-secondary span')).getText() as Promise<string>;
  }


  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.tagName('h1')).getText() as Promise<string>;
  }

  getMenuItem(ref): Promise<string> {
    return element(by.css('a[ng-reflect-router-link="'+ref+'"]')).getAttribute("class") as Promise<string>;
  }


}
