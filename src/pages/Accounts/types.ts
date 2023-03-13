import { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  newCard?: boolean
}