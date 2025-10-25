interface ErrorStateProps {
  error: { message: string };
  title?: string;
}

export function ErrorState({
  error,
  title = "Choppaluna Feedback Form",
}: ErrorStateProps) {
  return (
    <div className="text-center">
      <p className="text-red-500">Error loading survey: {error.message}</p>
    </div>
  );
}
