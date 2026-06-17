function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-gradient-to-b from-wood to-wood-light pt-24 pb-12 sm:pt-28 sm:pb-16 text-center px-4">
      <h1 className="font-display text-cream text-3xl sm:text-5xl font-bold">
        {title}
      </h1>
      {subtitle && (
        <p className="font-body text-cream/70 mt-3 text-base sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
