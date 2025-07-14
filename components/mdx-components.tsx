import { useMDXComponent } from 'next-contentlayer2/hooks';
//import Image from 'next/image';

const components = {
  h1: ({ ...props }) => (
    <h1
      className={'mt-2 text-4xl font-bold tracking-tight text-red-300'}
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2
      className={'mt-10 pb-1 text-3xl font-semibold tracking-tight'}
      {...props}
    />
  ),
  p: ({ ...props }) => <p className='mt-8 text-base leading-7' {...props} />,
  ul: ({ ...props }) => (
    <ul className="list-disc pl-6 my-4" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="list-decimal pl-6 my-4" {...props} />
  ),
  a: ({ ...props }) => (
    <a
      className="text-blue-500 underline transition-colors duration-200 hover:text-blue-700"
      {...props}
    />
  ),
};

interface MdxProps {
  code: string;
}
export default function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <div>
      <Component components={components} />
    </div>
  );
}