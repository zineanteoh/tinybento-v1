"use client";
import { useRouter } from "next/navigation";

// READ: https://nextjs.org/docs/app/building-your-application/routing/route-groups
// this layout will be shared by all pages in the "(demo)" Route Group
const DemoLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <div>
      <button type="button" onClick={() => router.back()}>
        Back
      </button>
      <>{children}</>
    </div>
  );
};

export default DemoLayout;
