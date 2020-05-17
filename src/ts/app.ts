import $ from 'jquery';

let extensions = ['.jpg', '.png', '.jpeg', '.bmp', '.gif'];

function isImage(url: string): boolean {
    // url = url.split('?')[0];
    // url = url.split('#')[0];
    for (let ext of extensions) {
        if (url.includes(ext) || url.startsWith('data:image')) {
            return true;
        }
    }
    return false;
}

function deleteImageAttr(el: HTMLElement, name: string) {
    if (el.hasAttribute(name) && el.getAttribute(name) !== '') {
        el.setAttribute(`__${name}`, el.getAttribute(name)!);
        el.setAttribute(name, '');
    }
}

function deleteImageTag(els: JQuery, attrs: string[]) {
    for (let el of els) {
        for (let attr of attrs) {
            deleteImageAttr(el, attr);
        }
        for (let attr of el.attributes) {
            if (!attr.name.startsWith('__') && isImage(attr.value)) {
                deleteImageAttr(el, attr.name);
            }
        }
    }
}

function run() {
    let imgs = $('img');
    console.log(`Start to hide ${imgs.length} img's images`);
    deleteImageTag(imgs, ['src']);

    let els = $('div');
    console.log(`Start to hide ${els.length} div's images`);
    deleteImageTag(els, ['background', 'background-image']);
}

export function onLoaded() {
    run();
    setInterval(() => run(), 2000);
}
