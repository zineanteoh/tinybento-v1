import Link from "next/link";

// READ: https://nextjs.org/docs/app/building-your-application/routing/route-groups
// this layout will be shared by all pages in the "(demo)" Route Group
const DemoLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <div style={{ position: "absolute" }}>
        <Link href="/">Back</Link>
      </div>
      {children}
    </div>
  );
};

export default DemoLayout;
