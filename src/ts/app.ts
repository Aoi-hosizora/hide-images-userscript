import $ from 'jquery';

let extensions = ['.jpg', '.png', '.jpeg', '.bmp', '.gif'];

function isImage(url: string): boolean {
    url = url.split('?')[0];
    url = url.split('#')[0];
    for (let ext of extensions) {
        if (url.includes(ext)) {
            return true;
        }
    }
    return false;
}

function deleteImageAttr(el: HTMLElement, name: string) {
    if (el.hasAttribute(name)) {
        el.setAttribute(`__${name}`, el.getAttribute(name) || '');
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

export function onLoaded() {
    setInterval(() => {
        let imgs = $('img');
        console.log(`Start to hide ${imgs.length} img's images`);
        deleteImageTag(imgs, ['src']);

        let divs = $('div');
        console.log(`Start to hide ${divs.length} div's images`);
        deleteImageTag(imgs, ['background', 'background-image']);
    }, 5000);
}
