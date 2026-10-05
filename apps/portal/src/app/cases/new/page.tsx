import { Suspense } from "react";
import { NewCaseWizard } from "@/components/new-case-wizard";

export default function NewCasePage() {
  return (
    <Suspense fallback={null}>
      <NewCaseWizard />
    </Suspense>
  );
}
