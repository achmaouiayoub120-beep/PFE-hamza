import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
}

export function Logo({ size = 'md', showText = true, href = '/' }: LogoProps) {
  const sizeMap = {
    sm: { image: 32, text: 'text-lg' },
    md: { image: 48, text: 'text-2xl' },
    lg: { image: 80, text: 'text-4xl' },
  };

  const dimensions = sizeMap[size];

  const logoContent = (
    <div className="flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <Image
          src="/logo.png"
          alt="School Logo"
          width={dimensions.image}
          height={dimensions.image}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${dimensions.text} font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent`}>
            UniNetwork
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-gray-500 font-medium">University Community</span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
