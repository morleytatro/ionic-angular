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
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
/**
 * @hidden
 */
var CardContent = (function (_super) {
    __extends(CardContent, _super);
    function CardContent(config, elementRef, renderer) {
        return _super.call(this, config, elementRef, renderer, 'card-content') || this;
    }
    CardContent.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-card-content'
                },] },
    ];
    /** @nocollapse */
    CardContent.ctorParameters = function () { return [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    return CardContent;
}(Ion));
export { CardContent };
//# sourceMappingURL=card-content.js.map