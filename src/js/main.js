'use strict'

// import * as allFunctions from './module/sum.js';



// ======================[ Header ]======================
import { componentHeader } from '../components/Header/header.js';
// import { componentHeaderScroll } from '../components/Header/header.js';

// ======================[ Counter ]======================
// import componentCounter from '../components/Counter/counter.js';

// ======================[ Modal Window ]======================
// import componentModal from '../components/Modal/modal.js';

// ======================[ Rippple Button ]======================
// import componentRippleButton from '../components/RippleButton/rippleButton.js';

// ======================[ Spoilers ]======================
import componentSpoilers from '../components/Spoiler/spoiler.js';

// ======================[ Switch ]======================
// import { componentIconsChangeTheme } from '../components/Switch/switch.js';
// import { componentSwitcherChangeTheme } from '../components/Switch/switch.js';

// ======================[ Tabs ]======================
import componentTabs from '../components/Tabs/tabs.js';

// ======================[ Dynamic Adaptive ]======================
import dynamicAdapt from '../components/DynamicAdapt/dynamicAdapt.js';

// ======================[ Light Gallery ]======================
// import lightgallery from '../components/LightGallery/lightgallery.js';

// ======================[ Input Validate ]======================
import inputValidate from '../components/forms/inputValidate/inputValidate.js';

// ======================[ Scroll Animation ]======================
import scrollAnimation from '../components/ScrollAnimation/scrollAnimation.js';

// ======================[ Header ]======================
componentHeader()
// componentHeaderScroll()

// ======================[ Counter ]======================
// componentCounter()

// ======================[ Modal Window ]======================
// componentModal()

// ======================[ Ripple Button ]======================
// componentRippleButton()

// ======================[ Spoilers ]======================
componentSpoilers();

// ======================[ Switch ]======================
// componentIconsChangeTheme()
// componentSwitcherChangeTheme()

// ======================[ Tabs ]======================
componentTabs();

// ======================[ Dynamic Adaptive ]======================
dynamicAdapt()
/* Example: <div data-da=".content__column-garden,992,2" class="content__block">Example</div>
    for work with this component, you must write a data-attribute 'data-da' in element,
    which you want to adaptive. In data-da structure is data-da="where, when, which"
    where - class of element, where you want to move your element
    when - width of screen, when it should happen
    which - number of position after move or words "first" "last"
 */

// ======================[ Light Gallery ]======================
// lightgallery()

// ======================[ Input Validate ]======================
inputValidate()

// ======================[ Scroll Animation ]======================
scrollAnimation();
/* ._active - element in viewport zone, start animation
    ._anim-items - for conect animationScroll for this element
    ._anim-no-hide - if you want only 1 animation, without repeat
    global class for examle ._anim-show, if one animation repeat
*/



// Code
const header = document.querySelector('.header');
header.classList.add('_active');


function onEntry(entries, observer) {
   entries.forEach(entry => {
      const target = entry.target;

      if (entry.isIntersecting) {
         target.classList.add('_active');

         if (target.hasAttribute('data-watch-once')) {
            observer.unobserve(target);
         }
      } else {
         if (!target.hasAttribute('data-watch-once')) {
            target.classList.remove('_active');
         }
      }
   });
}

const defaultThreshold = 0.5;
const watchElements = document.querySelectorAll('[data-watch]');

watchElements.forEach(element => {
   let threshold = parseFloat(element.getAttribute('data-watch-threshold'));
   if (isNaN(threshold)) {
      threshold = defaultThreshold;
   }

   const options = {
      threshold: threshold
   };

   const observer = new IntersectionObserver(onEntry, options);
   observer.observe(element);
});