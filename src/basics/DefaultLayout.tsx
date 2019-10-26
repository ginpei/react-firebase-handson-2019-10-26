import React, { ComponentPropsWithRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DefaultHeaderOuter = styled.div`
  background-color: #036;
  color: #fff;
  height: 1.5rem;
  line-height: 1.5rem;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const DefaultHeaderInner = styled.div.attrs({
  className: 'ui-container',
})`
  display: flex;
  justify-content: space-between;
`;

const DefaultMainOuter = styled.div`
  min-height: 50vh;
`;

const DefaultFooterOuter = styled.div`
  border-top: dotted #ccc 1px;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
`;

type Props = ComponentPropsWithRef<'div'>;

const DefaultLayout: React.FC<Props> = (props) => {
  const { className, ...elementProps } = props;

  return (
    <div className="DefaultLayout">
      <DefaultHeaderOuter>
        <DefaultHeaderInner>
          <span>
            <Link to="/">My Great App</Link>
          </span>
        </DefaultHeaderInner>
      </DefaultHeaderOuter>
      <DefaultMainOuter
        className={`ui-container ${className}`}
        {...elementProps}
      />
      <DefaultFooterOuter>
        <div className="ui-container">
          {'Created by '}
          <Link to="https://ginpei.dev">Ginpei Takanashi</Link>
        </div>
      </DefaultFooterOuter>
    </div>
  );
}

export default DefaultLayout;
