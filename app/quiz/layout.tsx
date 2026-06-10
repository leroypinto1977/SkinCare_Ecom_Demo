import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skin Quiz",
  description:
    "Answer a few questions and get a personalized Aurelle skincare routine.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
