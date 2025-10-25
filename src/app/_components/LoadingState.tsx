interface LoadingStateProps {
  title?: string;
}

export function LoadingState({
  title = "Choppaluna Feedback Form",
}: LoadingStateProps) {
  return (
    <div className="text-center">
      <p>Loading survey...</p>
    </div>
  );
}
