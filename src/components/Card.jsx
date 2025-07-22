const Card = ({ title, description, children }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-md">
      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
