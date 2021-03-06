import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { JigsawTimeModule } from "jigsaw/component/time/index";
import { JigsawTileSelectModule } from "jigsaw/component/tile-select/tile-select";
import { TimeWeekStartComponent }  from './app.component';

@NgModule({
    imports: [ CommonModule, JigsawTimeModule, JigsawTileSelectModule ],
    declarations: [ TimeWeekStartComponent ],
    bootstrap: [ TimeWeekStartComponent ]
})
export class TimeWeekStartDemoModule {}
