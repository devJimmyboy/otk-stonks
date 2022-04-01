import React, { PropsWithChildren } from 'react'
import './kbd.css'
interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

export default function Kbd(props: PropsWithChildren<Props>) {
  return <kbd {...props}></kbd>
}
