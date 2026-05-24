type Props = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: Props) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="text-gray-500 mt-1">{description}</p>}
    </header>
  );
}
