import { Component, ComponentFactoryResolver, ElementRef, HostListener, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { KEY_ESCAPE } from '../../platform/key';
import { NavParams } from '../../navigation/nav-params';
import { ViewController } from '../../navigation/view-controller';
import { GESTURE_GO_BACK_SWIPE, GESTURE_MENU_SWIPE, GestureController } from '../../gestures/gesture-controller';
import { ModuleLoader } from '../../util/module-loader';
/**
 * @hidden
 */
export class ModalCmp {
    constructor(_cfr, _renderer, _elementRef, _navParams, _viewCtrl, gestureCtrl, moduleLoader) {
        this._cfr = _cfr;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._navParams = _navParams;
        this._viewCtrl = _viewCtrl;
        this.moduleLoader = moduleLoader;
        let opts = _navParams.get('opts');
        (void 0) /* assert */;
        this._gestureBlocker = gestureCtrl.createBlocker({
            disable: [GESTURE_MENU_SWIPE, GESTURE_GO_BACK_SWIPE]
        });
        this._bdDismiss = opts.enableBackdropDismiss;
        if (opts.cssClass) {
            opts.cssClass.split(' ').forEach((cssClass) => {
                // Make sure the class isn't whitespace, otherwise it throws exceptions
                if (cssClass.trim() !== '')
                    _renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
    }
    ionViewPreLoad() {
        const component = this._navParams.data.component;
        if (!component) {
            console.warn('modal\'s page was not defined');
            return;
        }
        let cfr = this.moduleLoader.getComponentFactoryResolver(component);
        if (!cfr) {
            cfr = this._cfr;
        }
        const componentFactory = cfr.resolveComponentFactory(component);
        // ******** DOM WRITE ****************
        const componentRef = this._viewport.createComponent(componentFactory, this._viewport.length, this._viewport.parentInjector, []);
        this._setCssClass(componentRef, 'ion-page');
        this._setCssClass(componentRef, 'show-page');
        // Change the viewcontroller's instance to point the user provided page
        // Lifecycle events will be sent to the new instance, instead of the modal's component
        // we need to manually subscribe to them
        this._viewCtrl._setInstance(componentRef.instance);
        this._viewCtrl.willEnter.subscribe(this._viewWillEnter.bind(this));
        this._viewCtrl.didLeave.subscribe(this._viewDidLeave.bind(this));
        this._enabled = true;
    }
    _viewWillEnter() {
        this._gestureBlocker.block();
    }
    _viewDidLeave() {
        this._gestureBlocker.unblock();
    }
    _setCssClass(componentRef, className) {
        this._renderer.setElementClass(componentRef.location.nativeElement, className, true);
    }
    _bdClick() {
        if (this._enabled && this._bdDismiss) {
            const opts = {
                minClickBlockDuration: 400
            };
            return this._viewCtrl.dismiss(null, 'backdrop', opts);
        }
    }
    _keyUp(ev) {
        if (this._enabled && this._viewCtrl.isLast() && ev.keyCode === KEY_ESCAPE) {
            this._bdClick();
        }
    }
    ngOnDestroy() {
        (void 0) /* assert */;
        this._gestureBlocker.destroy();
    }
}
ModalCmp.decorators = [
    { type: Component, args: [{
                selector: 'ion-modal',
                template: '<ion-backdrop (click)="_bdClick()" [class.backdrop-no-tappable]="!_bdDismiss"></ion-backdrop>' +
                    '<div class="modal-wrapper">' +
                    '<div #viewport nav-viewport></div>' +
                    '</div>'
            },] },
];
/** @nocollapse */
ModalCmp.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: Renderer2, },
    { type: ElementRef, },
    { type: NavParams, },
    { type: ViewController, },
    { type: GestureController, },
    { type: ModuleLoader, },
];
ModalCmp.propDecorators = {
    '_viewport': [{ type: ViewChild, args: ['viewport', { read: ViewContainerRef },] },],
    '_keyUp': [{ type: HostListener, args: ['body:keyup', ['$event'],] },],
};
//# sourceMappingURL=modal-component.js.map