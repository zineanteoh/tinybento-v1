"use client";

// READ: https://nextjs.org/docs/app/building-your-application/routing/route-groups
// this layout will be shared by all pages in the "(demo)" Route Group
const DemoLayout = (props: { children: React.ReactNode }) => {
  return <div>{props.children}</div>;
};

export default DemoLayout;
