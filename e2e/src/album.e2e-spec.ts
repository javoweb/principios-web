import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { assert } from 'console';

describe('Workflows relacinados con albumes', () => {
  let page: AppPage;
  let ngfaker: any;

  beforeEach(() => {
    ngfaker = require('ng-faker');
    page = new AppPage();
    browser.waitForAngularEnabled(true);
  });

  it('Navegar a álbumes', () => {
    browser.get("/albums");
    browser.driver.sleep(1000);
    expect(page.getMenuItem("albums")).toContain("menuActive");
  });


  it('HU01-Listar álbumes', () => {
    browser.get("/albums");
    browser.driver.sleep(1000);
    // 1- Debe informarse el total de albums encontrados
    expect(page.getTotalDeAlbums()).toBeDefined();

    // 2- Debe mostrarse una tabla con los albums encontrados
    expect(page.getAlbumsTableReference()).toBe("table");

  });


  it('HU02-Ver información detallada de un álbum', () => {
    browser.get("/albums");
    browser.driver.sleep(1000);

    //Ir al detalle de un album
    page.ShowFirstAlbumDetails();

    browser.driver.sleep(1000);

    /**Debe tener una portada */
    expect( page.getAlbumDetailsCover() ).toBe("img");

    /** Dete mostrar todos los parametros del album **/
    expect(page.getAlbumAttribute("Album:")).toBe("Album:");
    expect(page.getAlbumAttribute("Artista:")).toBe("Artista:");
    expect(page.getAlbumAttribute("Fecha Lanzamiento:")).toBe("Fecha Lanzamiento:");
    expect(page.getAlbumAttribute("Genero:")).toBe("Genero:");
    expect(page.getAlbumAttribute("Casa Discografica:")).toBe("Casa Discografica:");

    /** Debe mostrar el listado de comentarios **/
    expect( page.getAlbumComents() ).toBe("ul");

    /** Debe mostrar el listado de comentarios **/
    expect( page.getAlbumTracks() ).toBe("table");

  });


  it('HU08- Asociar un track a un álbum ', () => {
    browser.get("/albums");
    browser.driver.sleep(1000);

    //Ir al detalle de un album
    page.ShowFirstAlbumDetails();

    browser.driver.sleep(1000);

    /**Click en el botono añadir track*/
    page.goAndClickButton('Agregar Track');
    browser.driver.sleep(1000);

    /**El boton crear debe estar deshabilitado por defecto**/
    expect(page.crearButtonIsDisabled()).toBe('true');

    /**Verificar que los campos duracion y nombre son requeridos**/
    expect(page.getAlertFor("#albumDetails","duration","name")).toContain("Campo Requerido");
    expect(page.getAlertFor("#albumDetails","name","name")).toContain("Campo Requerido");

    let trackName=ngfaker.name.firstName();
    let trackDuration =
        ngfaker.random.number({
          'min': 1,
          'max': 10
      })
      + ":"+
      ngfaker.random.number({
        'min': 0,
        'max': 59
    })

    page.populateTrackFields(trackName,trackDuration);

    page.saveItem();


    //**Verifica que el item se encuentra en la tabla **/
    expect( page.confirmSavedTrack(trackName) ).toContain(trackName);

  });

  it('HU09- Agregar un comentario a un álbum ', () => {
    browser.get("/albums");
    browser.driver.sleep(1000);

    //Ir al detalle de un album
    page.ShowFirstAlbumDetails();
    browser.driver.sleep(1000);

    /**Click en el botono añadir track*/
    page.goAndClickButton('Agregar Comentario');
    browser.driver.sleep(1000);

    /**El boton crear debe estar deshabilitado por defecto**/
    expect(page.crearButtonIsDisabled()).toBe('true');

    /**Verificar que los campos duracion y nombre son requeridos**/
    expect(page.getAlertFor("#albumDetails","collectorId","ng-reflect-name")).toContain("Campo Requerido");
    expect(page.getAlertFor("#albumDetails","rating","ng-reflect-name")).toContain("Campo Requerido");
    expect(page.getAlertFor("#albumDetails","description","ng-reflect-name")).toContain("Campo Requerido");

    browser.driver.sleep(1000);

    let comment=ngfaker.lorem.phrase();
    let rating =
        ngfaker.random.number({
          'min': 0,
          'max': 5
      });


    page.populateComments(comment,rating);

    page.saveItem();

    //**Verifica que el item se muestra en la tabla **/
    expect( page.confirmSavedComment(comment) ).toContain(comment);

  });





  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
