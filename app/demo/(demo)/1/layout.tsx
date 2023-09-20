import Link from "next/link";

// READ: https://nextjs.org/docs/app/building-your-application/routing/route-groups
// this layout will be shared by all pages in the "(demo)" Route Group
const DemoLayout = (props: {
  children: React.ReactNode;
  sidebarLeft: React.ReactNode;
  sidebarRight: React.ReactNode;
}) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {props.sidebarLeft}
      {props.children}
      {props.sidebarRight}
    </div>
  );
};

export default DemoLayout;
