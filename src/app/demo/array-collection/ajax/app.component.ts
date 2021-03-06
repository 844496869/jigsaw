import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {ArrayCollection} from "jigsaw/core/data/array-collection";
import {Http} from "@angular/http";

@Component({
    templateUrl: './app.component.html'
})
export class ArrayCollectionAjaxDemoComponent {
    consoleTexts = new ArrayCollection<string>();

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: Http) {
        const ac = new ArrayCollection();
        ac.http = http;
        ac.fromAjax('mock-data/array-collection/core-members.json');

        this.consoleAppend("list of our first core members:");
        ac.onAjaxComplete(() => {
            ac.forEach((author:any) => {
                this.consoleAppend("id: " + author.id + ", name=" + author.name);
            });
        });
    }

     consoleAppend(msg: string): void {
        this.consoleTexts.push((this.consoleTexts.length + 1) + ': ' + msg);
    }
}
