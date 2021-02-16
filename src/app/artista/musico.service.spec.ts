import { TestBed, getTestBed } from "@angular/core/testing";

import {
 HttpTestingController,
 HttpClientTestingModule,
} from "@angular/common/http/testing";

import faker from "faker";

import { MusicoService } from "./musico.service";
import { Musico } from "./musico";
import { environment } from "../../environments/environment";

describe("MusicoService", () => {
 let injector: TestBed;
 let service: MusicoService;
 let httpMock: HttpTestingController;
 let apiUrl = environment.baseUrl + "musicians";

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [MusicoService],
   });

   injector = getTestBed();
   service = injector.get(MusicoService);
   httpMock = injector.get(HttpTestingController);
 });

 afterEach(() => {
   httpMock.verify();
 });

 it("getMusicos() should return 10 records", () => {
   let mockPosts: Musico[] = [];

   for (let i = 0; i < 10; i++) {

     let musico = new Musico(
       faker.random.number(),
       faker.name.findName(),
       faker.internet.url(),
       faker.lorem.sentence(),
       faker.date.past()
     );
     mockPosts.push(musico);
   }

   service.getMusicos().subscribe((musicos) => {
     expect(musicos.length).toBe(10);
   });

   const req = httpMock.expectOne(apiUrl);
   expect(req.request.method).toBe("GET");
   req.flush(mockPosts);
 });

 it("getMusicos() should return 0 records", () => {
  let mockPosts: Musico[] = [];

  service.getMusicos().subscribe((musicos) => {
    expect(musicos.length).toBe(0);
  });

  const req = httpMock.expectOne(apiUrl);
  expect(req.request.method).toBe("GET");
  req.flush(mockPosts);
});
});
