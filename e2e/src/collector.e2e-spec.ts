import { CollectorPage } from './collector.po';
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { assert } from 'console';

describe('Workflows relacionados con coleccionistas', () => {
  let appPage: AppPage;
  let page: CollectorPage;
  let ngfaker: any;

  beforeEach(() => {
    ngfaker = require('ng-faker');
    page = new CollectorPage();
    appPage = new AppPage();
    browser.waitForAngularEnabled(true);
  });

  it('Navegar a coleccionistas', () => {
    browser.get('/collectors');
    browser.driver.sleep(1000);
    expect(appPage.getMenuItem('collectors')).toContain('menuActive');
  });

  it('HU05-Listar coleccionistas', () => {
    browser.get('/collectors');
    browser.driver.sleep(1000);

    /**
     * 1- Debe informarse el total de coleccionistas encontrados
     */
    expect(page.getTotalDeCollecionistas()).toBeDefined();

    /**
     * 2- Debe mostrarse una tabla con los coleccionistas encontrados
     */
    expect(page.getCollectorsTableReference()).toBe('table');
  });

  it('HU06-Ver información detallada de un collecionista', () => {
    browser.get('/collectors');
    browser.driver.sleep(1000);

    /**
     * Ir al detalle de un album
     */
    page.ShowFirstCollectorDetails();

    browser.driver.sleep(1000);

    /**
     * Debe mostrar el nombre del collecionista
     */
    expect(page.getCollectorAttribute('Nombre:')).toBe('Nombre:');

    /**
     * Debe mostrar el listado de artistas favoritos
     */
    expect(page.getCollectorPerformers()).toBe('table');

    /**
     * Debe mostrar el listado de albums a vender
     */
    expect(page.getCollectorAlbums()).toBe('table');
  });

  it('HU10- Agregar artistas favoritos ', () => {
    browser.get('/collectors');
    browser.driver.sleep(1000);

    /**
     * Ir al detalle de un album
     */
    page.ShowFirstCollectorDetails();

    browser.driver.sleep(1000);

    /**
     * Click en el botono añadir track
     */
    appPage.goAndClickButton('Agregar Artista Favorito');
    browser.driver.sleep(1000);

    /**
     * El boton crear debe estar deshabilitado por defecto
     */
    expect(appPage.crearButtonIsDisabled()).toBe('true');

  });




  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });

});
