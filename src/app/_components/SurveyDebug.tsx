import type { Survey } from "../../server/domain/types";

interface SurveyDebugProps {
  survey: Survey;
}

export function SurveyDebug({ survey }: SurveyDebugProps) {
  return (
    <div className="mb-8 rounded-lg bg-gray-100 p-4">
      <h2 className="mb-2 text-lg font-semibold">Survey Data (Debug):</h2>
      <pre className="text-sm">{JSON.stringify(survey, null, 2)}</pre>
    </div>
  );
}
