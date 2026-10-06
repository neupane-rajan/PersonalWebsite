import type { ReactNode } from 'react';

const K = ({ children }: { children: ReactNode }) => <span className="text-ctp-blue">{children}</span>;
const V = ({ children }: { children: ReactNode }) => <span className="text-ctp-peach">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="italic text-ctp-overlay0">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="text-ctp-mauve">{children}</span>;

/** The settings this site imitates, written as the hyprland.conf they'd come from */
export default function HyprConf() {
  return (
    <pre className="m-0 h-full overflow-auto p-4 text-[12.5px] leading-[1.6] text-ctp-subtext1">
      <C># the values this page is styled from (src/styles/hyprland.css)</C>{'\n\n'}
      <S>general</S> {'{'}{'\n'}
      {'    '}<K>gaps_in</K> = <V>5</V>{'\n'}
      {'    '}<K>gaps_out</K> = <V>10</V>{'\n'}
      {'    '}<K>border_size</K> = <V>2</V>{'\n'}
      {'    '}<K>col.active_border</K> = <V>rgb(cba6f7) rgb(74c7ec) rgb(94e2d5) 45deg</V>{'\n'}
      {'    '}<K>col.inactive_border</K> = <V>rgb(45475a)</V>{'\n'}
      {'    '}<K>layout</K> = <V>dwindle</V>{'\n'}
      {'}'}{'\n\n'}
      <S>decoration</S> {'{'}{'\n'}
      {'    '}<K>rounding</K> = <V>10</V>{'\n'}
      {'    '}<K>dim_inactive</K> = <V>true</V>{'\n'}
      {'    '}<K>dim_strength</K> = <V>0.22</V>{'\n'}
      {'    '}<S>blur</S> {'{'} <K>enabled</K> = <V>true</V>; <K>size</K> = <V>12</V> {'}'}{'\n'}
      {'}'}{'\n\n'}
      <S>animations</S> {'{'}{'\n'}
      {'    '}<K>bezier</K> = <V>myBezier, 0.05, 0.9, 0.1, 1.05</V>{'\n'}
      {'    '}<K>animation</K> = <V>windows, 1, 7, myBezier, popin 80%</V>{'\n'}
      {'    '}<K>animation</K> = <V>workspaces, 1, 6, myBezier, slidevert</V>{'\n'}
      {'    '}<K>animation</K> = <V>borderangle, 1, 60, linear, loop</V>{'\n'}
      {'}'}{'\n\n'}
      <K>bind</K> = <V>SUPER, 1-6, workspace, 1-6</V>   <C># here: just press 1-6</C>
    </pre>
  );
}
