import { ComponentBase } from './component';
import { obtainSlot } from './slot';
import { Base as Vue } from './class';
export function mixins(...conses) {
    class MixinsClass extends Vue {
    }
    ComponentBase({
        mixins: conses.map((cons => obtainSlot(cons.prototype).cachedVueComponent))
    })(MixinsClass);
    return MixinsClass;
}
//# sourceMappingURL=mixins.js.map