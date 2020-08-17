function clearBrowserBugTimeout(node) {
    if (node.rcEndAnimTimeout) {
        clearTimeout(node.rcEndAnimTimeout);
        node.rcEndAnimTimeout = null;
    }
}
const cssAnimation = (node, transitionName, endCallback) => {
    const nameIsObj = typeof transitionName === 'object';
    const className = nameIsObj ? transitionName.name : transitionName;
    const activeClassName = nameIsObj ? transitionName.active : `${transitionName}-active`;
    let end = endCallback;
    let start;
    let active;
    const nodeClasses = classes(node);

    if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
        end = endCallback.end;
        start = endCallback.start;
        active = endCallback.active;
    }

    if (node.rcEndListener) {
        node.rcEndListener();
    }

    node.rcEndListener = e => {
        if (e && e.target !== node) {
            return;
        }

        if (node.rcAnimTimeout) {
            cancelAnimationTimeout(node.rcAnimTimeout);
            node.rcAnimTimeout = null;
        }

        clearBrowserBugTimeout(node);

        nodeClasses.remove(className);
        nodeClasses.remove(activeClassName);

        Event.removeEndEventListener(node, node.rcEndListener);
        node.rcEndListener = null;

        // Usually this optional end is used for informing an owner of
        // a leave animation and telling it to remove the child.
        if (end) {
            end();
        }
    };

    Event.addEndEventListener(node, node.rcEndListener);

    if (start) {
        start();
    }
    nodeClasses.add(className);

    node.rcAnimTimeout = requestAnimationTimeout(() => {
        node.rcAnimTimeout = null;

        nodeClasses.add(className);
        nodeClasses.add(activeClassName);

        if (active) {
            requestAnimationTimeout(active, 0);
        }
        fixBrowserByTimeout(node);
        // 30ms for firefox
    }, 30);

    return {
        stop() {
            if (node.rcEndListener) {
                node.rcEndListener();
            }
        },
    };
};