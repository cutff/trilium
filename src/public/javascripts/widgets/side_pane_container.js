import options from "../services/options.js";
import FlexContainer from "./flex_container.js";

export default class SidePaneContainer extends FlexContainer {
    constructor(parent, side, widgetFactories) {
        super(parent, {id: side + '-pane', 'flex-direction': 'column', 'height': '100%'}, widgetFactories);

        this.side = side;
    }

    isEnabled() {
        return super.isEnabled() && options.is(this.side + 'PaneVisible');
    }

    handleEvent(name, data) {
        if (options.is(this.side + 'PaneVisible')) {
            super.handleEvent(name, data);
        }
    }

    sidebarVisibilityChangedListener({side, show}) {
        if (this.side === side) {
            this.toggle(show);

            this.handleEvent('lazyLoaded');
        }
    }
}