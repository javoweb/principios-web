import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Collector } from '../collector';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collector-listar',
  templateUrl: './collector-listar.component.html'
})
export class CollectorListarComponent implements OnInit {


  collectors: Array<Collector> = [];
  constructor(private collectorService: CollectorService) { }

  ngOnInit(): void{
    this.getCollectors();
  }

  getCollectors(): void{

    this.collectorService.getCollectors().subscribe(collectors => {
      this.collectors = collectors;
    });

  }

}
