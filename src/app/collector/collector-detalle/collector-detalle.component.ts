import { Component, OnInit, Input } from '@angular/core';
import { Collector } from '../collector';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collector-detalle',
  templateUrl: './collector-detalle.component.html'
})
export class CollectorDetalleComponent implements OnInit {

  @Input() collectorID: number | null = null;
  collector: Collector = null;

  constructor(private collectorService: CollectorService) { }

  ngOnInit(): void {
    this.getCollector();
  }

  getCollector(): void{

    if (this.collectorID !== null )
    {
      this.collectorService.getCollector(this.collectorID).subscribe(collector => {
        this.collector = collector;
      });
    }

  }

}
