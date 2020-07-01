import React, { Fragment } from 'react';
import Link from 'next/link';
import FuelLink, { FuelLinkTypes } from './FuelLink';

interface LinkBreadCrumb {
  name: string;
  page: string;
  path?: string;
}

interface FuelBreadCrumb {
  type: FuelLinkTypes;
  value: any;
}

export type BreadCrumb = FuelBreadCrumb | LinkBreadCrumb | string;

const BreadCrumbLink: React.FC<{ breadCrumb: BreadCrumb }> = ({ breadCrumb }) => {
  if ((breadCrumb as FuelBreadCrumb).type) {
    const _crumb = breadCrumb as FuelBreadCrumb;
    return (
      <FuelLink type={_crumb.type} title>{_crumb.value}</FuelLink>
    );
  }

  if ((breadCrumb as LinkBreadCrumb).page) {
    const _crumb = breadCrumb as LinkBreadCrumb;
    return (
      <Link href={_crumb.page} as={_crumb.path}><a>{_crumb.name}</a></Link>
    );
  }

  return (
    <Fragment>{breadCrumb as string}</Fragment>
  );
};

const BreadCrumbs: React.FC<{ breadCrumbs: BreadCrumb[] }> = ({ breadCrumbs }) => {
  return (
    <ul className="breadCrumbs">
      {breadCrumbs.map((breadCrumb: BreadCrumb) => (
        // @ts-ignore
        <li key={breadCrumb.name || breadCrumb.value || breadCrumb}>
          <BreadCrumbLink breadCrumb={breadCrumb} />
        </li>
      ))}

      <style jsx>{`
        .breadCrumbs {
          display: flex;
          margin: 0;
          padding: 0;
          font-size: 20px;
          color: #69737d;
        }

        .breadCrumbs li {
          list-style: none;
          padding: 0;
        }

        .breadCrumbs li + li:before {
          content: '/';
          display: inline-block;
          margin: 0 20px;
        }
      `}</style>
    </ul>
  )
}

export default BreadCrumbs;
