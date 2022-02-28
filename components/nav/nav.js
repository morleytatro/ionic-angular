var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ComponentFactoryResolver, ElementRef, ErrorHandler, Input, NgZone, Optional, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation, forwardRef } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { DomController } from '../../platform/dom-controller';
import { GestureController } from '../../gestures/gesture-controller';
import { NavController } from '../../navigation/nav-controller';
import { NavControllerBase } from '../../navigation/nav-controller-base';
import { Platform } from '../../platform/platform';
import { TransitionController } from '../../transitions/transition-controller';
import { ViewController } from '../../navigation/view-controller';
import { RootNode } from '../split-pane/split-pane';
/**
 * @name Nav
 * @description
 *
 * `ion-nav` is the declarative component for a [NavController](../../../navigation/NavController/).
 *
 * For more information on using nav controllers like Nav or [Tab](../../Tabs/Tab/),
 * take a look at the [NavController API Docs](../../../navigation/NavController/).
 *
 *
 * @usage
 * You must set a root page to be loaded initially by any Nav you create, using
 * the 'root' property:
 *
 * ```ts
 * import { Component } from '@angular/core';
 * import { GettingStartedPage } from './getting-started';
 *
 * @Component({
 *   template: `<ion-nav [root]="root"></ion-nav>`
 * })
 * class MyApp {
 *   root = GettingStartedPage;
 *
 *   constructor(){
 *   }
 * }
 * ```
 *
 * @demo /docs/demos/src/navigation/
 * @see {@link /docs/components#navigation Navigation Component Docs}
 */
var Nav = (function (_super) {
    __extends(Nav, _super);
    function Nav(viewCtrl, parent, app, config, plt, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, domCtrl, errHandler) {
        var _this = _super.call(this, parent, app, config, plt, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, domCtrl, errHandler) || this;
        _this._hasInit = false;
        if (viewCtrl) {
            // an ion-nav can also act as an ion-page within a parent ion-nav
            // this would happen when an ion-nav nests a child ion-nav.
            viewCtrl._setContent(_this);
        }
        if (parent) {
            // this Nav has a parent Nav
            parent.registerChildNav(_this);
        }
        else if (viewCtrl && viewCtrl.getNav()) {
            // this Nav was opened from a modal
            _this.parent = viewCtrl.getNav();
            _this.parent.registerChildNav(_this);
        }
        else if (app && !app.getRootNavById(_this.id)) {
            // a root nav has not been registered yet with the app
            // this is the root navcontroller for the entire app
            app.registerRootNav(_this);
        }
        return _this;
    }
    Object.defineProperty(Nav.prototype, "_vp", {
        /**
         * @hidden
         */
        set: function (val) {
            this.setViewport(val);
        },
        enumerable: true,
        configurable: true
    });
    Nav.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._hasInit = true;
        var segment = this._linker.getSegmentByNavIdOrName(this.id, this.name);
        if (segment && (segment.component || segment.loadChildren)) {
            return this._linker.initViews(segment).then(function (views) {
                return _this.setPages(views, null, null);
            });
        }
        else if (this._root) {
            // no segment match, so use the root property but don't set the url I guess
            var setUrl = segment ? false : true;
            return this.push(this._root, this.rootParams, {
                isNavRoot: (this._app.getRootNavById(this.id) === this),
                updateUrl: setUrl
            }, null);
        }
    };
    Object.defineProperty(Nav.prototype, "root", {
        /**
         * @input {Page} The Page component to load as the root page within this nav.
         */
        get: function () {
            return this._root;
        },
        set: function (page) {
            this._root = page;
            if (this._hasInit) {
                this.setRoot(page);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    Nav.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    Nav.prototype.initPane = function () {
        var isMain = this._elementRef.nativeElement.hasAttribute('main');
        return isMain;
    };
    Nav.prototype.paneChanged = function (isPane) {
        if (isPane) {
            this.resize();
        }
    };
    Nav.prototype.goToRoot = function (opts) {
        return this.setRoot(this._root, this.rootParams, opts, null);
    };
    /*
     * @private
     */
    Nav.prototype.getType = function () {
        return 'nav';
    };
    /*
     * @private
     */
    Nav.prototype.getSecondaryIdentifier = function () {
        return null;
    };
    Nav.decorators = [
        { type: Component, args: [{
                    selector: 'ion-nav',
                    template: '<div #viewport nav-viewport></div>' +
                        '<div class="nav-decor"></div>',
                    encapsulation: ViewEncapsulation.None,
                    providers: [{ provide: RootNode, useExisting: forwardRef(function () { return Nav; }) }]
                },] },
    ];
    /** @nocollapse */
    Nav.ctorParameters = function () { return [
        { type: ViewController, decorators: [{ type: Optional },] },
        { type: NavController, decorators: [{ type: Optional },] },
        { type: App, },
        { type: Config, },
        { type: Platform, },
        { type: ElementRef, },
        { type: NgZone, },
        { type: Renderer2, },
        { type: ComponentFactoryResolver, },
        { type: GestureController, },
        { type: TransitionController, },
        { type: DeepLinker, decorators: [{ type: Optional },] },
        { type: DomController, },
        { type: ErrorHandler, },
    ]; };
    Nav.propDecorators = {
        '_vp': [{ type: ViewChild, args: ['viewport', { read: ViewContainerRef },] },],
        'root': [{ type: Input },],
        'rootParams': [{ type: Input },],
        'name': [{ type: Input },],
    };
    return Nav;
}(NavControllerBase));
export { Nav };
//# sourceMappingURL=nav.js.map