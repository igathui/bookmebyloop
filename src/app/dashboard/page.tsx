import { prisma } from "@/lib/prisma";
import { BusinessCard } from "@/components/sections/business-card";
import { PaginationControls } from "@/components/sections/pagination-controls";

const ITEMS_PER_PAGE = 20; // 4 columns × 5 rows

interface DashboardPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch businesses with their info
  const [businesses, totalCount] = await Promise.all([
    prisma.business.findMany({
      include: {
        BusinessInfo: true,
      },
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.business.count(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Business Directory</h1>
        <p className="text-muted-foreground">
          Discover and explore businesses in your area
        </p>
      </div>

      {businesses.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No businesses found.</p>
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {businesses.map((business) => (
              <BusinessCard
                key={business.id}
                id={business.id}
                name={business.name}
                location={
                  business.BusinessInfo?.location || "Location not specified"
                }
                description={
                  business.BusinessInfo?.description ||
                  "No description available"
                }
              />
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </div>
  );
}
