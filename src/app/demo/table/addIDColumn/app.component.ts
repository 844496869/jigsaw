import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {Http} from "@angular/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine} from "jigsaw/component/table/table-api";
import {TableCellNum} from "jigsaw/component/table/table-renderer";

@Component({
    templateUrl: './app.component.html'
})
export class TableAddIDColumnDemoComponent {
    tableData: TableData;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            text: '#'
        },
        cell: {
            renderer: TableCellNum
        }
    }]
}



