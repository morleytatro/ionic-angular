import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Slides } from './slides';
/**
 * @name Slide
 * @description
 * The Slide component is a child component of [Slides](../Slides). The template
 * should be written as `ion-slide`. Any slide content should be written
 * in this component and it should be used in conjunction with [Slides](../Slides).
 *
 * See the [Slides API Docs](../Slides) for more usage information.
 *
 * @demo /docs/demos/src/slides/
 * @see {@link /docs/api/components/slides/Slides/ Slides API Docs}
 */
var Slide = (function () {
    function Slide(elementRef, renderer, _slides) {
        this._slides = _slides;
        renderer.setElementClass(elementRef.nativeElement, 'swiper-slide', true);
        _slides.update(10);
    }
    /**
     * @hidden
     */
    Slide.prototype.ngOnDestroy = function () {
        this._slides.update(10);
    };
    Slide.decorators = [
        { type: Component, args: [{
                    selector: 'ion-slide',
                    template: '<div class="slide-zoom">' +
                        '<ng-content></ng-content>' +
                        '</div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    Slide.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: Slides, },
    ]; };
    return Slide;
}());
export { Slide };
//# sourceMappingURL=slide.js.map