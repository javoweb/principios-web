import { PerformerPage } from './performer.po';
import { browser, logging } from 'protractor';

describe('Workflows relacinados con artistas', () => {
  let page: PerformerPage;
  const faker = require('faker');

  beforeEach(() => {
    page = new PerformerPage();
    browser.waitForAngularEnabled(true);
  });

  it('Navegar a artistas', () => {
    browser.get('/performers');
    browser.driver.sleep(1000);
    expect(page.getMenuItem('performers')).toContain('menuActive');
  });

  it('HU03-Listar Artistas', () => {
    browser.get('/performers');
    browser.driver.sleep(1000);

    /**
     * 1- Debe informarse el total de performers encontrados
     */
    expect(page.getTotalPerformers()).toBeDefined();

    /**
     * 2- Debe mostrarse una tabla con los performers encontrados
     */
    expect(page.getPerformersTableReference()).toBe('table');
  });

  it('HU04-Ver información detallada de un artista', () => {
    browser.get('/performers');
    browser.driver.sleep(1000);

    /**
     * Ir al detalle de un Performer
     */
    page.ShowFirstBandDetails();

    browser.driver.sleep(1000);

    /**
     * Debe tener una Imagen
     */
    expect(page.getBandDetailsImg()).toBe('img');

    /**
     * Debe mostrar todos los parametros del Performer
     */
    expect(page.getPerformerAttribute('Artista:')).toBe('Artista:');
    expect(page.getPerformerAttribute('Fecha de Formación:')).toBe(
      'Fecha de Formación:'
    );
    expect(page.getPerformerAttribute('Descripción: ')).toBe('Descripción:');

    /**
     * Debe mostrar el listado de premios
     */
    expect(page.getPerformerPrizes()).toBe('table');
  });

  it('HU13- Asociar un track a un artista ', () => {
    browser.get('/performers');
    browser.driver.sleep(1000);

    /**
     * Click en el boton añadir premio
     */
    page.goAndClickButton('Agregar Premio');
    browser.driver.sleep(1000);

    /**
     * El boton crear debe estar deshabilitado por defecto
     */
    expect(page.buttonIsDisabled('Crear')).toBe('true');

    /**
     * Verificar que los campos oarganización, descripción y nombre son requeridos
     */
    expect(page.getAlertFor('#crearPremio', 'organization', 'name')).toContain(
      'Campo Requerido'
    );
    expect(page.getAlertFor('#crearPremio', 'name', 'name')).toContain(
      'Campo Requerido'
    );
    expect(page.getAlertFor('#crearPremio', 'description', 'name')).toContain(
      'Campo Requerido'
    );

    const prizeName = faker.name.firstName();
    const prizeOrganization = faker.name.lastName();
    const prizeDescription = faker.lorem.sentence();

    /**
     * Rellenar los campos en el formulario
     */
    page.populatePrizeFields(prizeName, prizeOrganization, prizeDescription);

    /**
     * Guardar
     */
    page.saveItem('Crear');
 });

  it('HU14- Agregar un premio a un artista ', () => {
    browser.get('/performers');
    browser.driver.sleep(1000);

    /**
     * Ir al detalle de un Performer
     */
    page.ShowFirstBandDetails();
    browser.driver.sleep(1000);

    /**
     * Click en el boton asignar Premio
     */
    page.goAndClickButton('Asignar Premio');
    browser.driver.sleep(1000);

    /**
     * El boton asignar debe estar deshabilitado por defecto
     */
    expect(page.buttonIsDisabled('Asignar')).toBe('true');

    /**
     * Verificar que el campo prizeId sea requerido
     */
    expect(
      page.getAlertFor('#prizeAssign', 'prizeId', 'name')
    ).toContain('Campo Requerido');

    browser.driver.sleep(1000);

    const date = faker.date.recent(10);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let dateStr: string;

    if (month < 10) {
      dateStr = `${day}/0${month}/${year}`;
    }else{
      dateStr = `${day}/${month}/${year}`;
    }


    /**
     * Llenar el formulario
     */
    page.populatePrizeAssignFields(dateStr);

    /**
     * Guardar
     */
    page.saveItem('Asignar');
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
