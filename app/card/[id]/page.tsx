import { notFound } from "next/navigation";
import { CardDetailClient } from "@/components/card-detail-client";
import { checklistCards, getChecklistCardById } from "@/lib/checklist-data";

interface CardDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return checklistCards.map((card) => ({
    id: card.id
  }));
}

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = await params;
  const card = getChecklistCardById(id);

  if (!card) {
    notFound();
  }

  return <CardDetailClient card={card} />;
}
