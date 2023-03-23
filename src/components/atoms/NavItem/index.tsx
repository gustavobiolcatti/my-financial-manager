import { LiHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

type NavItemProps = LiHTMLAttributes<HTMLLIElement> & {
  to: string;
  type: 'link' | 'button';
  click: () => void;
};

const NavItem = ({
  to,
  click,
  type,
  children,
  ...rest
}: NavItemProps): JSX.Element => {
  return (
    <S.NavItem {...rest}>
      {type === 'link' ? (
        <Link to={to} onClick={click}>
          <S.LinkText>{children}</S.LinkText>
        </Link>
      ) : (
        <button onClick={click}>
          <S.LinkText>{children}</S.LinkText>
        </button>
      )}
    </S.NavItem>
  );
};

export default NavItem;
