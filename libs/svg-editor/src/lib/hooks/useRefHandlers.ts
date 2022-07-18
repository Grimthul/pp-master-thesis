import * as React from 'react';

import type { SvgEditorRef, ZoomableRef } from '@pp-master-thesis/types';

const CONTENT = `Created by company-name SVG editor`;
const extensionType = {
  svg: 'image/svg+xml',
  png: 'image/png',
};

export const useRefHandlers = (
  ref: React.ForwardedRef<SvgEditorRef>,
  svg: SVGSVGElement,
  zoomableRef: ZoomableRef | null,
  elementsWrapperRef: React.RefObject<SVGGraphicsElement>,
  setSvgSize: React.Dispatch<React.SetStateAction<DOMRectReadOnly | undefined>>,
  setActiveElements: React.Dispatch<React.SetStateAction<SVGGraphicsElement[]>>
) => {
  React.useImperativeHandle(ref, () => ({
    zoomableRef,
    createNewEditor(width, height) {
      if (!elementsWrapperRef.current) return;
      setSvgSize(new DOMRectReadOnly(0, 0, width, height));
      elementsWrapperRef.current.innerHTML = '';
      setActiveElements([]);
    },
    changeEditorSize(width, height) {
      setSvgSize(new DOMRectReadOnly(0, 0, width, height));
    },
    export(extension) {
      const elementsWrapper = elementsWrapperRef.current;
      if (!svg || !elementsWrapper) return;
      const svgCopy = svg.cloneNode() as SVGSVGElement;
      svgCopy.setAttribute('content', CONTENT);
      svgCopy.removeAttribute('style');
      (
        Array.from(elementsWrapper.childNodes || []) as SVGGraphicsElement[]
      ).map((element) => svgCopy.appendChild(element.cloneNode()));

      const type = extensionType[extension];
      const a = document.createElement('a');
      const file = new Blob([svgCopy.outerHTML], { type });
      a.href = URL.createObjectURL(file);
      a.download = `Export-${Date.now().toString()}.${extension}`;
      a.click();
      URL.revokeObjectURL(a.href);
    },
    import(file) {
      if (file && file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event) => {
          const result = event.target?.result?.toString();
          const elementsWrapper = elementsWrapperRef.current;
          if (!result || !elementsWrapper) return;
          const parser = new DOMParser();
          const svg = parser
            .parseFromString(result, 'image/svg+xml')
            .getElementsByTagName('svg')[0];

          if (svg.getAttribute('content') === CONTENT) {
            const width = Number(svg.getAttribute('width'));
            const height = Number(svg.getAttribute('height'));
            setSvgSize(new DOMRectReadOnly(0, 0, width, height));
            const children = Array.from(
              svg.children || []
            ) as SVGGraphicsElement[];
            children.forEach((child) => elementsWrapper.appendChild(child));
            setActiveElements(children);
          } else {
            const image = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'image'
            );
            image.setAttribute(
              'href',
              `data:image/svg+xml;base64,${window.btoa(result)}`
            );
            elementsWrapper.appendChild(image);
            setActiveElements([image]);
          }
          reader.onerror = (error) => {
            console.warn(error);
          };
        };
      } else {
        throw new Error('Unsupported file extension.');
      }
    },
  }));
};
