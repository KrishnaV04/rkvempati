interface Props {
  title: string;
}

export default function PlaceholderPage({ title }: Props) {
  return (
    <div className="placeholder-page">
      <h1>{title}</h1>
      <p>Coming soon.</p>
    </div>
  );
}
