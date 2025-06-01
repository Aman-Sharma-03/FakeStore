import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionLink,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-blue-50 p-6 rounded-full mb-6">
        <ShoppingBag className="h-12 w-12 text-blue-500" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;