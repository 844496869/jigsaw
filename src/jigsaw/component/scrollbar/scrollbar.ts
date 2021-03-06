/**
 * Created by 10177553 on 2017/3/20.
 */

import {Directive, Input, ElementRef, OnInit, Output, EventEmitter, NgModule} from '@angular/core';

@Directive({
    selector: '[jigsaw-scroll-bar], [jigsaw-scrollBar]'
})
export class JigsawScrollBar implements OnInit {
    private _scrollBarJq: any;
    private _scrollBarOptions: Object;
    private _inited: boolean;

    constructor(private _elf: ElementRef) {
    }

    @Input()
    public scrollBarAxis: string = "yx";   //  horizontal scrollbar or "y" or "x"

    @Input()
    public scrollBarTheme: string = "dark";  // 很多很多主题...

    @Input()
    public autoHideScrollbar: boolean = false;

    @Input()
    public scrollBarSnapAmount: number;

    @Input()
    public scrollBarMouseWheelable: boolean;

    @Input()
    public scrollBarScrollAmount: number;

    @Output()
    public scrollInit: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public scrollStart = new EventEmitter<ScrollEvent>();

    @Output()
    public whileScrolling = new EventEmitter<ScrollEvent>();

    @Input()
    public get scrollBarOptions() {
        return this._scrollBarOptions
    }

    public set scrollBarOptions(value) {
        if (value && this.scrollBarOptions != value) {
            this._scrollBarOptions = value;
            if(this._inited){
                this._initScrollBar(this._generateOptions());
            }
        }
    }

    public scrollTo(position?: any, options?: any){
        this._scrollBarJq.mCustomScrollbar("scrollTo", position, options);
    }

    /**
     * 根据参数设置滚动条
     * option {} object 类型
     */
    private _initScrollBar(option): void {
        if (!this._scrollBarJq) {
            this._scrollBarJq = $(this._elf.nativeElement);
        } else {
            // 销毁当前滚动条
            this._scrollBarJq.mCustomScrollbar("destroy");
        }
        // 创建滚动条(tab-pane ngFor和table使用是会报错，所以改成异步了，见issue#83)
        setTimeout(() => {
            this._scrollBarJq.mCustomScrollbar(option);
        }, 0);
    }

    /*
     * 生成最终的options
     * */
    private _generateOptions(): Object {
        let options = {
            axis: this.scrollBarAxis,
            theme: this.scrollBarTheme,
            autoHideScrollbar: this.autoHideScrollbar,
            snapAmount: this.scrollBarSnapAmount,
            mouseWheel:{ enable: this.scrollBarMouseWheelable, scrollAmount: this.scrollBarScrollAmount },
            callbacks: {
                onInit: () => {
                    this.scrollInit.emit();
                    this._scrollBarJq.find('.mCSB_1_scrollbar').on('click', function () {
                        event.stopPropagation();
                    })
                },
                onScrollStart: (value) => {
                    this.scrollStart.emit(this._generateEventObject(this._scrollBarJq.get(0).mcs));
                },
                whileScrolling: () => {
                    this.whileScrolling.emit(this._generateEventObject(this._scrollBarJq.get(0).mcs));
                },
                onScroll: () => {

                }
            }
        };

        if (typeof this.scrollBarOptions == 'object') {
            for (let prop in this.scrollBarOptions) {
                options[prop] = this.scrollBarOptions[prop]
            }
        }

        return options;
    }

    public ngOnInit() {
        this._initScrollBar(this._generateOptions());
        this._inited = true;
    }

    private _generateEventObject(event): ScrollEvent {
        let scrollEvent = new ScrollEvent();

        scrollEvent.direction = event.direction;
        scrollEvent.draggerLeft = event.draggerLeft;
        scrollEvent.leftPercentage = event.leftPercentage;
        scrollEvent.left = event.left;
        scrollEvent.draggerTop = event.draggerTop;
        scrollEvent.topPercentage = event.topPercentage;
        scrollEvent.top = event.top;

        scrollEvent.content = event.content;

        return scrollEvent;
    }
}

export class ScrollEvent {
    // 滚动发生的方向, y 或者x
    direction: string;

    // 距左部的距离
    draggerLeft: number;

    // 距顶部的距离
    draggerTop: number;

    // 距左侧的百分比
    leftPercentage: number;

    // 内容距离
    left: number;

    // 距顶部的百分比
    topPercentage: number;

    // 内容距离
    top: number;

    // 原本的jquery对象
    content: Object
}

@NgModule({
    imports: [],
    declarations: [JigsawScrollBar],
    exports: [JigsawScrollBar]
})
export class JigsawScrollBarModule {
}
