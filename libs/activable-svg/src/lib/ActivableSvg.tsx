import * as React from 'react';

import './ActivableSvg.scss';

type Props = React.SVGProps<SVGSVGElement> & {
  setActiveSvg: React.Dispatch<React.SetStateAction<SVGElement | undefined>>;
};

export const ActivableSvg = React.forwardRef(
  (
    { setActiveSvg, ...props }: Props,
    ref: React.ForwardedRef<SVGSVGElement>
  ) => {
    const onClick = (event: React.MouseEvent) => {
      setActiveSvg(event.target as SVGElement);
    };

    return <svg {...props} ref={ref} onClick={onClick}></svg>;
  }
);
